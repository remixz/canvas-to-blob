module.exports = function (uri) {
    var mime   = uri.split(',')[0].split(':')[1].split(';')[0];
    var bytes  = atob(uri.split(',')[1]);
    var len    = bytes.length;
    var buffer = new window.ArrayBuffer(len);
    var arr    = new window.Uint8Array(buffer);

    for (var i = 0; i < len; i++) {
        arr[i] = bytes.charCodeAt(i);
    }

    return new Blob([arr], { type: mime });
}

// IE >= 10, most modern browsers
// The Blob type can't be polyfilled, which is why there aren't any polyfills for TypedArrays for older IE's
module.exports.supported = (
    typeof window.HTMLCanvasElement !== 'undefined' &&
    typeof window.atob !== 'undefined' &&
    typeof window.Blob !== 'undefined' &&
    typeof window.ArrayBuffer !== 'undefined' &&
    typeof window.Uint8Array !== 'undefined'
);

module.exports.init = function () {
    if (!module.exports.supported) return;
    var CanvasPrototype = window.HTMLCanvasElement.prototype;
    
    if (!CanvasPrototype.toBlob && CanvasPrototype.toDataURL) {
        CanvasPrototype.toBlob = function (callback, type, quality) {
            callback(module.exports(this.toDataURL(type, quality)));
        }
    }
}
