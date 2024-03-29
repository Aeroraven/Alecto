import { alectoTmallReqDigest } from "../../alecto-external/alecto-crypto/alecto-tmall-req-digest";
import { AlectoGlobal } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoJSONPInjector } from "../injector/alecto-jsonp-injector";
import { AlectoCommentFormat, AlectoCommentHandler } from "./alecto-comment-handler";
import { alectoNMGetXHROpenLists,alectoNMInjectNativeMethods} from "../../alecto-external/alecto-native-monitor/alecto-natm"

export class AlectoCommentHandlerTmallV8 extends AlectoCommentHandler{
    public extraHooks(): void {
        
    }
    
    
    public simStartup(): void {
        const v8CommentStr = "JUU1JUFFJTlEJUU4JUI0JTlEJUU4JUFGJTg0JUU0JUJCJUI3"
        let btnsv2 = document.getElementsByTagName('span');
        for(let i=0;i<btnsv2.length;i++){
            if(AlectoRuntimeUtils.base64Encode(btnsv2[i].innerHTML)==v8CommentStr){
                (<HTMLElement>btnsv2[i]).click();
            }
        }
    }

    public locateJsonpAddress(): string {
        let g = AlectoGlobal.getInst()
        alectoNMInjectNativeMethods()
        let potential_cands = alectoNMGetXHROpenLists()
        let destAddr = ""
        potential_cands.forEach((el)=>{
            let matchDest = /mtop\.alibaba\.review\.list\.for\.new\.pc\.detail/g;
            if(el.match(matchDest)!=null){
                destAddr = el;
            }
        });
        AlectoRuntimeUtils.log(g.lang.locatingCommentApiUrl+destAddr);
        //destAddr = destAddr.replace(/callback\=.*&/g,"callback=jsonp442&");
        return destAddr;
    }

    public async findJsonpBody():Promise<AlectoCommentFormat[]>{
        let g = AlectoGlobal.getInst()
        let uri = this.locateJsonpAddress();

        await AlectoRuntimeUtils.periodicCheck(()=>{
            uri = this.locateJsonpAddress();
            if(uri!=""){
                return true
            }
            return false
        },500)

        AlectoRuntimeUtils.log(g.lang.obtainedCommentApiUrl)
        
        let commentLists:AlectoCommentFormat[] = [];
        let curIndex = 1;
        let injector = new AlectoJSONPInjector();
        while(true){
            let rpUri = decodeURIComponent(uri).replace(/pageNum\"\:[0-9]+/,"pageNum\":"+curIndex);

            //Update Digest
            let cookie = document.cookie;
            let parsedCookie = AlectoRuntimeUtils.parseCookie(cookie)
            let fp = parsedCookie.get("_m_h5_tk")!.replace(/_/g,"&")
            let sp = "12574478"
            let tp = rpUri.match(/\{.*\}/g)
            let preEnc = fp+"&"+sp+"&"+tp
            let digestSign = alectoTmallReqDigest(preEnc);

            let timeStamp = parsedCookie.get("_m_h5_tk")!.split("_")[1]

            rpUri = rpUri.replace(/sign.?[0-9|a-z]+/,"sign="+digestSign);
            rpUri = rpUri.replace(/&t=[0-9|a-z]+/,"&t="+timeStamp);

            //rpUri = encodeURIComponent(rpUri)

            //Update URI
            AlectoRuntimeUtils.log(g.lang.initiateFetchReq+rpUri);
            //let respBody = await injector.inject(rpUri);
            let respBody = JSON.parse(await AlectoRuntimeUtils.fetchText(rpUri));
            console.log(respBody)
            //Callback
            let cb:AlectoProgressCallback = {
                status: g.lang.loadComments+" (Page:"+curIndex+", Items:"+commentLists.length+")",
                progress: curIndex
            } 
            this.doCallback(cb);
            
            //Check Captcha Interceptor
            interface ACHRegularRespbodyTmall{
                data:unknown
            }
            const captCheck = (x:any):x is ACHRegularRespbodyTmall=>{
                if(x==undefined||x==null){
                    return false;
                }
                try{
                    if(x.data==null||x.data==undefined){
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
                module:{
                    hasNext:string
                    reviewVOList:{
                        reviewPicPathList?:string[],
                        reviewWordContent:string,
                        videoVOList:{
                            url:string
                        }[],
                        userNick:string,
                        reviewDate:string
                    }[]
                }
            }

            const nodeCheck = (x:any):x is ACHRegularRespbody=>{
                if(x==undefined||x==null){
                    return false;
                }
                console.log(x);
                return (typeof x.module) == "object";
            }
            
            let rep = respBody.data;
            if(nodeCheck(rep)){
                if(rep.module.reviewVOList.length==0){
                    break
                }
                let content = rep.module.reviewVOList;
                
                content.forEach((element)=>{
                    let contentIns:AlectoCommentFormat = {
                        photos:[],
                        videos:[],
                        date: "",
                        user: "",
                        content:"",
                        detail:""
                    }
                    contentIns.detail = ""
                    contentIns.content = element.reviewWordContent;
                    contentIns.user = element.userNick;
                    contentIns.date = element.reviewDate;
                    element.videoVOList.forEach((elx)=>{
                        contentIns.videos.push({
                            cloudVideoUrl:elx.url.replace(/^http\:/,"https:")
                        })
                    })
                    if(element.reviewPicPathList!=undefined){
                        element.reviewPicPathList.forEach((elx)=>{
                            contentIns.photos.push({
                                url:elx
                            });
                        });
                    }
                    commentLists.push(contentIns)

                })
                if(rep.module.hasNext=="false"){
                    break
                }
            }else{
                
            }
            curIndex++;
            await AlectoRuntimeUtils.sleep(500);
        }
        return commentLists;
    }
    
}