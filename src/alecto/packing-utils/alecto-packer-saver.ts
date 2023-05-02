import JSZip from "jszip";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";
import { AlectoGlobal } from "../core/alecto-global";

export class AlectoPackerSaver extends AlectoComponent{
    //Attribute
    static readonly SOURCE_BUNDLE = "ALPS_SOURCE_BUNDLE"

    constructor(){
        super()
    }
    protected async executeSelf(): Promise<void> {
        let zip = <JSZip> this.getAttribute(AlectoPackerSaver.SOURCE_BUNDLE)
        let g = AlectoGlobal.getInst()

        AlectoRuntimeUtils.log(g.lang.genZip)
        let content = await zip.generateAsync({type:"blob"});
        AlectoRuntimeUtils.log(g.lang.getBundleName)
        let data = document.getElementsByTagName("title")[0].innerHTML
        AlectoRuntimeUtils.download(content, data+".zip");
    }
}