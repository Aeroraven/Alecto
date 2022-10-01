import { platform } from "os";
import { AlectoDefaultLang, AlectoLangDefs } from "./alecto-lang-defs";

export enum AlectoRunEnv{
    ARE_TAMPER = "TAMPER",
    ARE_BROWSER = "BROWSER"
}

export enum AlectoGlobalCodes{
    AGC_IDLE = "IDLE",
    AGC_REOVERRIDE = "REOVERRIDE"
}

export enum AlectoGlobalPlatform{
    AGP_TAOBAO = "TAOBAO",
    AGP_TMALL = "TMALL",
    AGP_TMALLV8 = "TMALLV8",
    AGP_UNIDENTIFIED = "UNKNOWN"
}

export interface AlectoGlobalAttrs{
    env: Window | null
    status: AlectoGlobalCodes,
    platform: AlectoGlobalPlatform,
    captchaConfirm: boolean
    lang: AlectoLangDefs,
    envAttr: AlectoRunEnv,
    envDoc: Document
};



export class AlectoGlobal{
    static inst: AlectoGlobal|null = null
    public attr: AlectoGlobalAttrs;

    public static getInst(){
        if(AlectoGlobal.inst == null){
            AlectoGlobal.inst = new AlectoGlobal();
        }
        return AlectoGlobal.inst!;
    }
    private constructor(){
        this.attr = {
            env: null,
            status : AlectoGlobalCodes.AGC_IDLE,
            platform: AlectoGlobalPlatform.AGP_UNIDENTIFIED,
            captchaConfirm: true,
            lang: AlectoDefaultLang,
            envAttr: AlectoRunEnv.ARE_BROWSER,
            envDoc: document
        }
    }
    public getEnv(){
        return <Window>this.attr.env
    }

    get platform(){
        return this.attr.platform;
    }

    get env(){
        return <Window>this.attr.env;
    }

    get envAttr(){
        return this.attr.envAttr
    }

    get captchaConfirm(){
        return this.attr.captchaConfirm
    }
    set captchaConfirm(x:boolean){
        this.attr.captchaConfirm = x;
    }
    
    get lang(){
        return this.attr.lang
    }

    set lang(x:AlectoLangDefs){
        this.attr.lang = x;
    }

    get version(){
        return 'v0.2d'
    }

    get document(){
        return this.attr.envDoc
    }


    public setState(x:AlectoGlobalCodes){
        this.attr.status = x;
    }
}