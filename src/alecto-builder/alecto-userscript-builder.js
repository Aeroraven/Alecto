
const fs = require('fs');
const base64_encode = file => {
    let bitmap = fs.readFileSync(file);
    let rtn= `${Buffer.from(bitmap).toString('base64')}`;
    return rtn
}
let w = base64_encode('./dist/alecto.min.js')
let h = `// ==UserScript==
// @name         Alecto
// @namespace    https://github.com/Aeroraven/Alecto/
// @version      0.2c
// @description  Alecto Userscript
// @author       Aeroraven
// @include      *taobao*
// @include      *tmall*
// @grant        unsafeWindow
// @grant        GM_download
// ==/UserScript==
`
let p = h+"\n unsafeWindow.eval(unsafeWindow.atob('"+w+"'))"
fs.writeFile('./dist/alecto.user.js', p ,err=>{
    if(err){
        throw err
    }
});

