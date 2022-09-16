/* jshint esversion: 8 */

/*Copyright 2022 Aeroraven / Chloroauric Acid

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.*/


//Alecto, a userscript to gather tb comments

function AlectoNative(){
    this.fuckCapitalist = ()=>{
        console.log("");
    };
}

function Alecto(){
    const log = (x)=>{
        console.log("[Alecto] "+x);
    };

    const xhrGet = async (url,binary = false)=>{
        let response = await window.fetch(url);
        if(binary){
            return await response.blob();
        }
        return await response.text();
    };
    
    const jsonpInjection = async (url) =>{
        let setScript = document.createElement("script");
        setScript.setAttribute("type", "text/javascript");
        setScript.setAttribute("src", url);
        document.body.insertBefore(setScript, document.body.lastChild);
        this.attr.jsonpResolved = false;
        await new Promise((resolve,reject)=>{
            setTimeout(()=>{
                reject();
            },30000);
            let timerId = setInterval(()=>{
                if(this.attr.jsonpResolved){
                    resolve();
                    clearInterval(timerId);
                }
            },1000);
        });
        return this.attr.jsonpContent;
    };

    const jsonpCallbackInjection = ()=>{
        window.jsonp_tbcrate_reviews_list  = (x)=>{
            this.attr.jsonpResolved = true;
            this.attr.jsonpContent = x;
            return x;
        };
    };

    const reOverridingNativeMethods = ()=>{
        var _frame = document.createElement('iframe');
        document.body.appendChild(_frame);
        const recoverMethod = (parentPrototype = window, methodName = "", alias = "") => {
            parentPrototype[methodName] = _frame.contentWindow[methodName];
            if(!(alias in this.native)){
                this.native[alias] = function(){};
            }
            this.native[alias][methodName] = _frame.contentWindow[methodName];
        };
        const recoverList = [
            {
                proto:XMLHttpRequest.prototype,
                alias:"XHR",
                methods:['send','open']
            },
            {
                proto:window,
                alias:"window",
                methods:['fetch']
            }
        ];
        recoverList.forEach((el)=>{
            el.methods.forEach((elx)=>{
                recoverMethod(el.proto,elx,el.alias);
                this.log("Recovered native function:"+el.alias+"-"+elx);
            });
        });
        
    };

    const locateJsonpAddress = ()=>{
        let htmlHead = document.getElementsByTagName("head")[0].childNodes;
        let destAddr = "";
        htmlHead.forEach((el)=>{
            if('src' in el){
                let matchDest = /feedRateList.htm/g;
                if(el.src.match(matchDest)!=null){
                    destAddr = el.src;
                }
            }
        });
        this.log("Find comment JSONP URI:"+destAddr);
        return destAddr;
    };

    const findJsonpBody = async ()=>{
        let uri = this.locateJsonpAddress();
        this.jsonpCallbackInjection();
        let content = await this.jsonpInjection(uri);
        return content;
    };

    const analyzeComments = (commentObject)=>{
        let exportedObjectList = [];
        commentObject.forEach((el)=>{
            let exportedObject = {};
            exportedObject.date = el.date;
            exportedObject.photos = (()=>{
                let tw = [];
                el.photos.forEach((elx)=>{
                    tw.push(elx.url.replace(/_400x400\.jpg$/g,""));
                });
                return tw;
            })();
            exportedObject.video = (()=>{
                if(el.video != null){
                    return el.video.cloudVideoUrl;
                }
                return null;
            })();
            exportedObject.content = el.content;
            exportedObject.user = el.user.nick;
            exportedObjectList.push(exportedObject);
        });
        return exportedObjectList;
    };
    
    const resolveDependencies = async ()=>{
        let dependencies = [
            'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.js',
            'https://cdn.bootcdn.net/ajax/libs/FileSaver.js/2.0.5/FileSaver.js'
        ];
        for(let i=0;i<dependencies.length;i++){
            let x = await this.xhrGet(dependencies[i]);
            window.eval(x);
            this.setBannerInfo(this.lang.loadDeps+":"+dependencies[i],false);
            this.log("Resolved dependency:"+dependencies[i]);
        }
        this.log("All dependencies are loaded.");
    };

    const createZip = async (analyzedResult)=>{
        var zip = new JSZip();
        let idx = 0;
        for(let i=0;i<analyzedResult.length;i++){
            this.log("Gathering resource, at index:"+i+" / "+analyzedResult.length);
            let el = analyzedResult[i];
            let folder = zip.folder(el.date+"-"+el.user);
            
            for(let j=0;j<el.photos.length;j++){
                this.setBannerInfo(this.lang.download+"("+i+" / "+analyzedResult.length+"):"+el.photos[j],false);
                this.log("Fetching image resource:"+el.photos[j]);
                let x = await this.xhrGet("https:"+el.photos[j],true);
                await new Promise((r)=>{
                    setTimeout(()=>{
                        r();
                    },100);
                });
                folder.file(j+".jpg",x);
            }
            if(el.video!=null){
                this.setBannerInfo(this.lang.download+" ("+i+" / "+analyzedResult.length+"):"+el.video,false);
                this.log("Fetching video resource:"+el.video);
                let x = await this.xhrGet("https:"+el.video,true);
                folder.file("attachment.mp4",x);
            }
            folder.file("comment.txt",el.content);
            
        }
        this.setBannerInfo(this.lang.bundle,false);
        let content = await zip.generateAsync({type:"blob"});
        saveAs(content, "example.zip");
    };
    
    const run = async ()=>{
        this.setBannerInfo(this.lang.starts,false);
        await this.resolveDependencies();
        this.setBannerInfo(this.lang.loadComments,false);
        this.log("Loading comments");
        this.simStartup();
        await new Promise((r)=>{
            setTimeout(()=>{
                r();
            },2000);
        });
        this.log("Comments are loaded");
        let commentObject = await findJsonpBody();
        let analyzedResult = this.analyzeComments(commentObject.comments);
        this.log("Analysis is done.");
        console.log(analyzedResult);
        await this.createZip(analyzedResult);
        this.setBannerInfo(this.lang.alldone,true);
        this.log("Process is done.");
    };

    const init = ()=>{
        this.setupBanner();
        this.setBannerInfo(this.lang.reoverride,false);
        this.reOverridingNativeMethods();
        this.setBannerInfo(this.lang.initdone,true);
        this.log("Initialization is done.");
    };

    const simStartup = ()=>{
        let btns = document.getElementsByClassName('tb-tab-anchor');
        for(let i=0;i<btns.length;i++){
            if(btns[i].innerHTML.match(/\&nbsp;\&nbsp;/g)!=null){
                btns[i].click();
            }
        }
    };

    const setupBanner = ()=>{
        let w = document.createElement("div");
        w.style.position = "fixed";
        w.style.top = "0px";
        w.style.left = "0px";
        w.style.width = "100%";
        w.style.zIndex = "114514191"; //?
        w.innerHTML = this.lang.startup;
        w.style.height = "30px";
        w.style.backgroundColor = "#ff9900";
        w.style.color = "#000000";
        w.style.fontWeight = "bold";
        w.style.paddingLeft = "20px";
        w.style.paddingTop = "10px";
        document.body.appendChild(w);
        this.attr.bannerObj = w;
    };

    const setBannerInfo = (x,showBtn)=>{
        let w = this.attr.bannerObj;
        w.innerHTML = x;
        if(showBtn){
            w.innerHTML += `  <a href='javascript:void(0)' onclick='window.alecto.run()'>`+this.lang.runLabel+`</a>`;
        }
    };


    //Defining Methods

    this.xhrGet = xhrGet;
    this.log = log;
    this.reOverridingNativeMethods = reOverridingNativeMethods;
    this.init = init;
    this.native = new AlectoNative();
    this.locateJsonpAddress = locateJsonpAddress;
    this.findJsonpBody = findJsonpBody;
    this.jsonpInjection = jsonpInjection;
    this.jsonpCallbackInjection = jsonpCallbackInjection;
    this.run = run;
    this.analyzeComments = analyzeComments;
    this.resolveDependencies = resolveDependencies;
    this.createZip = createZip;
    this.simStartup = simStartup;
    this.setupBanner = setupBanner;
    this.setBannerInfo = setBannerInfo;

    //Attributes
    this.attr = {
        jsonpResolved:false,
        jsonpContent:"",
        bannerObj:null,
    };
    
    this.zh_langs = {
        startup:"Alecto 正在初始化",
        reoverride:"Alecto 正在重载原生方法",
        initdone:"Alecto 初始化完毕 (v0.1 by Aeroraven)",
        loadDeps:"Alecto 正在加载依赖",
        loadComments:"Alecto 正在加载评论",
        starts:"Alecto 任务正在开始",
        download:"Alecto 正在下载资源",
        bundle:"Alecto 正在打包文件",
        alldone:"Alecto 已完成抓取任务，检查浏览器下载查看结果。",
        runLabel:"[点击此处开始抓取]"
    };

    this.lang = this.zh_langs;
}

//Injecting
const alecto = new Alecto();
window.alecto = alecto;

//Init
alecto.init();