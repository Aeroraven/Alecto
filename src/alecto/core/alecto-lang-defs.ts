export interface AlectoLangDefs{
    startup:string
    reoverride:string
    initdone:string
    loadDeps:string
    loadComments:string
    starts:string
    download:string
    downloaded:string
    bundle:string
    alldone:string
    runLabel:string
    about:string
    error:string
    langChanged:string
    captchaRej:string
    abstractImage:string
    snapshot:string
    cors:string
    //0.2d
    invalidPlatform: string

    //0.3c
    waitForInit:string
    initDone:string
    initiateFetchReq:string
    initiateJSONPReq:string
    locatingCommentApiUrl:string
    obtainedCommentApiUrl:string
    gatherRes:string
    gatherImage:string
    gatherAbstract:string
    gatherVideo:string
    genZip:string
    getBundleName:string
    replaceDataURL:string
    captureSnapshotPage:string
    convertToDataURL:string
    emitAssets:string
    matchingPlatform:string
    recvHijackedMethods:string
    usingEnv:string
    hijackMethod:string
}

export class AlectoDefaultLang implements AlectoLangDefs {
    startup="Initializing"
    reoverride="Reoverridding natives"
    initdone="Initialization done. Click the start button to launch the task"
    loadDeps="Loading dependencies"
    loadComments="Now loading comments"
    starts="Task is starting"
    download="Now downloading resources"
    downloaded="Downloaded"
    bundle="Packing files"
    alldone="Task is completed inspect the browser for the packed file"
    runLabel="Task Start"
    about="Version"
    error="Error occurred press F12 for more information"
    langChanged="Language has been switch to English"
    captchaRej="Captcha required. After the validation press Version button to continue"
    abstractImage="Fetching abstracts"
    snapshot="Capturing comments"
    cors="Images are not captured due to CORS"
    invalidPlatform="Sorry! Current page is not supported now."

    //0.3c
    waitForInit="Waiting for page loading..."
    initDone="Initialization is done."
    initiateFetchReq="Initiating Fetch Request:"
    initiateJSONPReq="Initiating JSONP Request:"
    locatingCommentApiUrl="Locating comment API URI:"
    obtainedCommentApiUrl="Comment API has been obtained successfully."
    gatherRes="Gathering resource, at index:"
    gatherImage="Fetching image resource:"
    gatherAbstract="Fetching abstract resource:"
    gatherVideo="Fetching video resource:"
    genZip="Generating Zip"
    getBundleName="Getting bundle name"
    replaceDataURL="Replaced image with Data URL:"
    captureSnapshotPage="Capturing snapshot. Page:"
    convertToDataURL="Converting to Data URL"
    emitAssets="Emitting assets..."
    matchingPlatform="Matching platform:"
    recvHijackedMethods="Recover hijacked native methods"
    usingEnv="Using Env:"
    hijackMethod="Hijacking native methods:"
}