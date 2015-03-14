/*
*	Cross-browser Overclockers UK (OcUK) shopping cart to forum BB-Code converter bookmarklet bootstrapper
*	by Andrew Killer <akiller@gmail.com>
*	https://github.com/akiller/ocuk-shopping-cart-to-forum-converter
*
*	Rewrite/pilfer of Oliver UK's OcUK Shopping Cart Viewer (https://chrome.google.com/webstore/detail/empfloiadabicdlgahhamannadefhehj?gl=IN)
*
*	Bookmarklet template: http://stackoverflow.com/a/6235308/171703
*	Bookmarklet generator: http://userjs.up.seesaa.net/js/bookmarklet.html
*/

(function() {
    var callback = function() {
    };

    if (typeof (MyLib) == 'undefined') {
        var sources = [
            'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
            'https://raw.githubusercontent.com/akiller/ocuk-shopping-cart-to-forum-converter/master/ocuk.js'];

        var loadNextScript = function() {
            if (sources.length > 0) {
                var script = document.createElement('script');
                script.src = sources.shift();
                document.body.appendChild(script);

                var done = false;
                script.onload = script.onreadystatechange = function() {
                    if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                        done = true;
                        script.onload = script.onreadystatechange = null;
                        loadNextScript();
                    }
                };
            } else {
                callback();
            }
        };
        loadNextScript();

    } else {
        callback();
    }
})();
