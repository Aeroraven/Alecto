import { AlectoGlobal } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoJSONPInjector } from "../injector/alecto-jsonp-injector";
import { AlectoCommentFormat, AlectoCommentHandler } from "./alecto-comment-handler";

export class AlectoCommentHandlerTmall extends AlectoCommentHandler{
    public detectAbstracts(): string[] {
        let rets = [];
        let w =  document.getElementsByClassName("ke-post")[0]!.children[1].children;
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
        let btns = document.getElementsByTagName('a');
        for(let i=0;i<btns.length;i++){
            if(btns[i].innerHTML.match(/评\&nbsp;\&nbsp;价/g)!=null){
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
                let matchDest = /list_detail_rate.htm/g;
                if(el.src.match(matchDest)!=null){
                    destAddr = el.src;
                }
            }else{
                AlectoRuntimeUtils.log("Skipped invalid node"+el);
            }
        });
        AlectoRuntimeUtils.log("Find comment JSONP URI:"+destAddr);
        destAddr = destAddr.replace(/callback\=.*$/g,"callback=jsonp442");
        return destAddr;
    }

    public async findJsonpBody():Promise<AlectoCommentFormat[]>{
        let g = AlectoGlobal.getInst()
        let uri = this.locateJsonpAddress();
        let commentLists:AlectoCommentFormat[] = [];
        let curIndex = 1;
        let injector = new AlectoJSONPInjector();
        while(true){
            let rpUri = uri.replace(/currentPage.?[0-9]+/,"currentPage="+curIndex);
            let respBody = await injector.inject(rpUri);
            AlectoRuntimeUtils.log("Jsonp:"+rpUri);
            //Callback
            let cb:AlectoProgressCallback = {
                status: g.lang.loadComments+" (Page:"+curIndex+", Items:"+commentLists.length+")",
                progress: curIndex
            } 
            this.doCallback(cb);
            
            //Check Captcha Interceptor
            interface ACHRegularRespbodyTmall{
                rateDetail:unknown
            }
            const captCheck = (x:any):x is ACHRegularRespbodyTmall=>{
                if(x==undefined||x==null){
                    return false;
                }
                try{
                    if(x.rateDetail==null||x.rateDetail==undefined){
                        return false;
                    }
                }catch(e){
                    return false;
                }
                
                return true
            }

            if(!(captCheck(respBody))){
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
            //Get Comment List


            //F1
            interface ACHRegularRespbody{
                paginator:{
                    lastPage:number
                }
                rateList:{
                    pics:string[],
                    videoList:{
                        cloudVideoUrl:string
                    }[],
                    displayUserNick:string,
                    rateDate:string,
                    rateContent:string

                }[]
            }

            const nodeCheck = (x:any):x is ACHRegularRespbody=>{
                if(x==undefined||x==null){
                    return false;
                }
                console.log(x);
                return (typeof x.rateList) == "object";
            }
            
            let rep = respBody.rateDetail;
            if(nodeCheck(rep)){
                if(curIndex>rep.paginator.lastPage){
                    break
                }
                if(rep.rateList.length==0){
                    break
                }
                let content = rep.rateList;
                
                content.forEach((element)=>{
                    let contentIns:AlectoCommentFormat = {
                        photos:[],
                        videos:[],
                        date: "",
                        user: "",
                        content:""
                    }
                    contentIns.content = element.rateContent;
                    contentIns.user = element.displayUserNick;
                    contentIns.date = element.rateDate;
                    contentIns.videos = element.videoList
                    element.pics.forEach((elx)=>{
                        contentIns.photos.push({
                            url:elx
                        });
                    });
                    commentLists.push(contentIns)

                })
            }else{
                
            }
            curIndex++;
            await AlectoRuntimeUtils.sleep(2000);
        }
        return commentLists;
    }
    
}