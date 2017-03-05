import _ from 'underscore';
import React, { Component } from 'react';
import './App.css';
import { CharInput, SIZE } from './components/CharInput';
import ImageProcessor from './lib/imageProcessor.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: [],
      stepsX: window.innerWidth  / SIZE,
      stepsY: window.innerHeight / SIZE,
    };

    this.onClick     = this.onClick.bind(this);
    this.deleteField = this.deleteField.bind(this);
  }

  componentDidMount() {
    console.log(window.innerWidth);
    this.processor = new ImageProcessor(document.getElementById('img'));

  }

  onClick(e) {
    // Snap!
    console.log(this.state);

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let x = e.clientX
    let y = e.clientY
    console.log(x)

    x = x -  SIZE / 2
    y = y -  SIZE / 2

    const field = { x: x, y: y }
    // Check if obj is in array
    const exists = this.state.inputFields.find((i) => {
      return JSON.stringify(i) === JSON.stringify(field);
    })
    if(exists) return;
    this.setState(prevState => ({
      inputFields: prevState.inputFields.concat(field)
    }))
    console.log(this.state);

    this.processor.getPixelData(e.clientX, e.clientY);
  }

  deleteField({ x, y }) {
    this.setState(prevState => ({
      inputFields: prevState.inputFields.filter((f) => f.x !== x && f.y !== y )
    }));
  }

  drawFields() {
    return this.state.inputFields.map( (f, i) => {
      return <CharInput deleteField={this.deleteField} key={i} top={f.y} left={f.x} />
    } );
  }

  render() {
    return (
      <div className="App" style={{width: '100%'}}>
        <div className="container">
          <img width="626" height="1041" id="img" className="crypto-img" onClick={ this.onClick } src="crypto.png" />
          { this.drawFields() }        
        </div>
      </div>
    );
  }
}

export default App;
