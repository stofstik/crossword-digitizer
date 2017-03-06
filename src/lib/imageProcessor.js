class ImageProcessor {
  constructor(document) {
    console.log(document);

    const img = document.getElementById('img');

    console.log('w: %s h: %s', this.canvas.width, this.canvas.height);
    console.log(img);
    console.log(this.canvas)
    console.log(this.ctx)
    
  }

  findSquareSize() {

  }

  getPixelData(x, y) {
    console.log({x, y});
    const pixelData = this.ctx.getImageData(x, y, 1, 1).data
    console.log(pixelData);
  }

}

module.exports = ImageProcessor
