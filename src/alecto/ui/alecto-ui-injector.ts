import { AlectoAssets } from "../asset/alecto-assets";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal } from "../core/alecto-global";

export enum AlectoUIInjectorSbtn{
    AUIS_SHOW = 1,
    AUIS_RETAIN = 2,
    AUIS_HIDE = 3
}

export class AlectoUIInjector extends AlectoComponent{
    bannerObject:HTMLDivElement
    bannerProg:number

    constructor(){
        super()
        this.bannerObject = document.createElement("div");
        this.bannerProg = 0;
    }
    
    public setBannerProg(x:number){
        this.bannerProg = x;
        document.getElementById('alecto-progressbar')!.style.width = x+"%";
    };

    public setBannerInfo(x:string,showBtn:AlectoUIInjectorSbtn){
        document.getElementById("alecto-body")!.innerHTML = x;
        if(showBtn == AlectoUIInjectorSbtn.AUIS_RETAIN){
            return;
        }
        if(showBtn == AlectoUIInjectorSbtn.AUIS_SHOW){
            document.getElementById("alecto-btn-a")!.style.display = "inline";
        }else{
            document.getElementById("alecto-btn-a")!.style.display = "none";
        }
    };

    public setupBanner(){
        let g = AlectoGlobal.getInst()
        let w = document.createElement("div");
        w.style.position = "fixed";
        w.style.top = "0px";
        w.style.left = "0px";
        w.style.width = "100%";
        w.style.zIndex = "114514191"; //?
        w.innerHTML = g.lang.startup;
        w.style.height = "40px";
        w.style.backgroundColor = "#0b0b0b";
        w.style.color = "#e3e3e3";
        w.style.fontWeight = "bold";
        w.style.paddingLeft = "25px";
        w.style.paddingTop = "11px";
        w.style.paddingBottom = "10px";
        w.style.fontSize = "15px";
        w.style.fontFamily = "'Microsoft YaHei',Tahoma,Helvetica,Arial,'宋体',sans-serif";
        w.style.borderBottom = "2px solid #232323";
        w.style.verticalAlign = "top";
        w.style.display = "table-cell";
        w.style.userSelect = "none";
        document.body.appendChild(w);
        this.bannerObject = w;
        this.setupBannerPost(g.lang.startup);
    }
    private setupBannerPost = (x:string)=>{
        let g = AlectoGlobal.getInst()
        let w = this.bannerObject;
        let asset = AlectoAssets.getInst();
        let styleInject = `
            
            <style>
                .alecto-btn{
                    background-color:#76ddff;
                    color:#000000;
                    border-radius:3px;
                    padding-left:11px;
                    padding-top:6px;
                    padding-right:11px;
                    padding-bottom:6px;
                    margin-left:12px;
                }
                .alecto-btn:hover{
                    text-decoration:none;
                }
                .alecto-right{
                    float:right;
                    margin-right:60px;
                    padding-top:10px;
                }
                .alecto-title{
                    font-size:25px;
                    font-weight:bold;
                    padding-top:2px;
                    display:inline-block;
                    margin-right:15px;
                    color:#10b2ff;
                    font-family:'Geometo';
                    
                }
                .alecto-body{
                    display:inline-block;
                    transform: translateY(-3px);
                    font-family:'SourceHan';
                }
                .alecto-progressbar{
                    background-color:#76ddff;
                    height:4px;
                    position:fixed;
                    left:0px;
                    top:0px;
                    transition:all 1s;
                }
            </style>
            <div class='alecto-progressbar' id='alecto-progressbar' style='width:`+this.bannerProg+`%;'>
                
            </div>
        `;
        let inj = "";
        
        inj += `
            <span class='alecto-title'>Alecto</span>
        `;
        inj += styleInject;

        inj += `
            <span class='alecto-body' id='alecto-body'>
        `+x+`</span>`;

        inj += "<span class='alecto-right'>";
        inj += `  <a class="alecto-btn" id='alecto-btn-a' href='javascript:void(0)' onclick='window.alecto.run()'>`+g.lang.runLabel+`</a>`;
        inj += `  <a class="alecto-btn" href='javascript:void(0)' onclick='alert("by Aeroraven. Version `+g.version+`. Repo:https://github.com/Aeroraven/Alecto");window.alecto.confirm()'>`+g.lang.about+`</a>`;
        //inj += `  <a class="alecto-btn" href='javascript:void(0)' onclick='window.alecto.setLang("en")'>English</a>`;
        inj += "</span>";
        w.innerHTML = inj;
    };
}