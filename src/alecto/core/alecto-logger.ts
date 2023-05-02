import { AlectoRuntimeUtils } from "./alecto-runtime-utils";

export class AlectoLogger{
    static inst: AlectoLogger|null = null
    logs:string
    original_log: (...data: any[])=>void = console.log
    public static getInst(){
        if(AlectoLogger.inst == null){
            AlectoLogger.inst = new AlectoLogger();
            console.log = function() {
                let x = ""
                for(let i=0;i<arguments.length;i++){
                    x+=arguments[i]
                }
                AlectoLogger.inst!.external_log(x)
                AlectoLogger.inst!.original_log(...arguments)
            }
        }
        return AlectoLogger.inst!;
    }

    private constructor(){
        this.logs = ""
    }

    public external_log(x:string,level="INFO"){
        let str = "[External] ["+level+"] ("+new Date().toLocaleString()+") "+x;
        this.logs = AlectoRuntimeUtils.formatEllipsis(str,130)+"\n"+this.logs
    }

    public log(x:string){
        let str = "[Alecto] [INFO] ("+new Date().toLocaleString()+") "+x;
        this.original_log(str);
        this.logs = AlectoRuntimeUtils.formatEllipsis(str,130)+"\n"+this.logs
    }

    public getLog(){
        return this.logs
    }
}