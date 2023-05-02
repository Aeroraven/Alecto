import { saveAs } from "file-saver";
import { alectoPakoGzip, alectoPakoUnGzip } from "../../alecto-external/alecto-pako-wrapper/alecto-pako-wrapper-native";
import { AlectoGlobal, AlectoRunEnv } from "./alecto-global";
import { AlectoLogger } from "./alecto-logger";

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
            AlectoRuntimeUtils.log("Saving packed file")
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

    public static dateFormat (date:Date,fmt:string) {
        //By meizz @ https://www.jianshu.com/p/d6eb9466a4fa
        var o = {
            "M+": date.getMonth() + 1, 
            "d+": date.getDate(), 
            "h+": date.getHours(), 
            "m+": date.getMinutes(),
            "s+": date.getSeconds(), 
            "q+": Math.floor((date.getMonth() + 3) / 3), 
            "S": date.getMilliseconds() 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? ((<any>o)[k]) : (("00" + (<any>o)[k]).substr(("" + (<any>o)[k]).length)));
                return fmt;
    }

    public static log(x:string){
        AlectoLogger.getInst().log(x)
    }

    public static async imageToBase64(url:string){
        function getBase64Image(image:HTMLImageElement) {
            var canvas = document.createElement("canvas")
            canvas.width = image.width
            canvas.height = image.height
            var context = canvas.getContext('2d')
            context!.drawImage(image, 0, 0, image.width, image.height)
            var quality = 0.8
            var dataURL = canvas.toDataURL() 
            return dataURL;
        }
        let ret = ""
        const image = new Image();
        await new Promise(function(resolve, reject) {
            image.setAttribute('crossOrigin', 'anonymous') 
            image.src = url + "?v=" + Math.random()
            image.onload = function() {
                resolve("");
            }
        })
        ret = getBase64Image(image);
        return ret;
    }

    public static async fetchText(url:string){
        let response = await window.fetch(url,{credentials:"include"});
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