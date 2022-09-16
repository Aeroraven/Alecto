(function(){
    if('alecto' in window){
        alert("Alecto has already been launched.");
        return;
    }
    (new Promise(async (resolve)=>{
        function fetchTimeout(fetch_p,timeout=20000){
            var abort_fn = null;
            var abort_p = new Promise(function(resolve, reject) {
                abort_fn = function() {
                     reject('Promise Timeout');
                 };
            });
            var ret_p = Promise.race([
                fetch_p,
                abort_p
            ]);
            setTimeout(function() {
                abort_fn();
            }, timeout);
            return ret_p;
        }
        var _frame = document.createElement('iframe');
        document.body.appendChild(_frame);
        window.fetch = _frame.contentWindow.fetch;
        _frame.style.display = "none";
        var srcMirrors = [
            'https://raw.githubusercontent.com/Aeroraven/Alecto/main/src/alecto.js',
            'https://aeroraven.github.io/alecto/alecto.js',
            'https://localhost:3000/alecto.js',
        ];
        var w = "";
        for(var i = 0;i<srcMirrors.length;i++){
            try {
                w = await (await fetchTimeout(window.fetch(srcMirrors[i]),5000)).text();
                if(w!=""){
                    break;
                }
            } catch (error) {
                continue;
            }
        }
        if(w==""){
            alert("Cannot fetch the latest script. Refer to https://github.com/Aeroraven/Alecto for more information");
        }else{
            window.eval(w);
            alert("Alecto is now loaded successfully!");
        }
    }));
})();
