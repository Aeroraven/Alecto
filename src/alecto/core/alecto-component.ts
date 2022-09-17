export class AlectoComponent{
    protected children:AlectoComponent[]
    protected callback:(x:any)=>any;

    public constructor(){
        this.children = []
        this.callback = (x:any)=>{}
    }

    public addChild(component:AlectoComponent){
        this.children.push(component)
    }

    public clear(){
        this.children = []
    }

    public async execute(){
        for(let i=0;i<this.children.length;i++){
            await this.children[i].execute();
        }
        await this.executeSelf()
    }

    public async executeSelf(){

    }

    public setCallback(x:(x:any)=>any){
        this.callback = x;
    }

    protected doCallback(x:any){
        this.callback(x);
    }
}