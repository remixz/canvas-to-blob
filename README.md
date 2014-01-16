## canvas-to-blob

A polyfill for the [canvas.toBlob](https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement) method, for the browser.

### Installation

```
npm install canvas-to-blob
```

### Methods

```js
var toBlob = require('canvas-to-blob');
```

`toBlob(uri)` - Transforms the Base64-encoded `uri` into a `Blob`.

`toBlob.init()` - Attaches the `toBlob` function to the Canvas prototype.

`toBlob.supported` - Returns `true` if this method is supported by the browser, otherwise `false`.
