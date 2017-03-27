import _ from 'underscore';
import React, { Component } from 'react';
import './App.css';
import { CharInput } from './components/CharInput';
import { isWhite } from './lib/color-stuff'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      size: 20,
    };
    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx    = this.canvas.getContext('2d');
    const img   = new Image(); img.src     = 'crypto.png';
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

    const key = `${x}:${y}`
    // Set focus to field if it already exists
    const existingField = this.state.fields.find((f) => {
      return f.key === key;
    });
    console.log(existingField);
    if(existingField) {
      console.info('Exists')
      this.setFocusByKey(existingField.key)
      return;
    }
    console.log('placing new field')
    const field = { key: key, x: x, y: y, hasFocus: true }
    this.setState(prevState => ({
      fields: prevState.fields.concat(field)
    }));
  }

  setFocusByKey(key, cb) {
    this.setState(prevState => ({
      fields: prevState.fields.map((f) => {
        if(f.key === key) {
          f.hasFocus = true;
        } else {
          f.hasFocus = false;
        }
        console.log(f)
        return f;
      })
    }), cb);
  }

  onKeyPress(e, x, y) {
    console.log(e.key);
    // Pressed backspace, remove input field
    if(e.key === 'Backspace') {
      // console.log(this.state.charInputs);
      // this.setState(prevState => ({
        // charInputs: prevState.charInputs.filter((f) => {
          // const currentField = f.x !== x || f.y !== y
          // return currentField
        // })
      // }), () => {
        // console.log(this.state.charInputs);
      // });
      // return;
    }
    // Pressed Enter, add input field below
    if(e.key === 'Enter') {
      e.preventDefault();
      this.placeField(x, y + this.state.size * 2)
      return;
    }
    // Pressed Space, add input field right
    if(e.key === ' ') {
      e.preventDefault();
      this.placeField(x + this.state.size * 2, y)
      return;
    }
  }

  renderCharInputs() {
    console.log(this.state)
    return this.state.fields.map((f) => {
      return (
        <CharInput
          onKeyPress={ this.onKeyPress }
          key={ f.key }
          top={ f.y }
          left={ f.x }
          hasFocus={ f.hasFocus }
          size={ this.state.size } />
      )
    });
  }

  render() {
    console.log('render called');
    return (
      <div className="App">
        <canvas
          className="canvas"
          id="canvas"
          onClick={ this.onClick }
        />
        { this.renderCharInputs() }
      </div>
    );
  }
}

export default App;
