import { AlectoGlobal } from "../core/alecto-global";

type AlectoJSONPInjectorCallbackFunc = (x:any) => any;

declare global {
    interface Window{
        jsonp_tbcrate_reviews_list:  AlectoJSONPInjectorCallbackFunc
        jsonp442: AlectoJSONPInjectorCallbackFunc
        mtopjsonp2: AlectoJSONPInjectorCallbackFunc
        mtopjsonp3: AlectoJSONPInjectorCallbackFunc
    }
}

export class AlectoJSONPInjector{
    private jsonpResolved: boolean
    private jsonpContent: unknown

    constructor(){
        this.jsonpResolved = false
    }

    public async inject(url:string,responseTimeout = 30000){
        let setScript = document.createElement("script");
        setScript.setAttribute("type", "text/javascript");
        setScript.setAttribute("src", url);
        this.callbackInject();
        document.body.insertBefore(setScript, document.body.lastChild);
        this.jsonpResolved = false;
        await new Promise((resolve,reject)=>{
            setTimeout(()=>{
                reject();
            },responseTimeout);
            let timerId = setInterval(()=>{
                if(this.jsonpResolved){
                    resolve(0);
                    clearInterval(timerId);
                }
            },1000);
        });
        return this.jsonpContent;
    }

    public callbackInject(){
        let g = AlectoGlobal.getInst()
        const w = (x:any)=>{
            this.jsonpResolved = true;
            this.jsonpContent = x;
            return x;
        };
        g.getEnv().mtopjsonp3 = w;
        g.getEnv().mtopjsonp2 = w;
        g.getEnv().jsonp442 = w;
        g.getEnv().jsonp_tbcrate_reviews_list = w;
    }
}