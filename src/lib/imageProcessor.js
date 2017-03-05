class ImageProcessor {
  constructor(img) {
    this.canvas = document.createElement('canvas');
    this.canvas.width  = img.width;
    this.canvas.height = img.height;
    this.ctx = this.canvas.getContext('2d')
    this.ctx.drawImage(img, 0, 0, img.width, img.height);
    console.log('w: %s h: %s', this.canvas.width, this.canvas.height);
    console.log(img);
    console.log(this.canvas)
    console.log(this.ctx)
    
  }

  findSquareSize() {

  }

  getPixelData(x, y) {
    console.log({x, y});
    const pixelData = this.ctx.getImageData(x, y, 1, 1)
    console.log(pixelData);
  }

}

module.exports = ImageProcessor
