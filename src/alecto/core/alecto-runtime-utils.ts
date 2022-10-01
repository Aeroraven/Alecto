import { saveAs } from "file-saver";
import { alectoPakoGzip, alectoPakoUnGzip } from "../../alecto-external/alecto-pako-wrapper/alecto-pako-wrapper-native";
import { AlectoGlobal, AlectoRunEnv } from "./alecto-global";

declare function GM_download(x:{
    url:string,
    name:string,
    onload:()=>any
}):unknown;

export class AlectoRuntimeUtils{
    public static base64Encode(s:string){
        let g = AlectoGlobal.getInst().env
        return g.btoa(encodeURIComponent(s))
    }
    public static base64Decode(s:string){
        let g = AlectoGlobal.getInst().env
        return decodeURIComponent(g.atob(s))
    }
    public static parseCookie(s:string){
        let cookiePattern = /^(\S+)=(\S+)$/;
        let cookieArray = s.split("; ");
        let cookieMap = new Map<string,string>();
        for(let item of cookieArray) {
            let resultArray = cookiePattern.exec(item);
            cookieMap.set(resultArray![1], resultArray![2]);
        }
        return cookieMap;
    }
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
    public static async download(x:string|Blob,y:string){
        let g = AlectoGlobal.getInst()
        if(g.attr.envAttr == AlectoRunEnv.ARE_BROWSER){
            AlectoRuntimeUtils.log("SaveAs")
            saveAs(x,y)
        }else{
            AlectoRuntimeUtils.log("GM_Download")
            let xt:string;
            if(x instanceof Blob){
                AlectoRuntimeUtils.log("Converting Blob")
                await new Promise((resolve)=>{
                    let reader = new FileReader();
                    reader.readAsDataURL(<Blob>x);
                    reader.onloadend = function () {
                        xt = <string>reader.result;
                        resolve(1);
                    }
                })
                
            }else{
                xt = x
            }
            await new Promise((r)=>{
                AlectoRuntimeUtils.log("Download")
                GM_download({
                    url:xt,
                    name:y,
                    onload:()=>{
                        r(0);
                    }
                })
            })
        }
        
    }
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
            let fw = setInterval(()=>{
                if(cond()){
                    clearInterval(fw)
                    resolve(0);
                }
            },interval);
        });
    }

    public static gzip(s:string){
        return alectoPakoGzip(s);
    }

    public static ungzip(s:string){
        return alectoPakoUnGzip(s);
    }
}