import { AlectoComponent } from "../core/alecto-component";

export abstract class AlectoAbstractHandler extends AlectoComponent{
    
    public abstract detectAbstracts():string[]; 

    protected async executeSelf(): Promise<void> {
        let r = this.detectAbstracts()
        this.setStdReturn(r)
    }
}