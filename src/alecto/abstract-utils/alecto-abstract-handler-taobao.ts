import { AlectoAbstractHandler } from "./alecto-abstract-handler";

export class AlectoAbstractHandlerTaobao extends AlectoAbstractHandler{
    public detectAbstracts(): string[] {
        let rets = [];
        let w = null;
        w = document.getElementById("J_DivItemDesc")!.children[0].children;
        for(let i=0;i<w.length;i++){
            if(w[i].localName == 'img'){
                if('data-ks-lazyload' in w[i].attributes){
                    rets.push(w[i].attributes.getNamedItem('data-ks-lazyload')!.value);
                }else{
                    rets.push(w[i].attributes.getNamedItem("src")!.value);
                }
            }
        }
        console.log(rets);
        return rets;
    }
}