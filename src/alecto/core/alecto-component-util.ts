import { AlectoComponent } from "./alecto-component";

export class AlectoComponentUtil{
    public static flowDefine(sourceComponent:AlectoComponent, destComponent:AlectoComponent,destAttribute:string){
        sourceComponent.addPostTrigger(()=>{
            let w = sourceComponent.getAttribute(AlectoComponent.STANDARD_OUTPUT)
            destComponent.setAttribute(destAttribute,w)
        })
    }
}