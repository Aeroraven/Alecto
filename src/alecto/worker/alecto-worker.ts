import { pack } from "html2canvas/dist/types/css/types/color";
import { AlectoCommentAnalyzer } from "../comment-utils/alecto-comment-analyzer";
import { AlectoCommentHandler } from "../comment-utils/alecto-comment-handler";
import { AlectoCommentHandlerTaobao } from "../comment-utils/alecto-comment-handler-taobao";
import { AlectoCommentHandlerTmall } from "../comment-utils/alecto-comment-handler-tmall";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal, AlectoGlobalPlatform } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntime } from "../core/alecto-runtime";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoLang_zhCN } from "../localization/alecto-lang-zh-cn";
import { AlectoPacker } from "../packing-utils/alecto-packer";
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
    public async executeSelf(): Promise<void> {
        let ag =  AlectoGlobal.getInst();
        let runtime = new AlectoRuntime();
        let language = AlectoLang_zhCN;
        this.ui = new AlectoUIInjector();

        //Sub UI
        //let sui = new AlectoUIAboutInjector();
        //sui.setup()

        //Initialize
        runtime.executeSelf()
        ag.lang = language

        //Setup UI
        this.ui.setupBanner();

        //Expose 
        ag.env.alecto = this;

        this.ui.setBannerInfo(ag.lang.initdone,AlectoUIInjectorSbtn.AUIS_SHOW);
        AlectoRuntimeUtils.log("Initialization is done.");
    }
    public confirm(){
        let g = AlectoGlobal.getInst()
        g.captchaConfirm = true;
    }

    public getCrawlerType(){
        let g = AlectoGlobal.getInst()
        if(g.platform == AlectoGlobalPlatform.AGP_TAOBAO){
            return AlectoCommentHandlerTaobao
        }else{
            return AlectoCommentHandlerTmall
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

    public async run(){
        let g =  AlectoGlobal.getInst();
        let commentCrawler: AlectoCommentHandler = new (this.getCrawlerType())();
        let commentAnalyzer: AlectoCommentAnalyzer = new AlectoCommentAnalyzer();
        let packer: AlectoPacker = new AlectoPacker()
        let snapshotCom = new (this.getSnapshotComType())();
        
        //Setup callbacks
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
        
        try {
            //Start
            this.ui.setBannerInfo(g.lang.starts,AlectoUIInjectorSbtn.AUIS_HIDE);
            this.ui.setBannerProg(5)
            
            //Abstract
            let abstracts = commentCrawler.detectAbstracts();

            //Comment Crawl
            this.ui.setBannerInfo(g.lang.loadComments,AlectoUIInjectorSbtn.AUIS_HIDE);
            this.ui.setBannerProg(10)
            commentCrawler.simStartup();

            //Find All Comments
            await AlectoRuntimeUtils.sleep(4000);
            let respBody = await commentCrawler.findJsonpBody();

            //Analyze Comments
            let analyzedBody = commentAnalyzer.analyzeComments(respBody);

            //Snapshot Components
            snapshotCom.setZip(packer.zip)
            packer.addChild(snapshotCom)

            //Packing
            await packer.createZip(analyzedBody,abstracts);

            this.ui.setBannerInfo(g.lang.alldone,AlectoUIInjectorSbtn.AUIS_SHOW);
            this.ui.setBannerProg(100)

        } catch (error) {
            this.ui.setBannerInfo(g.lang.error,AlectoUIInjectorSbtn.AUIS_SHOW);
            AlectoRuntimeUtils.log("ERROR OCCURS");
            console.log(error);
        }
        
        
    }
}