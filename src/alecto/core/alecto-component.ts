
export class AlectoComponent{
    public static readonly STANDARD_OUTPUT = "AL_STD_RET"

    protected children:AlectoComponent[]
    protected attributes:Map<string,any>

    protected callback:(x:any)=>any;
    protected postTriggers:(()=>any)[];

    public constructor(){
        
        this.children = []
        this.attributes = new Map<string,any>();
        this.callback = (x:any)=>{}
        this.postTriggers = []
    }

    public setAttribute(key:string,value:any){
        this.attributes.set(key,value)
    }
    public getAttribute(key:string){
        return this.attributes.get(key)
    }

    public addChild(component:AlectoComponent){
        this.children.push(component)
    }

    public clear(){
        this.children = []
    }

    protected setStdReturn(x:any){
        this.setAttribute(AlectoComponent.STANDARD_OUTPUT,x)
    }

    protected async execute(childOnly:boolean = false){
        for(let i=0;i<this.children.length;i++){
            await this.children[i].execute();
        }
        if(!childOnly){
            await this.executeSelf()
        }
    }

    protected async executeSelf(){

    }

    public async executeExternal(){
        await this.executeSelf()
        this.postTriggers.forEach((el)=>{
            el()
        })
    }

    public addPostTrigger(x:()=>any){
        this.postTriggers.push(x)
    }
     

    public setCallback(x:(x:any)=>any){
        this.callback = x;
    }

    protected doCallback(x:any){
        this.callback(x);
    }
}