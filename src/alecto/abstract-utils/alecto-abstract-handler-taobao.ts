import { AlectoAbstractHandler } from "./alecto-abstract-handler";

export class AlectoAbstractHandlerTaobao extends AlectoAbstractHandler{
    public detectAbstracts(): string[] {
        let rets:string[] = [];
        let wg =  document.getElementById("J_DivItemDesc")!.children[0].children;
        const iterateChildren = (w:HTMLCollection)=>{
            for(let i=0;i<w.length;i++){
                if(w[i].localName == 'img'){
                    if('data-ks-lazyload' in w[i].attributes){
                        rets.push(w[i].attributes.getNamedItem('data-ks-lazyload')!.value);
                    }else{
                        rets.push(w[i].attributes.getNamedItem('src')!.value);
                    }
                }else{
                    if(w[i].children.length!=0){
                        iterateChildren(w[i].children)
                    }
                }
            }
        }
        iterateChildren(wg)
        console.log(rets);
        return rets;
    }
}