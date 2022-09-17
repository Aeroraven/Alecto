export class AlectoRuntimeUtils{
    public static formatEllipsis(str = '', limitLen = 48){
        let 
          len = 0,
          reg = /[\x00-\xff]/, 
          strs = str.split(''),
          inx = strs.findIndex(s => {
            len += reg.test(s) ? 1 : 2
            if (len > limitLen) return true
          })
        return inx === -1 ? str : str.substr(0, inx) + '...';
    };

    public static log(x:string){
        console.log("[Alecto] "+x);
    }

    public static async fetchText(url:string){
        let response = await window.fetch(url);
        return await response.text();
    };

    public static async fetchBlob(url:string){
        let response = await window.fetch(url);
        return await response.blob();
    };

    public static typeCheck<T>(src:any, dest:string): src is T{
        if(src == undefined || src == null){
            return false;
        }
        return typeof src == dest;
    }

    public static async sleep(interval:number){
        await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(0);
            },interval);
        });
    }

    public static async periodicCheck(cond:()=>boolean,interval:number=1000){
        await new Promise((resolve)=>{
            setInterval(()=>{
                if(cond()){
                    resolve(0);
                }
            },interval);
        });
    }
}