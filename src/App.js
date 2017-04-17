import _                    from 'underscore'
import store                from 'store'
import React, { Component } from 'react'
import { CharInput }        from './components/CharInput'
import { isWhite }          from './lib/color-stuff'
import { validCharacters }  from './lib/text-stuff'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [],
      size: 20,
    }
    this.onClick     = this.onClick.bind(this)
    this.onCharClick = this.onCharClick.bind(this)
    this.onKeyPress  = this.onKeyPress.bind(this)
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

  /*
   * Finds each edge of a square
   */
  square(x, y) {
    let color = this.ctx.getImageData(x, y, 1, 1).data
    if(!isWhite(color)) {
      console.info('Not a white pixel : (')
      return
    }
    const startX = x
    const startY = y
    let right, left, top, bottom
    // Find right border first
    for(let x = 0; x < 30; x++) {
      const pos = startX + x
      color = this.ctx.getImageData(pos, startY, 1, 1).data
      if(!isWhite(color)) {
        right = pos
        break
      }
    }
    // Then find bottom border using right border's pos
    for(let y = 0; y < 30; y++) {
      const pos = startY + y
      color = this.ctx.getImageData(startX, pos, 1, 1).data
      if(!isWhite(color)) {
        bottom = pos
        break
      }
    }
    if(!right || !bottom) {
      console.warn('Could not find center')
      return
    }
    // Then left using bottom right
    for(let x = 0; x < 30; x++) {
      const pos = right - 1 - x
      color = this.ctx.getImageData(pos, bottom - 1, 1, 1).data
      if(!isWhite(color)) {
        left = pos
        break
      }
    }
    // And lastly top using bottom right
    for(let y = 0; y < 30; y++) {
      const pos = bottom - 1 - y
      color = this.ctx.getImageData(right - 1, pos, 1, 1).data
      if(!isWhite(color)) {
        top = pos
        break
      }
    }
    const height   = bottom - top
    const width    = right  - left
    const centerX  = left   + width  / 2
    const centerY  = top    + height / 2
    const tooBig   = width > 50 || height > 50
    const tooSmall = width < 10 || height < 10
    if(tooBig || tooSmall || !height || !width) {
      console.warn('Could not find center')
      return
    }
    return { x: centerX, y: centerY, size: width - 2 }
  }

  onClick(e) {
    const rect = this.canvas.getBoundingClientRect()
    const canvasX = e.clientX - rect.left
    const canvasY = e.clientY - rect.top
    this.placeField(canvasX, canvasY)
  }

  placeField(canvasX, canvasY) {
    const square = this.square(canvasX, canvasY)
    if (!square) return
    if (!this.state.size) {
      this.setState( { size: square.size } )
    }
    let { x, y } = square

    x = Math.round( x - this.state.size / 2 )
    y = Math.round( y - this.state.size / 2 )

    const key = `${x}:${y}`
    // Set focus to field if it already exists
    const existingField = this.state.fields.find((f) => {
      return f.key === key
    })
    if(existingField) {
      console.info('Exists')
      this.setFocusByKey(existingField.key)
      return
    }
    const field = { key: key, x: x, y: y, char: null, hasFocus: true }
    this.setState(prevState => ({
      fields: prevState.fields.concat(field)
    }))
  }

  setCharByKey(key, char, cb) {
    this.setState(prevState => ({
      fields: prevState.fields.map((f) => {
        if(f.key === key) {
          f.char = char
        }
        return f
      })
    }), cb)
  }

  setFocusByKey(key, cb) {
    this.setState(prevState => ({
      fields: prevState.fields.map((f) => {
        if(f.key === key) {
          f.hasFocus = true
        } else {
          f.hasFocus = false
        }
        return f
      })
    }), cb)
  }

  onKeyPress(e, x, y) {
    console.log(e.key)
    console.log(e.keyCode)
    const id = `${x}:${y}`
    // Pressed Enter, add input field below
    if(e.key === 'Enter') {
      e.preventDefault()
      this.placeField(x, y + this.state.size * 2)
      return
    }
    // Pressed Space, add input field right
    if(e.key === ' ') {
      e.preventDefault()
      this.placeField(x + this.state.size * 2, y)
      return
    }
    // Pressed another key, check it against allowed characters
    if(!validCharacters.test(e.key)) {
      e.preventDefault()
      return
    }
    // Pressed backspace, clear input field
    if(e.keyCode === 8) {
      this.setCharByKey(id, null, () => {
        console.log(this.state)
      })
      return
    }
    // Char is allowed, update state
    this.setCharByKey(id, e.key, () => {
      console.log(this.state)
    })
  }

  onCharClick(e, x, y) {
    console.log(e)
    const id = `${x}:${y}`
    this.setFocusByKey(id, () => {
      console.log(this.state)
    })
  }

  renderCharInputs() {
    return this.state.fields.map((f) => {
      return (
        <CharInput
          onKeyPress={ this.onKeyPress }
          onClick={ this.onCharClick }
          key={ f.key }
          top={ f.y }
          left={ f.x }
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
