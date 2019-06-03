const toBlob = function(uri) {
  const mime = uri
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  const bytes = atob(uri.split(',')[1]);
  const len = bytes.length;
  const buffer = new window.ArrayBuffer(len);
  const arr = new window.Uint8Array(buffer);

  for (let i = 0; i < len; i++) {
    arr[i] = bytes.charCodeAt(i);
  }

  return new Blob([arr], { type: mime });
};

const init = function() {
  if (!module.exports.supported) return;
  const CanvasPrototype = window.HTMLCanvasElement.prototype;

  if (!CanvasPrototype.toBlob && CanvasPrototype.toDataURL) {
    CanvasPrototype.toBlob = function(callback, type, quality) {
      callback(toBlob(this.toDataURL(type, quality)));
    };
  }
};

// IE >= 10, most modern browsers
// The Blob type can't be polyfilled, which is why there aren't any polyfills for TypedArrays for older IE's
const supported =
  typeof window.HTMLCanvasElement !== 'undefined' &&
  typeof window.atob !== 'undefined' &&
  typeof window.Blob !== 'undefined' &&
  typeof window.ArrayBuffer !== 'undefined' &&
  typeof window.Uint8Array !== 'undefined';

module.exports = toBlob;
module.exports.init = init;
module.exports.supported = supported;
