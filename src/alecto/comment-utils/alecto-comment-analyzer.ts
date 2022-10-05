import { AlectoComponent } from "../core/alecto-component";
import { AlectoCommentFormat } from "./alecto-comment-handler";

export interface AlectoAnalyzedCommentFormat{
    date:string,
    photos: string[],
    video: string[],
    content: string,
    user:string,
}

export class AlectoCommentAnalyzer extends AlectoComponent{
    //Attribute
    static readonly SOURCE_COMMENTS = "ALCA_SOURCE_COMMENT"; 

    public analyzeComments(commentObject:AlectoCommentFormat[]):AlectoAnalyzedCommentFormat[]{
        let exportedObjectList:AlectoAnalyzedCommentFormat[] = [];
        commentObject.forEach((el)=>{
            let exportedObject:AlectoAnalyzedCommentFormat = {
                date: "",
                photos: [],
                video: [],
                content: "",
                user: ""
            };
            exportedObject.date = el.date;
            exportedObject.photos = (()=>{
                let tw:string[] = [];
                el.photos.forEach((elx)=>{
                    tw.push(elx.url.replace(/_400x400\.jpg$/g,""));
                });
                return tw;
            })();
            exportedObject.video = (()=>{
                let tw:string[] = [];
                el.videos.forEach((elx)=>{
                    tw.push(elx.cloudVideoUrl);
                });
                return tw;
            })();
            exportedObject.content = el.content;
            exportedObject.user = el.user;
            exportedObjectList.push(exportedObject);
        });
        return exportedObjectList;
    };

    protected async executeSelf(): Promise<void> {
        let src = <AlectoCommentFormat[]>this.getAttribute(AlectoCommentAnalyzer.SOURCE_COMMENTS)
        let r = this.analyzeComments(src)
        this.setStdReturn(r)
    }
}