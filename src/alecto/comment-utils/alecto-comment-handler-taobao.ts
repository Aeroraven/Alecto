import { AlectoGlobal } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoJSONPInjector } from "../injector/alecto-jsonp-injector";
import { AlectoCommentFormat, AlectoCommentHandler } from "./alecto-comment-handler";

export class AlectoCommentHandlerTaobao extends AlectoCommentHandler{
    public detectAbstracts(): string[] {
        let rets = [];
        let w =  document.getElementById("J_DivItemDesc")!.children[0].children;
        for(let i=0;i<w.length;i++){
            if(w[i].localName == 'img'){
                if('data-ks-lazyload' in w[i].attributes){
                    rets.push(w[i].attributes.getNamedItem('data-ks-lazyload')!.value);
                }else{
                    rets.push(w[i].attributes.getNamedItem('src')!.value);
                }
            }
        }
        console.log(rets);
        return rets;
    }
    
    public simStartup(): void {
        let btns = document.getElementsByClassName('tb-tab-anchor');
        for(let i=0;i<btns.length;i++){
            if(btns[i].innerHTML.match(/\&nbsp;\&nbsp;/g)!=null){
                (<HTMLElement>btns[i]).click();
            }
        }
    }

    public locateJsonpAddress(): string {
        let htmlHead = document.getElementsByTagName("head")[0].childNodes;
        let destAddr = "";
        interface ACHNode{
            src:string
        }
        htmlHead.forEach((el)=>{
            const nodeCheck = (x:any):x is ACHNode=>{
                if(x==undefined||x==null){
                    return false;
                }
                return typeof x.src == "string";
            }
            if(nodeCheck(el)){
                let matchDest = /feedRateList.htm/g;
                if(el.src.match(matchDest)!=null){
                    destAddr = el.src;
                }
            }else{
                AlectoRuntimeUtils.log("Skipped invalid node"+el);
            }
        });
        AlectoRuntimeUtils.log("Find comment JSONP URI:"+destAddr);
        return destAddr;
    }

    public async findJsonpBody():Promise<AlectoCommentFormat[]>{
        let g = AlectoGlobal.getInst()
        let uri = this.locateJsonpAddress();
        await AlectoRuntimeUtils.periodicCheck(()=>{
            uri = this.locateJsonpAddress();
            return uri != ""
        },500)
        let commentLists:AlectoCommentFormat[] = [];
        let curIndex = 1;
        let injector = new AlectoJSONPInjector();
        while(true){
            let rpUri = uri.replace(/currentPageNum.?[0-9]+/,"currentPageNum="+curIndex);
            let respBody = await injector.inject(rpUri);
            AlectoRuntimeUtils.log("Jsonp:"+rpUri);
            //Callback
            let cb:AlectoProgressCallback = {
                status: g.lang.loadComments+" (Page:"+curIndex+", Items:"+commentLists.length+")",
                progress: curIndex
            } 
            this.doCallback(cb);
            
            //Check Captcha Interceptor
            interface ACHRegularRespbody{
                comments : unknown[],
                currentPageNum:number,
                maxPage:number
            }
            interface ACHRegularRespbodyChild{
                video: unknown 
                date: string
                content: string
                user: string
                photos: unknown[] 
            }
            const nodeCheck = (x:any):x is ACHRegularRespbody=>{
                if(x==undefined||x==null){
                    return false;
                }
                console.log(x);
                return (typeof x.comments) == "object";
            }
            if(nodeCheck(respBody)){
                if(respBody.comments.length == 0){
                    break;
                }
                let content = respBody.comments;
                
                interface ACHCommentElement{
                    date:string,
                    photos: {url:string}[],
                    video: ({cloudVideoUrl:string}|null),
                    user: {nick:string},
                    content:string
                }
                respBody.comments.forEach((element)=>{
                    const elementCheck = (x:any):x is ACHCommentElement=>{
                        if(x==undefined || x==null){
                            return false;
                        }
                        if(typeof x.date != "string"){
                            return false;
                        }
                        if(typeof x.photos != "object"){
                            return false;
                        }
                        if(typeof x.video != "object"){
                            return false;
                        }
                        if(typeof x.user != "object"){
                            return false;
                        }
                        if(typeof x.content != "string"){
                            return false;
                        }
                        return true;
                    }
                    if(elementCheck(element)){
                        let contentIns:AlectoCommentFormat = {
                            photos:[],
                            videos:[],
                            date: "",
                            user: "",
                            content:""
                        }
                        contentIns.content = element.content;
                        contentIns.user = element.user.nick;
                        contentIns.date = element.date;
                        contentIns.videos = (()=>{
                            if(element.video==null){
                                return []
                            }else{
                                return [element.video];
                            }
                        })()
                        contentIns.photos = element.photos
                        commentLists.push(contentIns)
                    }else{
                        AlectoRuntimeUtils.log("Discarded invalid item")
                    }
                })
                if(respBody.currentPageNum==respBody.maxPage){
                    break;
                }
            }else{
                //Intercepted by captcha
                let g = AlectoGlobal.getInst()
                g.captchaConfirm = false;
                let cb:AlectoProgressCallback = {
                    status: g.lang.captchaRej,
                    progress: curIndex
                } 
                this.doCallback(cb)
                await AlectoRuntimeUtils.periodicCheck(()=>{
                    return g.captchaConfirm;
                })
                continue;
            }
            curIndex++;
            await AlectoRuntimeUtils.sleep(2000);
        }
        return commentLists;
    }
    
}