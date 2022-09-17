import { AlectoComponent } from "./alecto-component";
import { AlectoGlobal, AlectoGlobalCodes, AlectoGlobalPlatform } from "./alecto-global";

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
            return;
        }
        //Browser
        if(window != null && window != undefined){
            w.attr.env = window;
            return;
        }
    }
    
    private recoverNativeMethods(){
        let g = AlectoGlobal.getInst();
        g.setState(AlectoGlobalCodes.AGC_REOVERRIDE);
        let _frame = document.createElement('iframe');
        document.body.appendChild(_frame);
        g.getEnv().fetch  = (<Window>_frame.contentWindow).fetch;
    }

    private platformDetect(){
        let g = AlectoGlobal.getInst()
        if(g.env.location.host.match(/\.tmall\.com$/g)){
            g.attr.platform = AlectoGlobalPlatform.AGP_TMALL
        }else{
            g.attr.platform = AlectoGlobalPlatform.AGP_TAOBAO
        }
    }

    public async executeSelf(){
        this.initEnv();
        this.recoverNativeMethods();
        this.platformDetect();
    }
}