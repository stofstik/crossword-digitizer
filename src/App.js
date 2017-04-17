import _                    from 'underscore'
import store                from 'store'
import React, { Component } from 'react'
import { CharInput }        from './components/CharInput'
import { onKeyUp,
         onClick,
         onCharClick }      from './lib/handlers'
import { placeField,
         setCharByKey,
         setFocusByKey }    from './lib/state-stuff'
import { square }           from './lib/pixel-processing'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [],
      size: 20,
    }
    // Handlers
    this.onKeyUp       = onKeyUp.bind(this)
    this.onClick       = onClick.bind(this)
    this.onCharClick   = onCharClick.bind(this)
    // State changers
    this.placeField    = placeField.bind(this)
    this.setCharByKey  = setCharByKey.bind(this)
    this.setFocusByKey = setFocusByKey.bind(this)
    // Pixel processing
    this.square        = square.bind(this)
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas')
    this.ctx    = this.canvas.getContext('2d')
	  const img   = new Image()
	  img.src     = 'crypto.png'
    img.onload  = () => {
      this.canvas.width  = img.width
      this.canvas.height = img.height
      this.ctx.drawImage(img, 0, 0, img.width, img.height)
    }
  }

  renderCharInputs() {
    return this.state.fields.map((f) => {
      return (
        <CharInput
          onKeyUp={ this.onKeyUp }
          onClick={ this.onCharClick }
          key={ f.key }
          top={ f.y }
          left={ f.x }
          char={ f.char }
          hasFocus={ f.hasFocus }
          size={ this.state.size } />
      )
    })
  }

  render() {
    return (
      <div className="App">
        <canvas
          className="canvas"
          id="canvas"
          onClick={ this.onClick }
        />
        { this.renderCharInputs() }
      </div>
    )
  }
}

export default App
