import { AlectoAssets } from "../asset/alecto-assets";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoGlobal } from "../core/alecto-global";

export class AlectoUIAboutInjector extends AlectoComponent{
    alertObject: HTMLDivElement

    constructor(){
        super()
        this.alertObject = document.createElement("div");
    }

    setup(){
        let w = this.alertObject;
        w.style.position = "fixed";
        w.id = "alecto-about-popup"
        w.style.width = "50%";
        w.style.height = "50%";
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
                    <b style="color:#10b2ff">版本 `+AlectoGlobal.getInst().version+` 注意事项</b><br/>
                    <p >
                        1. 脚本将对您当前浏览的网页进行破坏性且不可逆的操作，请不要使用当前网页进行敏感操作。<br/>
                        2. 脚本将访问您的敏感信息，如Cookie等。但不会将其存储、上传。<br/>
                        3. 脚本的使用可能违反您和当前网页提供者签订的用户协议，作者不对此造成的后果承担责任<br/>
                        4. 请勿将此脚本运用于非法用途<br/>
                        5. 软件代码本体使用AGPL3.0开源协议，您可以按照协议要求自由地复制分发，并且用于商业用途，<br/>
                           作者不承担责任。<br/>
                        6. 根据AGPL3.0，您对软件进行修改演绎，或引用到其它软件中发布或以其它形式提供服务时<br/>
                           必须无偿地公开地开放源代码，并且对您引用本软件的软件或本软件的派生软件使用AGPL3.0协议<br/>
                        7. 软件扩展部分和UI引用部分资源使用CC4.0-BY-NC或类似协议，将软件用于商用时，<br/>
                           需要排除这些部分。<br/>
                        8. 不同意可以在Tamper Monkey选项卡中关闭本脚本。
                        <br/><br/>
                        代码地址: https://github.com/Aeroraven/Alecto
                    </p>
                </span>
                <span class="alecto-btn-b" onclick="document.getElementById('alecto-about-popup').style.display='none'">确定</span>
            </div>
        </div>
        `
    }
}