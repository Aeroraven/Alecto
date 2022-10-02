import { AlectoRuntimeUtils } from "./alecto-runtime-utils";

export class AlectoLogger{

    static inst: AlectoLogger|null = null
    logs:string
    public static getInst(){
        if(AlectoLogger.inst == null){
            AlectoLogger.inst = new AlectoLogger();
        }
        return AlectoLogger.inst!;
    }

    private constructor(){
        this.logs = ""
    }

    public log(x:string){
        let str = "[Alecto] [INFO] ("+new Date().toLocaleString()+") "+x;
        console.log(str);
        this.logs = AlectoRuntimeUtils.formatEllipsis(str,130)+"\n"+this.logs
    }

    public getLog(){
        return this.logs
    }
}