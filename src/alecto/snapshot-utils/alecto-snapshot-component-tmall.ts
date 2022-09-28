import html2canvas from "html2canvas";
import JSZip from "jszip";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";

export class AlectoSnapshotComponentTmall extends AlectoComponent{
    z:JSZip
    constructor(){
        super()
        this.z = new JSZip()
    }
    public async captureSnapshot(zip:JSZip){
        //TODO
    }
    public async executeSelf(): Promise<void> {
        await this.captureSnapshot(this.z)
    }
    public setZip(x:JSZip){
        this.z = x
    }
}