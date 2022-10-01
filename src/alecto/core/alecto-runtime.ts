import { AlectoAssets } from "../asset/alecto-assets";
import { AlectoComponent } from "./alecto-component";
import { AlectoGlobal, AlectoGlobalCodes, AlectoGlobalPlatform, AlectoRunEnv } from "./alecto-global";
import { AlectoRuntimeUtils } from "./alecto-runtime-utils";

declare var unsafeWindow : Window | null | undefined;
declare var alectoDocument: Document | null

export class AlectoRuntime extends AlectoComponent{
    constructor(){
        super();
    }
    private hijackNativeMethods(){
        document.head.removeChild = <T extends Node>(child:T)=>{return child}
    }
    private initEnv(){
        let w = AlectoGlobal.getInst();
        //Tampermonkey
        if(typeof unsafeWindow != 'undefined'){
            w.attr.env = unsafeWindow;
            w.attr.envAttr = AlectoRunEnv.ARE_TAMPER
        }
        //Browser
        else if(window != null && window != undefined){
            w.attr.env = window;
            w.attr.envAttr = AlectoRunEnv.ARE_BROWSER
        }else{
            AlectoRuntimeUtils.log("UNSUPPORTED ENV")
        }

        let wd : any = w.attr.env
        if(wd.alectoDocument != null){
            w.attr.envDoc = <Document>wd.alectoDocument;
        }else{
            console.log(wd)
        }
    }
    
    private recoverNativeMethods(){
        let g = AlectoGlobal.getInst();
        g.setState(AlectoGlobalCodes.AGC_REOVERRIDE);
        let _frame = document.createElement('iframe');
        document.body.appendChild(_frame);
        g.getEnv().fetch  = (<Window>_frame.contentWindow).fetch;
        _frame.style.display = "none"
    }

    private platformDetect(){
        let g = AlectoGlobal.getInst()
        if(g.env.location.href.match(/detail\.tmall\..*\/.*item\.htm/g)){
            let fktb = (<any>g.env).__ASSET_PATH__;
            if(fktb == null){
                g.attr.platform = AlectoGlobalPlatform.AGP_TMALL
            }else{
                g.attr.platform = AlectoGlobalPlatform.AGP_TMALLV8
            }

        }else if(g.env.location.href.match(/item\.taobao\..*\/.*item\.htm/g)){
            g.attr.platform = AlectoGlobalPlatform.AGP_TAOBAO
        }else{
            g.attr.platform = AlectoGlobalPlatform.AGP_UNIDENTIFIED
        }
    }

    private emitAssets(){
        let a = AlectoAssets.getInst()
        a.generateAssetCSS()
    }

    public async executeSelf(){
        this.initEnv();
        this.recoverNativeMethods();
        this.platformDetect();
        this.emitAssets()
        this.hijackNativeMethods()
    }
}