import html2canvas from "html2canvas";
import JSZip from "jszip";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal } from "../core/alecto-global";
import { AlectoProgressCallback } from "../core/alecto-progress-callback";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoSnapshotComponentBase } from "./alecto-snapshot-component-base";

export class AlectoSnapshotComponentTmall extends AlectoSnapshotComponentBase{
    z:JSZip
    constructor(){
        super()
        this.z = new JSZip()
    }
    public async captureSnapshot(zip:JSZip){
        //TODO
    }
    protected async executeSelf(): Promise<void> {
        let a0 = this.getAttribute(AlectoSnapshotComponentTmall.SOURCE_BUNDLE)
        await this.captureSnapshot(a0)
        this.setStdReturn(a0)
    }
    public setZip(x:JSZip){
        this.z = x
    }
}