import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AlectoAnalyzedCommentFormat } from "../comment-utils/alecto-comment-analyzer";
import { AlectoComponent } from "../core/alecto-component";
import { AlectoRuntimeUtils } from '../core/alecto-runtime-utils';
import { AlectoProgressCallback } from '../core/alecto-progress-callback';
import { AlectoGlobal } from '../core/alecto-global';

export class AlectoPacker extends AlectoComponent{
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
            let x = await AlectoRuntimeUtils.fetchBlob(abstractImgs[i]);
            await AlectoRuntimeUtils.sleep(100)
            size+=x.size;
            folder!.file(i+".jpg",x);
        }

        for(let i=0;i<analyzedResult.length;i++){
            AlectoRuntimeUtils.log("Gathering resource, at index:"+i+" / "+analyzedResult.length);
            
            let el = analyzedResult[i];
            let prefix = "Textonly";
            if(el.photos.length==0&&el.video.length==0){
                prefix = "Textonly";
            }else{
                prefix = "Multimedia";
            }
            let folder = this.zip.folder(prefix+"-"+el.date+"-"+el.user);
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
                    AlectoRuntimeUtils.log("Fetching image resource:"+el.photos[j].replace(/\/\//g,""));
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
                    
                    AlectoRuntimeUtils.log("Fetching video resource:"+el.video[j].replace(/\/\//g,""));
                    let x = await AlectoRuntimeUtils.fetchBlob("https:"+el.video[j]);
                    size+=x.size;
                    await AlectoRuntimeUtils.sleep(100);
                    folder.file(j+".mp4",x);
                }
                folder.file("comment.txt",el.content);
            }else{
                AlectoRuntimeUtils.log("Failed to create folder");
            }
        }
        
        let cb:AlectoProgressCallback = {
            status: g.lang.bundle,
            progress: 1
        } 
        this.doCallback(cb);

        await this.execute(true);

        let content = await this.zip.generateAsync({type:"blob"});
        let data = document.getElementsByTagName("title")[0].innerHTML
        
        saveAs(content, data+".zip");
    }


}