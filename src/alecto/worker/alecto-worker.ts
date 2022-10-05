import { pack } from "html2canvas/dist/types/css/types/color";
import { AlectoAbstractHandler } from "../abstract-utils/alecto-abstract-handler";
import { AlectoAbstractHandlerTaobao } from "../abstract-utils/alecto-abstract-handler-taobao";
import { AlectoAbstractHandlerTmall } from "../abstract-utils/alecto-abstract-handler-tmall";
import { AlectoAbstractHandlerTmallV8 } from "../abstract-utils/alecto-abstract-handler-tmall-v8";
import { AlectoCommentAnalyzer } from "../comment-utils/alecto-comment-analyzer";
import { AlectoCommentHandler } from "../comment-utils/alecto-comment-handler";
import { AlectoCommentHandlerTaobao } from "../comment-utils/alecto-comment-handler-taobao";
import { AlectoCommentHandlerTmall } from "../comment-utils/alecto-comment-handler-tmall";
import { AlectoCommentHandlerTmallV8 } from "../comment-utils/alecto-comment-handler-tmall-v8";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoComponentUtil } from "../core/alecto-component-util";
import { AlectoGlobal, AlectoGlobalPlatform } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntime } from "../core/alecto-runtime";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoLang_enUS } from "../localization/alecto-lang-en-us";
import { AlectoLang_zhCN } from "../localization/alecto-lang-zh-cn";
import { AlectoPacker } from "../packing-utils/alecto-packer";
import { AlectoPackerSaver } from "../packing-utils/alecto-packer-saver";
import { AlectoSnapshotComponentBase } from "../snapshot-utils/alecto-snapshot-component-base";
import { AlectoSnapshotComponentTaobao } from "../snapshot-utils/alecto-snapshot-component-taobao";
import { AlectoSnapshotComponentTmall } from "../snapshot-utils/alecto-snapshot-component-tmall";
import { AlectoUIAboutInjector } from "../ui/alecto-ui-about-injector";
import { AlectoUIInjector, AlectoUIInjectorSbtn } from "../ui/alecto-ui-injector";

declare global{
    interface Window{
        alecto: AlectoWorker
    }
}

export class AlectoWorker extends AlectoComponent{
    ui:AlectoUIInjector

    constructor(){
        super()
        this.ui = new AlectoUIInjector();
    }
    protected async executeSelf(): Promise<void> {
        let ag =  AlectoGlobal.getInst();
        let runtime = new AlectoRuntime();
        let language = AlectoLang_zhCN;
        this.ui = new AlectoUIInjector();

        let sui = new AlectoUIAboutInjector();
        sui.setup()

        //Initialize
        runtime.executeExternal()
        ag.lang = language

        //Setup UI
        await this.ui.setupBanner();

        //Expose 
        ag.env.alecto = this;
        this.ui.setBannerInfo("Waiting for page loading...",AlectoUIInjectorSbtn.AUIS_HIDE);
        let doc = AlectoGlobal.getInst().document;
        let g = AlectoGlobal.getInst()
        if(g.platform == AlectoGlobalPlatform.AGP_UNIDENTIFIED){
            this.ui.detachBanner()
            AlectoRuntimeUtils.log("Alecto will rest for no items can be detected");
            return 
        }

        let scrollH = 100
        let scrollHInc = 100
        //Waiting for Page Loading
        await AlectoRuntimeUtils.periodicCheck(()=>{
            if(g.platform == AlectoGlobalPlatform.AGP_TMALL || g.platform == AlectoGlobalPlatform.AGP_TMALLV8){
                let w:any = doc.getElementById("description")
                let wx = doc.getElementsByClassName("descV8-container")
                if(w!=undefined || wx.length > 0){
                    return true
                }
                doc.body.scrollTop = scrollH
                scrollH += scrollHInc
                return false
            }else{
                try{
                    let w:any = doc.getElementById("J_DivItemDesc")!.children[0].children;
                    if(w!=undefined){
                        return true
                    }
                    return false
                }catch(e){
                    return false
                }
            }
        },200)
        this.ui.setBannerInfo(ag.lang.initdone,AlectoUIInjectorSbtn.AUIS_SHOW);
        AlectoRuntimeUtils.log("Initialization is done.");

        this.ui.setBannerTask("等待开始","任务开始")
    }
    public confirm(){
        let g = AlectoGlobal.getInst()
        g.captchaConfirm = true;
    }

    public getCrawlerType(){
        let g = AlectoGlobal.getInst()
        if(g.platform == AlectoGlobalPlatform.AGP_TAOBAO){
            return AlectoCommentHandlerTaobao
        }
        else if(g.platform == AlectoGlobalPlatform.AGP_TMALL){
            return AlectoCommentHandlerTmall
        }
        else if(g.platform == AlectoGlobalPlatform.AGP_TMALLV8){
            return AlectoCommentHandlerTmallV8
        }else{
            return AlectoCommentHandlerTaobao
        }
    }

    public getSnapshotComType(){
        let g = AlectoGlobal.getInst()
        if(g.platform == AlectoGlobalPlatform.AGP_TAOBAO){
            return AlectoSnapshotComponentTaobao
        }else{
            return AlectoSnapshotComponentTmall
        }
    }

