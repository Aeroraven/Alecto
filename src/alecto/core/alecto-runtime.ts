import { AlectoAssets } from "../asset/alecto-assets";
import { AlectoComponent } from "./alecto-component";
import { AlectoGlobal, AlectoGlobalCodes, AlectoGlobalPlatform, AlectoRunEnv } from "./alecto-global";

declare var unsafeWindow : Window | null | undefined;

export class AlectoRuntime extends AlectoComponent{
    constructor(){
        super();
    }

    private initEnv(){
        let w = AlectoGlobal.getInst();
        //Tampermonkey
        if(typeof unsafeWindow != 'undefined'){
            w.attr.env = unsafeWindow;
            w.attr.envAttr = AlectoRunEnv.ARE_TAMPER
            return;
        }
        //Browser
        if(window != null && window != undefined){
            w.attr.env = window;
            w.attr.envAttr = AlectoRunEnv.ARE_BROWSER
            return;
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
        if(g.env.location.host.match(/\.tmall\.com$/g)){
            g.attr.platform = AlectoGlobalPlatform.AGP_TMALL
        }else{
            g.attr.platform = AlectoGlobalPlatform.AGP_TAOBAO
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
    }
}