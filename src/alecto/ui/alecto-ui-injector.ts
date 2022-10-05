import { AlectoAssets } from "../asset/alecto-assets";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal } from "../core/alecto-global";
import { AlectoLogger } from "../core/alecto-logger";
import { AlectoRuntimeUtils } from "../core/alecto-runtime-utils";

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
    public detachBanner(){
        this.bannerObject.style.display = "none"
    }
    public async setupBanner(){
        let g = AlectoGlobal.getInst()
        let w = document.createElement("div");
        w.style.position = "fixed";
        w.style.top = "0px";
        w.style.left = "0px";
        w.style.width = "100%";
        w.style.zIndex = "114514191"; //?
        w.id = "alecto-wrapper"
        w.innerHTML = g.lang.startup;
        w.style.height = "200px";
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
        await AlectoRuntimeUtils.periodicCheck(()=>{
            let w = (document.getElementById("alecto-log-op"))
            return !(w == null || w == undefined)
        },100)
        this.setLoggerSync()
    }
    private setLoggerSync = ()=>{
        setInterval(()=>{
            let w = <HTMLTextAreaElement>(document.getElementById("alecto-log-op"))
            w.value = AlectoLogger.getInst().getLog()

            let s = <HTMLElement>(document.getElementById('alecto-pcounter'))
            s.innerHTML = Math.ceil(this.bannerProg)+"%"
        },500)
    }

    public setBannerTask(cur:string,nxt:string){
        let c = document.getElementById('alecto-curt')
        let n = document.getElementById('alecto-nxtt')
        c!.innerHTML = cur
        n!.innerHTML = nxt
    }
    private setupBannerPost = (x:string)=>{
        let g = AlectoGlobal.getInst()
        let w = this.bannerObject;
        let asset = AlectoAssets.getInst();
        let styleInject = `
            <style>
                .alecto-btn{
                    background-color:#10b2ff;
                    color:#000000;
                    padding-left:14px;
                    padding-top:6px;
                    padding-right:14px;
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

                .alecto-hr{
                    background-color:#444444;
                    height:2px;
                    position:fixed;
                    left:25px;
                    right:25px;
                    top:60px;
                    transition:all 1s;
                    z-index:2;
                }
                .alecto-hr-top{
                    background-color:#10b2ff;
                    height:2px;
                    position:fixed;
                    left:25px;
                    width: 10%;
                    top:60px;
                    transition:all 1s;
                    z-index:3;
                }
                .alecto-grid{
                    height:100px;
                    display:inline-block;
                    vertical-align:top;
                }
                .alecto-detail-container{
                    margin-top:30px;
                    width:95%;
                }
                .alecto-tasklist-container{
                    width:15%;
                }  
                .alecto-taskdetail-container{
                    width:80%;
                    margin-left:60px;
                }
                #alecto-log-op{
                    width:100%;
                    background-color: #0b0b0b;
                    border:none;
                    color: #efefef;
                    height:100px;
                }
                .alecto-inprog{
                    width:100%;
                    height:30px;
                    border: 1px solid #10b2ff;
                    background-color:#10b2ff;
                    color:#0b0b0b;
                    padding-left: 20px;
                    padding-top:5px;
                    margin-bottom:7px;
                    margin-top:7px;
                }
                .alecto-serial{
                    font-family:'Geometos';
                }

                .alecto-prog-next{
                    width:100%;
                    height:30px;
                    border: 1px solid #10b2ff;
                    background-color:#0b0b0b;
                    color:#10b2ff;
                    padding-left: 20px;
                    padding-top:5px;
                    margin-bottom:15px;
                    margin-top:7px;
                }
                textarea::-webkit-scrollbar {
                    width: 4px;    
                }
                textarea::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    background: #10b2ff;
                }
                textarea::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    border-radius: 0;
                    background: rgba(0,0,0,0.1);
        
                }
            </style>
            <div class='alecto-progressbar' id='alecto-progressbar' style='width:`+this.bannerProg+`%;'>
            </div>
        `;
        let inj = "";
        
        inj += `
            <span class='alecto-title'>Alecto</span>
            <span class='alecto-title' id='alecto-pcounter'>50%</span>
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

        //v0.2e
        inj += `
        <div class='alecto-hr'> </div>
        <div class='alecto-hr-top'> </div>
        <div class='alecto-detail-container'>
            <div class="alecto-grid alecto-tasklist-container">
                <div class="alecto-inprog">
                    <span class="alecto-serial">
                        NOW&nbsp; |
                    </span>
                    <span id="alecto-curt">进行的任务</span>
                </div>
                <div style='width:100%;text-align:center'>
                ▼ ▼ ▼
                </div>
                <div class="alecto-prog-next">
                    <span class="alecto-serial">
                        NEXT |
                    </span>
                    <span id="alecto-nxtt">后续任务</span>
                </div>
            </div>


            <div class="alecto-grid alecto-taskdetail-container">
                <b style='margin-bottom:3px;'>当前进度:</b><br/>
                <textarea id='alecto-log-op'></textarea>
            </div>
        </div>
        `
        w.innerHTML = inj;
    };
}