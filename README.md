# image-dimensionjs
## Description  
pure js module get image size, image dimensions.

## Browser
```html
<script src="./image-dimension.js" ></script>
<script>
    console.log(JSON.stringify(ReadJPG(bytes)))
    console.log(JSON.stringify(ReadPNG(bytes)))
    console.log(JSON.stringify(ReadGIF(bytes)))
    console.log(JSON.stringify(ReadBMP(bytes)))

    console.log(JSON.stringify(ReadPNGBase64(base64)))
    console.log(JSON.stringify(ReadJPGBase64(base64)))
    console.log(JSON.stringify(ReadGIFBase64(base64)))
    console.log(JSON.stringify(ReadBMPBase64(base64)))
    
</script> 
```

## Module
```js
import { ReadJPG, ReadPNG, ReadGIF, ReadBMP } from './image-dimension.js'

console.log(JSON.stringify(ReadJPG(bytes)))
console.log(JSON.stringify(ReadPNG(bytes)))
console.log(JSON.stringify(ReadGIF(bytes)))
console.log(JSON.stringify(ReadBMP(bytes)))

console.log(JSON.stringify(ReadPNGBase64(base64)))
console.log(JSON.stringify(ReadJPGBase64(base64)))
console.log(JSON.stringify(ReadGIFBase64(base64)))
console.log(JSON.stringify(ReadBMPBase64(base64)))
```
