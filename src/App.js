import _ from 'underscore';
import React, { Component } from 'react';
import './App.css';
import { CharInput } from './components/CharInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: [],
      size: 20,
    };

    this.onClick     = this.onClick.bind(this);
    this.deleteField = this.deleteField.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas')
    this.ctx    = this.canvas.getContext('2d');
    const img   = new Image();
    img.src     = 'crypto.png';
    img.onload  = () => {
      this.ctx.drawImage(img, 0, 0);
      this.findSquareSize();
    }
  }

  isWhite(color) {
    const bool =
      color[0] === 255 &&
      color[1] === 255 &&
      color[2] === 255 &&
      color[3] === 255
    return bool
  }

  isBlack(color) {
    const bool = color[0] === 0 &&
      color[1] === 0 &&
      color[2] === 0 &&
      color[3] === 255
    return bool
  }

  findCenter(x, y) {
    console.log('findCenter');
    let color = this.ctx.getImageData(x, y, 1, 1).data;
    const startX = x;
    const startY = y;
    console.log(startX, startY, color);
    let right, left, top, bottom;
    // Find left border
    for(let x = 0; x < 30; x++) {
      const pos = startX - x;
      color = this.ctx.getImageData(pos, startY, 1, 1).data;
      if(!this.isWhite(color)) {
        left = pos;
        console.log('left border at', left);
        break;
      }
    }
    // Find right border
    for(let x = 0; x < 30; x++) {
      const pos = startX + x;
      color = this.ctx.getImageData(pos, startY, 1, 1).data;
      if(!this.isWhite(color)) {
        right = pos;
        console.log('right border at', right);
        break;
      }
    }
    // Find top border
    for(let y = 0; y < 30; y++) {
      const pos = startY - y;
      color = this.ctx.getImageData(startX, pos, 1, 1).data;
      if(!this.isWhite(color)) {
        top = pos;
        console.log('top border at', top);
        break;
      }
    }
    // Find bottom border
    for(let y = 0; y < 30; y++) {
      const pos = startY + y;
      color = this.ctx.getImageData(startX, pos, 1, 1).data;
      if(!this.isWhite(color)) {
        bottom = pos;
        console.log('bottom border at', bottom);
        break;
      }
    }
    const height = bottom - top;
    const width  = right  - left;
    console.log(height, width);
    const centerX = left + width  / 2;
    const centerY = top  + height / 2;
    console.log(centerX, centerY);
    this.setState( { size: width - 4 } )
    if(width < 50 && height < 50) {
      return { x: centerX, y: centerY };
    }
  }

  estimateSizeByPixelRow(y) {
    console.log('finding square size');
    console.log(this.canvas.width)
    console.log(this.canvas.height)
    const w = this.canvas.width;
    let sizes     = []
    let wCounter  = 0
    let lastColor = 'white';
    // for(let y = 0; y < h; y++) {
    for(let x = 0; x < w; x++) {
      const color = this.ctx.getImageData(x, y, 1, 1).data;
      if(this.isWhite(color)) {
        wCounter++
        lastColor = 'white'
      } else {
        if(lastColor !== 'black') {
          sizes.push(wCounter);
          wCounter = 0;
        }
        lastColor = 'black'
      }
      // }
    }
    console.log('found sizes', sizes)
    const size = _.chain(sizes)
      .countBy()
      .pairs()
      .max(_.last)
      .head()
      .value()
    console.log('estimated size', size)
    this.setState( { size: size } )
  }

  onClick(e) {
    // Snap!
    this.findSquareSize(e.clientY)
    console.log(this.state);

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let x = e.clientX
    let y = e.clientY
    console.log(x)

    x = x -  this.state.size / 2
    y = y -  this.state.size / 2

    const field = { x: x, y: y }
    // Check if obj is in array
    const exists = this.state.inputFields.find((i) => {
      return JSON.stringify(i) === JSON.stringify(field);
    })
    if(exists) return;
    this.setState(prevState => ({
      inputFields: prevState.inputFields.concat(field)
    }))
  }

  deleteField({ x, y }) {
    this.setState(prevState => ({
      inputFields: prevState.inputFields.filter((f) => f.x !== x && f.y !== y )
    }));
  }

  drawFields() {
    return this.state.inputFields.map( (f, i) => {
      return <CharInput deleteField={this.deleteField} key={i} top={f.y} left={f.x} size={this.state.size} />
    } );
  }

  render() {
    return (
      <div className="App" style={{width: '100%'}}>
        <div className="container">
          <canvas id="canvas" width="626" height="1041" onClick={ this.onClick } ></canvas>
          { this.drawFields() }        
        </div>
      </div>
    );
  }
}

export default App;
