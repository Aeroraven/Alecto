import { AlectoAssets } from "../asset/alecto-assets";
import { AlectoComponent } from "../core/alecto-component";

export class AlectoUIAboutInjector extends AlectoComponent{
    alertObject: HTMLDivElement

    constructor(){
        super()
        this.alertObject = document.createElement("div");
    }

    setup(){
        let w = this.alertObject;
        w.style.position = "fixed";

        w.style.width = "50%";
        w.style.height = "40%";
        w.style.marginTop = "-10%";
        w.style.marginLeft = "-25%";
        w.style.left = "50%";
        w.style.top = "50%";
        w.style.zIndex = "114514192"; //?
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
        let asset = AlectoAssets.getInst();
        document.body.appendChild(w)

        w.innerHTML = `
        <style>
            .alecto-title-b{
                font-size:25px;
                font-weight:bold;
                padding-top:2px;
                display:inline-block;
                margin-right:15px;
                color:#10b2ff;
                font-family:'Geometo','SourceHan';
            }
            .alecto-title-c{
                font-size:20px;
                font-weight:bold;
                padding-top:2px;
                display:inline-block;
                margin-right:15px;
                color:#fafafa;
                font-family:'Geometo','SourceHan';
            }

            .alecto-btn-b{
                background-color:#76ddff;
                color:#000000;
                border-radius:3px;
                padding-left:11px;
                padding-top:6px;
                padding-right:11px;
                padding-bottom:6px;
                margin-left:12px;
                right:5%;
                bottom:12px;
                position:absolute;
            }
        </style>
        <div style="height:100%">
            <span class="alecto-title-b">欢迎使用</span>
            <span class="alecto-title-c">Welcome to Alecto</span>
            <br/><br/>
            <div style="position:relative;height:80%">
                
                <span>
                    <b style="color:#10b2ff">版本 v0.2b</b><br/>
                    <p >
                        1. 使用TypeScript重构：评论截图模块<br/>
                        2. 修复部分错误<br/>
                        3. 请保证在网络畅通条件下使用本插件<br/>
                        <br/>
                        Alecto@0.2b, https://github.com/Aeroraven/Alecto
                    </p>
                </span>
                <span class="alecto-btn-b">确定</span>
            </div>
        </div>
        `
    }
}