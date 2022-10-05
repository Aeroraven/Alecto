import { AlectoAbstractHandler } from "./alecto-abstract-handler";

export class AlectoAbstractHandlerTmallV8 extends AlectoAbstractHandler{
    public detectAbstracts(): string[] {
        let rets:string[] = [];
        let w:HTMLElement = document.body
        if(document.getElementById("description") == null){
            w =  <HTMLElement>document.getElementsByClassName("descV8-container")[0]
        }else{
            w = <HTMLElement>document.getElementById("description");
        }
        console.log(w)
        const iterateChildren = (x:HTMLElement)=>{
            let w = x.children
            for(let i=0;i<w.length;i++){
                if(w[i].localName == 'img'){
                    if('data-ks-lazyload' in w[i].attributes){
                        rets.push(w[i].attributes.getNamedItem('data-ks-lazyload')!.value);
                    }else{
                        rets.push(w[i].attributes.getNamedItem('src')!.value);
                    }
                }else{
                    iterateChildren(<HTMLElement>w[i])
                }
            }
        }
        iterateChildren(w)
        console.log(rets);
        return rets;
    }
}