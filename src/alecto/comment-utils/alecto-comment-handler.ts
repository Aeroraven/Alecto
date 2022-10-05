import { AlectoComponent } from "../core/alecto-component";

export interface AlectoCommentFormatVideo{
    cloudVideoUrl: string
}

export interface AlectoCommentFormatPhotos{
    url: string
}

export interface AlectoCommentFormat{
    videos: AlectoCommentFormatVideo[]
    photos: AlectoCommentFormatPhotos[]
    date: string
    user: string
    content: string
}

export abstract class AlectoCommentHandler extends AlectoComponent{
    public abstract  locateJsonpAddress(): string;
    public async findJsonpBody():Promise<AlectoCommentFormat[]> {return []}
    public abstract simStartup():void;
    public extraHooks():void {}

    protected async executeSelf(): Promise<void> {
        this.simStartup()
        let r = await this.findJsonpBody()
        this.setStdReturn(r)
    }
}