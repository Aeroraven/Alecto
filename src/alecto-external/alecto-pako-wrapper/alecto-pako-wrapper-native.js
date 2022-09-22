import Pako from "pako";

export function alectoPakoGzip(s){
    return Pako.gzip(s);
}

export function alectoPakoUnGzip(s){
    return Pako.ungzip(s)
}