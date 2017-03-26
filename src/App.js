import _ from 'underscore';
import React, { Component } from 'react';
import './App.css';
import { CharInput } from './components/CharInput';
import { isWhite } from './lib/color-stuff'
import Field from './lib/field'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: [],
      size: 20,
    };
    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx    = this.canvas.getContext('2d');
    const img   = new Image();
    img.src     = 'crypto.png';
    img.onload  = () => {
      this.canvas.width  = img.width;
      this.canvas.height = img.height;
      this.ctx.drawImage(img, 0, 0, img.width, img.height);
    }
  }

  /*
   * Finds each edge of a square
   */
  square(x, y) {
    let color = this.ctx.getImageData(x, y, 1, 1).data;
    if(!isWhite(color)) {
      console.info('Not a white pixel : (');
      return;
    }
    const startX = x;
    const startY = y;
    let right, left, top, bottom;
    // Find right border first
    for(let x = 0; x < 30; x++) {
      const pos = startX + x;
      color = this.ctx.getImageData(pos, startY, 1, 1).data;
      if(!isWhite(color)) {
        right = pos;
        break;
      }
    }
    // Then find bottom border using right border's pos
    for(let y = 0; y < 30; y++) {
      const pos = startY + y;
      color = this.ctx.getImageData(startX, pos, 1, 1).data;
      if(!isWhite(color)) {
        bottom = pos;
        break;
      }
    }
    if(!right || !bottom) {
      console.warn('Could not find center');
      return;
    }
    // Then left using bottom right
    for(let x = 0; x < 30; x++) {
      const pos = right - 1 - x;
      color = this.ctx.getImageData(pos, bottom - 1, 1, 1).data;
      if(!isWhite(color)) {
        left = pos;
        break;
      }
    }
    // And lastly top using bottom right
    for(let y = 0; y < 30; y++) {
      const pos = bottom - 1 - y;
      color = this.ctx.getImageData(right - 1, pos, 1, 1).data;
      if(!isWhite(color)) {
        top = pos;
        break;
      }
    }
    const height   = bottom - top;
    const width    = right  - left;
    const centerX  = left   + width  / 2;
    const centerY  = top    + height / 2;
    const tooBig   = width > 50 || height > 50;
    const tooSmall = width < 10 || height < 10;
    if(tooBig || tooSmall || !height || !width) {
      console.warn('Could not find center');
      return;
    }
    return { x: centerX, y: centerY, size: width - 2 }
  }

  onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;
    this.placeField(canvasX, canvasY)
  }

  placeField(canvasX, canvasY) {
    const square = this.square(canvasX, canvasY);
    if (!square) return;
    if (!this.state.size) {
      this.setState( { size: square.size } )
    }
    let { x, y } = square;

    x = Math.round( x - this.state.size / 2 )
    y = Math.round( y - this.state.size / 2 )

    const field = new Field(x, y);
    // Check if obj is in array
    const exists = this.state.inputFields.find((f) => {
      return JSON.stringify({ x: f.x, y: f.y }) === JSON.stringify({ x: field.x, y: field.y });
    })
    if(exists) {
      console.info('Exists')
      return;
    }
    this.setState(prevState => ({
      inputFields: prevState.inputFields.concat(field)
    }))
  }

  onKeyUp(e, x, y, size) {
    // Pressed backspace, remove input field
    console.log(x, y)
    if(e.keyCode === 8) {
      // console.log(this.state.inputFields);
      // this.setState(prevState => ({
        // inputFields: prevState.inputFields.filter((f) => {
          // const currentField = f.x !== x || f.y !== y
          // return currentField
        // })
      // }), () => {
        // console.log(this.state.inputFields);
      // });
      // return;
    }
    // Pressed Enter, add input field below
    if(e.keyCode === 13) {
      e.preventDefault();
      this.placeField(x, y + size * 2)
      return;
    }
    if(e.keyCode === 32) {
      e.preventDefault();
      this.placeField(x + size * 2, y)
      return;
    }
  }

  drawFields() {
    return this.state.inputFields.map((f, i) => {
      return <CharInput 
        onKeyUp={ this.onKeyUp } 
        key={ i }
        top={ f.y }
        left={ f.x }
        size={ this.state.size } />
    });
  }

  render() {
    return (
      <div className="App">
        <canvas 
          className="canvas"
          id="canvas" 
          onClick={ this.onClick } 
        />
        { this.drawFields() }        
      </div>
    );
  }
}

export default App;
