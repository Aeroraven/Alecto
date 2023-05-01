//To intercept the XHRRequests for TMALL v8


export function alectoNMInjectNativeMethods(){
    if (!(XMLHttpRequest.prototype.open_old!=undefined)){
        window.alectoNatListener = {
            xhrOpenLists:[]
        }
        XMLHttpRequest.prototype.open_old = XMLHttpRequest.prototype.open
        console.log("[Alecto-NM][WARN] Injected XMLHttpRequest.prototype.open")
    }
    XMLHttpRequest.prototype.open = function(method, url){
        window.alectoNatListener.xhrOpenLists.push(url)
        console.log("[Alecto-NM][WARN] Request opened:"+url)
        return this.open_old(method,url)
    }
}
export function alectoNMGetXHROpenLists(){
    return window.alectoNatListener.xhrOpenLists
}