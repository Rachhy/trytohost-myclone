const extractImageBuffer = (imageBase64: string): Buffer => {
    
    const imageData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(imageData, 'base64');
}

export default extractImageBuffer;