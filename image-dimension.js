
var IMAGE_HEAD_SIGS = {
    GIF: [0x47, 0x49, 0x46], //'G' 'I' 'F' ascii
    PNG: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    JPG: [0xff, 0xd8, 0xff, 0xe0],
    BMP: [0x42, 0x4d]
}

function readUint32BE(bytes, start) {
    var uarr = new Uint32Array(1);
    uarr[0] = (bytes[start + 0] & 0xFF) << 24
    uarr[0] = uarr[0] | ((bytes[start + 1] & 0xFF) << 16)
    uarr[0] = uarr[0] | ((bytes[start + 2] & 0xFF) << 8)
    uarr[0] = uarr[0] | (bytes[start + 3] & 0xFF)
    return uarr[0]
}

function readUint16BE(bytes, start) {
    var uarr = new Uint32Array(1);
    uarr[0] = (bytes[start + 0] & 0xFF) << 8;
    uarr[0] = uarr[0] | (bytes[start + 1] & 0xFF);
    return uarr[0];
}

//LE [0x01,0x02,0x03,0x04] -> 0x04030201
function readUint32LE(bytes, start) {
    var uarr = new Uint32Array(1);
    uarr[0] = (bytes[start + 3] & 0xFF) << 24
    uarr[0] = uarr[0] | ((bytes[start + 2] & 0xFF) << 16)
    uarr[0] = uarr[0] | ((bytes[start + 1] & 0xFF) << 8)
    uarr[0] = uarr[0] | (bytes[start + 0] & 0xFF)
    return uarr[0]
}

function readUint16LE(bytes, start) {
    var uarr = new Uint32Array(1);
    uarr[0] = (bytes[start + 1] & 0xFF) << 8;
    uarr[0] = uarr[0] | (bytes[start + 0] & 0xFF);
    return uarr[0];
}

function ReadPNG(bytes) {
    if (bytes.slice(0, 8).toString() === IMAGE_HEAD_SIGS.PNG.toString()) {
        let width = readUint32BE(bytes, 16);
        let height = readUint32BE(bytes, 20);
        return { width, height }
    }
}


function ReadJPG(bytes) {
    if (bytes.slice(0, 4).toString() === IMAGE_HEAD_SIGS.JPG.toString()) { 
        const M_SOF0 = 0xC0; /* Start Of Frame N */
        const M_SOF1 = 0xC1; /* N indicates which compression process */
        const M_SOF2 = 0xC2; /* Only SOF0-SOF2 are now in common use */
        const M_SOF3 = 0xC3;
        const M_SOF5 = 0xC5; /* NB: codes C4 and CC are NOT SOF markers */
        const M_SOF6 = 0xC6;
        const M_SOF7 = 0xC7;
        const M_SOF9 = 0xC9;
        const M_SOF10 = 0xCA;
        const M_SOF11 = 0xCB;
        const M_SOF13 = 0xCD;
        const M_SOF14 = 0xCE;
        const M_SOF15 = 0xCF;
        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] === 0xFF) {
                switch (bytes[i + 1]) {
                    case M_SOF0:
                    case M_SOF1:
                    case M_SOF2:
                    case M_SOF3:
                    case M_SOF5:
                    case M_SOF6:
                    case M_SOF7:
                    case M_SOF9:
                    case M_SOF10:
                    case M_SOF11:
                    case M_SOF13:
                    case M_SOF14:
                    case M_SOF15:
                        {
                            //高在前，宽在后。
                            let width = readUint16BE(bytes, i + 7)
                            let height = readUint16BE(bytes, i + 5)
                            return { width, height }
                        }
                    default:
                        break;
                }
            }
        }
    }
}

function ReadGIF(bytes) {
    if (bytes.slice(0, 3).toString() === IMAGE_HEAD_SIGS.GIF.toString()) {
        let width = readUint16LE(bytes, 6);
        let height = readUint16LE(bytes, 8);
        return { width, height }
    }
}

function ReadBMP(bytes) {
    if (bytes.slice(0, 2).toString() === IMAGE_HEAD_SIGS.BMP.toString()) {
        //虽然格式为4字节，这里只取2字节，确保height为正数。为负数时，图像为倒置图像。
        let height = readUint16LE(bytes, 22);
        let width = readUint16LE(bytes, 18);
        return { width, height }
    }
}

function base64ToBytes(base64) {
    let baseSplit = reader.result.split(',');
    // let mime = arr[0].match(/:(.*?);/)[1] || type;
    // 去掉url的头，并转化为byte
    let strArray = window.atob(baseSplit[1]);
    // 处理异常,将ascii码小于0的转换为大于0
    let buffer = new ArrayBuffer(strArray.length);
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < strArray.length; i++) {
        bytes[i] = strArray.charCodeAt(i);
    }
    return bytes;
}

function ReadPNGBase64(base64) {
    return ReadPNG(base64ToBytes(base64));
}

function ReadJPGBase64(base64) {
    return ReadJPG(base64ToBytes(base64));
}

function ReadGIFBase64(base64) {
    return ReadGIF(base64ToBytes(base64));
}

function ReadBMPBase64(base64) {
    return ReadBMP(base64ToBytes(base64));
}


export default { 
    ReadPNG, ReadJPG, ReadGIF, ReadBMP, 
    ReadPNGBase64, ReadJPGBase64, ReadGIFBase64, ReadBMPBase64 }






