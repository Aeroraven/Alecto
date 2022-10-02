import html2canvas from "html2canvas";
import JSZip from "jszip";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";

export class AlectoSnapshotComponentTaobao extends AlectoComponent{
    z:JSZip
    constructor(){
        super()
        this.z = new JSZip()
    }
    public async captureSnapshot(zip:JSZip){
        let nextBtnS = document.getElementsByClassName("pg-next");
        let nextBtn:HTMLElement|null = null;
        if(nextBtnS.length!=0){
            nextBtn = <HTMLElement>nextBtnS[0];
        }else{
            nextBtn = null;
        }
        let index = 0;
        let folder = zip.folder("Snapshots");
        let g = AlectoGlobal.getInst()
        let cb:AlectoProgressCallback={
            status: g.lang.snapshot+" (Page:"+index+")",
            progress: Math.min(index,10)/10
        }
        this.doCallback(cb);
        while(true){
            nextBtnS = document.getElementsByClassName("pg-next");
            if(nextBtnS.length!=0){
                nextBtn = <HTMLElement>nextBtnS[0];
            }else{
                nextBtn = null;
            }
            let containerEl = <HTMLElement>document.getElementsByClassName("tb-revbd")[0];
            
            //Convert To DataURLS
            let iterateChildren = async (e:HTMLElement)=>{
                AlectoRuntimeUtils.log("Finding children images:"+e)
                for(let i=0;i<e.children.length;i++){
                    if(e.children[i].tagName.toLowerCase() == "img" || e.children[i].tagName.toLowerCase() == "image"){
                        let ke = e.children[i]
                        let w = ke.attributes.getNamedItem("src")!.value
                        let nw = await AlectoRuntimeUtils.imageToBase64(w)
                        let sw = (<HTMLImageElement>ke)
                        sw.src = nw;
                        AlectoRuntimeUtils.log("Replaced image with DataURL:"+w)
                    }else{
                        if((<HTMLElement>e.children[i]).children.length>0){
                            await iterateChildren(<HTMLElement>e.children[i])
                        }
                    }
                    
                }   
            }
            await iterateChildren(containerEl)

            let canv = await html2canvas(containerEl);
            let b64 = canv.toDataURL('image/png', 1.0).replace(/^data:image\/(png|jpg);base64,/, "");
            folder!.file(index+".jpg",b64,{base64:true});
            if(nextBtn == null){
                break;
            }
            if(nextBtn.classList.length==2){
                break;
            }
            
            nextBtn.click();
            AlectoRuntimeUtils.sleep(5000);
            index++;
        }
        folder!.file("note.txt",g.lang.cors);
    }
    public async executeSelf(): Promise<void> {
        await this.captureSnapshot(this.z)
    }
    public setZip(x:JSZip){
        this.z = x
    }
}