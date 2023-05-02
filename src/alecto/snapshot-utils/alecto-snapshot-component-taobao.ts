import html2canvas from "html2canvas";
import JSZip from "jszip";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal } from "../core/alecto-global";
import { AlectoLogger } from "../core/alecto-logger";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoSnapshotComponentBase } from "./alecto-snapshot-component-base";

export class AlectoSnapshotComponentTaobao extends AlectoSnapshotComponentBase{
    

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
        
        while(true){
            //UI Callback
            let cb:AlectoProgressCallback={
                status: g.lang.snapshot+" (Page:"+index+")",
                progress: Math.min(index,10)/10
            }
            this.doCallback(cb);

            //Find Retry
            let retryBtns = document.getElementsByClassName("J_KgRate_Retry_List").length;
            if(retryBtns>0){
                let gp = document.getElementsByClassName("J_KgRate_Retry_List");
                AlectoLogger.getInst().log("Request failure detected. Resolving...")
                
                for(let i=0;i<gp.length;i++){
                    (<HTMLElement>gp[i]).click()
                }
                await AlectoRuntimeUtils.sleep(5000);
                continue
            }

            //Find Loading
            retryBtns = document.getElementsByClassName("kg-loading").length;
            if(retryBtns>0){
                AlectoLogger.getInst().log("Comments are being loaded. Postponing inspection...")
                await AlectoRuntimeUtils.sleep(5000);
                continue
            }
            
            nextBtnS = document.getElementsByClassName("pg-next");
            if(nextBtnS.length!=0){
                nextBtn = <HTMLElement>nextBtnS[0];
            }else{
                nextBtn = null;
            }
            let containerEl = <HTMLElement>document.getElementsByClassName("tb-revbd")[0];
            
            //Convert To DataURLS
            AlectoRuntimeUtils.log(g.lang.convertToDataURL)
            let iterateChildren = async (e:HTMLElement)=>{
                //AlectoRuntimeUtils.log("Finding children images:"+e)
                for(let i=0;i<e.children.length;i++){
                    if(e.children[i].tagName.toLowerCase() == "img" || e.children[i].tagName.toLowerCase() == "image"){
                        let ke = e.children[i]
                        let w = ke.attributes.getNamedItem("src")!.value
                        let nw = await AlectoRuntimeUtils.imageToBase64(w)
                        let sw = (<HTMLImageElement>ke)
                        sw.src = nw;
                        AlectoRuntimeUtils.log(g.lang.replaceDataURL+w)
                    }else{
                        if((<HTMLElement>e.children[i]).children.length>0){
                            await iterateChildren(<HTMLElement>e.children[i])
                        }
                    }
                    
                }   
            }
            await iterateChildren(containerEl)
            AlectoRuntimeUtils.log(g.lang.captureSnapshotPage+index)
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
            await AlectoRuntimeUtils.sleep(5000);
            index++;
        }
        folder!.file("note.txt",g.lang.cors);
    }
    protected async executeSelf(): Promise<void> {
        let a0 = this.getAttribute(AlectoSnapshotComponentTaobao.SOURCE_BUNDLE)
        await this.captureSnapshot(a0)
        this.setStdReturn(a0)
    }
    public setZip(x:JSZip){
        this.z = x
    }
}