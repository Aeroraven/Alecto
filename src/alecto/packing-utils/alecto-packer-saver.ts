import JSZip from "jszip";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";

export class AlectoPackerSaver extends AlectoComponent{
    //Attribute
    static readonly SOURCE_BUNDLE = "ALPS_SOURCE_BUNDLE"

    constructor(){
        super()
    }
    protected async executeSelf(): Promise<void> {
        let zip = <JSZip> this.getAttribute(AlectoPackerSaver.SOURCE_BUNDLE)

        AlectoRuntimeUtils.log("Generating Zip")
        let content = await zip.generateAsync({type:"blob"});
        AlectoRuntimeUtils.log("Getting Bundle Name")
        let data = document.getElementsByTagName("title")[0].innerHTML
        AlectoRuntimeUtils.download(content, data+".zip");
    }
}