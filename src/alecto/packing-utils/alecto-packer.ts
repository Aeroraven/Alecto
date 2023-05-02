import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AlectoAnalyzedCommentFormat } from "../comment-utils/alecto-comment-analyzer";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoRuntimeUtils } from '../core/alecto-runtime-utils';
import { AlectoProgressCallback } from '../core/alecto-progress-callback';
import { AlectoGlobal } from '../core/alecto-global';

export class AlectoPacker extends AlectoComponent{
    //Attributes
    static readonly SOURCE_ANALYZED_COMMENTS = "ALP_SAC"
    static readonly SOURCE_ABSTRACT_IMGS = "ALP_AIMS"

    zip:JSZip
    constructor(){
        super()
        this.zip = new JSZip();
    }
    public getZip(){
        return this.zip;
    }
    public async createZip(analyzedResult:AlectoAnalyzedCommentFormat[],abstractImgs: string[]){
        let idx = 0;
        let size = 0;
        let g = AlectoGlobal.getInst();

        for(let i=0;i<abstractImgs.length;i++){
            let folder = this.zip.folder("Showcase-Abstract");
            //Callback
            let cb:AlectoProgressCallback = {
                status: g.lang.abstractImage+" ("+i+"/"+abstractImgs.length+")",
                progress: i/abstractImgs.length
            } 
            this.doCallback(cb)
            AlectoRuntimeUtils.log(g.lang.gatherAbstract+abstractImgs[i]);
            let x = await AlectoRuntimeUtils.fetchBlob(abstractImgs[i]);
                   
            await AlectoRuntimeUtils.sleep(100)
            size+=x.size;
            folder!.file(i+".jpg",x);
        }
        let pfolder = this.zip.folder("Comments")!
        for(let i=0;i<analyzedResult.length;i++){
            AlectoRuntimeUtils.log(g.lang.gatherRes+i+" / "+analyzedResult.length);
            
            let el = analyzedResult[i];
            let prefix = "Textonly";
            if(el.photos.length==0&&el.video.length==0){
                prefix = "Textonly";
            }else{
                prefix = "Multimedia";
            }
            let folder_name = prefix+"-"+el.date+"-"+el.user
            folder_name = folder_name.replace(/(\*|\/|\\|\<|\>|\|\?|\:|\")/g,"_")
            let folder = pfolder.folder(folder_name);
            const assertValidFolder = (x:typeof folder):x is JSZip =>{
                if(x==null){
                    return false
                }
                return true
            }
            if(assertValidFolder(folder)){
                for(let j=0;j<el.photos.length;j++){
                    //Callback
                    let cb:AlectoProgressCallback = {
                        status: g.lang.download+" ("+i+" / "+analyzedResult.length+", "+g.lang.downloaded+":"+ parseInt(size/1024/1024+"") +"MB ):"+AlectoRuntimeUtils.formatEllipsis(el.photos[j].replace(/\/\//g,"")),
                        progress: i/analyzedResult.length
                    } 
                    this.doCallback(cb);

                    //Photo
                    AlectoRuntimeUtils.log(g.lang.gatherImage+el.photos[j].replace(/\/\//g,""));
                    let x = await AlectoRuntimeUtils.fetchBlob("https:"+el.photos[j]);
                    size+=x.size;
                    await AlectoRuntimeUtils.sleep(100);
                    folder.file(j+".jpg",x);
                }
                for(let j=0;j<el.video.length;j++){
                    //Callback
                    let cb:AlectoProgressCallback = {
                        status: g.lang.download+" ("+i+" / "+analyzedResult.length+", "+g.lang.downloaded+":"+ parseInt(size/1024/1024+"") +"MB ):"+AlectoRuntimeUtils.formatEllipsis(el.video[j].replace(/\/\//g,"")),
                        progress: i/analyzedResult.length
                    } 
                    this.doCallback(cb);
                    
                    AlectoRuntimeUtils.log(g.lang.gatherVideo+el.video[j].replace(/^\/\//g,""));

                    let x:Blob;
                    if(el.video[j].match(/^http/g)!=null){
                        x = await AlectoRuntimeUtils.fetchBlob(el.video[j]);
                    }else{
                        x = await AlectoRuntimeUtils.fetchBlob("https:"+el.video[j]);
                    }
                    
                    size+=x.size;
                    await AlectoRuntimeUtils.sleep(100);
                    folder.file(j+".mp4",x);
                }
                folder.file("comment.txt",el.content);
                folder.file("detail.txt",el.detail);
            }else{
                AlectoRuntimeUtils.log("Failed to create folder");
            }
        }
        
        let cb:AlectoProgressCallback = {
            status: g.lang.bundle,
            progress: 1
        } 
        this.doCallback(cb);
        return this.zip
    }

    protected async executeSelf(): Promise<void> {
        let a0 = <AlectoAnalyzedCommentFormat[]> this.getAttribute(AlectoPacker.SOURCE_ANALYZED_COMMENTS)
        let a1 = <string[]> this.getAttribute(AlectoPacker.SOURCE_ABSTRACT_IMGS)
        let r = await this.createZip(a0,a1)
        this.setStdReturn(r)
    }


}