    public getAbstractHandlerType(){
        let g = AlectoGlobal.getInst()
        if(g.platform == AlectoGlobalPlatform.AGP_TAOBAO){
            return AlectoAbstractHandlerTaobao
        }
        else if(g.platform == AlectoGlobalPlatform.AGP_TMALL){
            return AlectoAbstractHandlerTmall
        }
        else if(g.platform == AlectoGlobalPlatform.AGP_TMALLV8){
            return AlectoAbstractHandlerTmallV8
        }else{
            return AlectoAbstractHandlerTaobao
        }
    }

    public async run(){
        let g =  AlectoGlobal.getInst();
        let abstractHanlder:AlectoAbstractHandler = new (this.getAbstractHandlerType())();
        let commentCrawler: AlectoCommentHandler = new (this.getCrawlerType())();
        let commentAnalyzer: AlectoCommentAnalyzer = new AlectoCommentAnalyzer();
        let packer: AlectoPacker = new AlectoPacker()
        let snapshotCom = new (this.getSnapshotComType())();
        let packSaver = new AlectoPackerSaver()
        
        commentCrawler.setCallback((x:any)=>{
            const tg = (xs:any):xs is AlectoProgressCallback =>{
                return true;
            }
            if(tg(x)){
                this.ui.setBannerInfo(x.status,AlectoUIInjectorSbtn.AUIS_RETAIN)
                this.ui.setBannerProg(20+Math.min(10,x.progress)/20*10)
            }
        })

        packer.setCallback((x:any)=>{
            const tg = (xs:any):xs is AlectoProgressCallback =>{
                return true;
            }
            if(tg(x)){
                if(x.status.startsWith(g.lang.abstractImage)){
                    this.ui.setBannerInfo(x.status,AlectoUIInjectorSbtn.AUIS_RETAIN)
                    this.ui.setBannerProg(30+10*x.progress)
                }else{
                    this.ui.setBannerInfo(x.status,AlectoUIInjectorSbtn.AUIS_RETAIN)
                    this.ui.setBannerProg(40+40*x.progress)
                }
                
            }
        })
        snapshotCom.setCallback((x:any)=>{
            const tg = (xs:any):xs is AlectoProgressCallback =>{
                return true;
            }
            if(tg(x)){
                this.ui.setBannerInfo(x.status,AlectoUIInjectorSbtn.AUIS_RETAIN)
                this.ui.setBannerProg(80+10*x.progress)
                
            }
        })
        
        AlectoComponentUtil.flowDefine(abstractHanlder,packer,AlectoPacker.SOURCE_ABSTRACT_IMGS)
        AlectoComponentUtil.flowDefine(commentAnalyzer,packer,AlectoPacker.SOURCE_ANALYZED_COMMENTS)
        AlectoComponentUtil.flowDefine(commentCrawler,commentAnalyzer, AlectoCommentAnalyzer.SOURCE_COMMENTS)
        AlectoComponentUtil.flowDefine(packer,snapshotCom,AlectoSnapshotComponentBase.SOURCE_BUNDLE)
        AlectoComponentUtil.flowDefine(snapshotCom,packSaver,AlectoPackerSaver.SOURCE_BUNDLE);

        interface IAlectoWorkerFlow{
            uiIns:string,
            uiPr:number,
            component: AlectoComponent|null,
            taskAbstract:string
        }

        let flows:IAlectoWorkerFlow[] = [
            {uiIns:g.lang.starts,uiPr:5,component:abstractHanlder,taskAbstract:"摘要抓取"},
            {uiIns:g.lang.loadComments,uiPr:10,component:commentCrawler,taskAbstract:"评论爬取"},
            {uiIns:g.lang.loadComments,uiPr:30,component:commentAnalyzer,taskAbstract:"评论分析"},
            {uiIns:"Downloading Resources",uiPr:30,component:packer,taskAbstract:"资源下载"},
            {uiIns:"Capturing Snapshots",uiPr:80,component:snapshotCom,taskAbstract:"评论截图"},
            {uiIns:"Saving Bundle",uiPr:95,component:packSaver,taskAbstract:"结果打包"},
            {uiIns:g.lang.alldone,uiPr:100,component:null,taskAbstract:"任务结束"},
        ]

        try {
            for(let i=0;i<flows.length;i++){
                //UI
                let wg = (i==flows.length-1)?"无任务":flows[i+1].taskAbstract+"("+(i+2)+"/"+flows.length+")"
                this.ui.setBannerTask(flows[i].taskAbstract+"("+(i+1)+"/"+flows.length+")",wg)
                this.ui.setBannerInfo(flows[i].uiIns,AlectoUIInjectorSbtn.AUIS_HIDE);
                this.ui.setBannerProg(flows[i].uiPr)

                //Exec
                if(flows[i].component!=null){
                    await flows[i].component!.executeExternal()
                }
                
            }

            this.ui.setBannerInfo(g.lang.alldone,AlectoUIInjectorSbtn.AUIS_SHOW);
            this.ui.setBannerProg(100)

        } catch (error) {
            this.ui.setBannerInfo(g.lang.error,AlectoUIInjectorSbtn.AUIS_SHOW);
            AlectoRuntimeUtils.log("ERROR OCCURS");
            console.log(error);
        }
        
        
    }
}