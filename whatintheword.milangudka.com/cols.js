if (localStorage.colMode == "true") { // If high contrast is turned on
    console.log("High contrast mode enabled.");

    // Body background
    document.body.style.background = "white";

    // Remove background image and set header color
    var bgEl = document.getElementById("background");
    if (bgEl) bgEl.style.backgroundImage = "none";
    var headerEl = document.getElementById("header");
    if (headerEl) headerEl.style.backgroundColor = "white";

    // Loop through all elements to adjust styles
    document.querySelectorAll('*').forEach(function(el) {
        var style = window.getComputedStyle(el);
        var color = style.color || "";
        var bgImage = style.backgroundImage || "";
        var bgColor = style.backgroundColor || "";

        // Convert teal, #15b295, or darkgreen text to black
        if (
            color === 'rgb(0, 128, 128)' || // teal
            color === 'rgb(21, 178, 149)' || // #15b295
            color === 'rgb(0, 100, 0)' // darkgreen
        ) {
            el.style.color = 'black';
        }

        // Remove teal/#15b295 gradients and replace with white
        if (bgImage && bgImage.indexOf("linear-gradient") !== -1 &&
            (bgImage.indexOf("teal") !== -1 || bgImage.indexOf("#15b295") !== -1)) {
            el.style.backgroundImage = "none";
            el.style.backgroundColor = "white";
        }

        // Convert semi-transparent white (#ffffffdd) to solid white
        if (bgColor === 'rgba(255, 255, 255, 0.866667)') {
            el.style.backgroundColor = "white";
        }

        // Convert dark green backgrounds to black
        if (bgColor === 'rgb(0, 100, 0)') { // darkgreen background
            el.style.backgroundColor = "black";
        }

        // === Specific handling for tables with #ffffffb3 ===
        // computed style often gives rgba(255, 255, 255, 0.701961) for #ffffffb3
        // Detect rgba(255, 255, 255, alpha) with alpha ~0.70196 (we accept >= 0.6)
        if (el.tagName === 'TABLE') {
            var inlineStyle = (el.getAttribute && el.getAttribute('style')) || "";
            var foundHex = /#ffffffb3/i.test(inlineStyle);
            if (foundHex) {
                el.style.backgroundColor = "white";
            } else if (bgColor && bgColor.indexOf('rgba') === 0) {
                // parse alpha value from rgba(...)
                var m = bgColor.match(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([0-9.]+)\s*\)/);
                if (m && m[1]) {
                    var alpha = parseFloat(m[1]);
                    if (!isNaN(alpha) && alpha >= 0.6) { // threshold covers #ffffffb3 (~0.702)
                        el.style.backgroundColor = "white";
                    }
                }
            } else if (bgColor === 'rgb(255, 255, 255)') {
                // already solid white - ensure it's explicit
                el.style.backgroundColor = "white";
            }
        }
    });

    // Force all tables to have white background (extra safety)
    document.querySelectorAll('table').forEach(function(tbl) {
        // also check computed style and inline hex as a fallback
        var s = window.getComputedStyle(tbl).backgroundColor || "";
        var inline = (tbl.getAttribute && tbl.getAttribute('style')) || "";
        if (/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/.test(s) || /#ffffffb3/i.test(inline) || tbl.style.backgroundColor === "") {
            tbl.style.backgroundColor = "white";
        } else {
            // If table already has some other background but you want to force all to white regardless:
            tbl.style.backgroundColor = "white";
        }
    });

}

else { // If high contrast is turned off
    console.log("High contrast mode disabled.");

    // Restore default background and header
    var bgElOff = document.getElementById("background");
    if (bgElOff) bgElOff.style.backgroundImage = "url('Background.jpg')";
    var headerElOff = document.getElementById("header");
    if (headerElOff) headerElOff.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
}

// Toggle on/off functions
function colOn() {
    localStorage.colMode = "true";
    reloader();
}

function colOff() {
    localStorage.colMode = "false";
    reloader();
}

function reloader() {
    window.location.reload();
}