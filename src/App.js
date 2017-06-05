import _                       from 'underscore'
import store                   from 'store'
import React, { Component }    from 'react'
import { Button }              from './components/Button'
import { CharInput }           from './components/CharInput'
import { onKeyUp }             from './lib/App/handlers'
import { onChange }            from './lib/App/handlers'
import { onClick }             from './lib/App/handlers'
import { onCharClick }         from './lib/App/handlers'
import { onFileInputChange }   from './lib/App/handlers'
import { clearAll }            from './lib/App/state-stuff'
import { placeField }          from './lib/App/state-stuff'
import { setCharByKey }        from './lib/App/state-stuff'
import { setFocusByKey }       from './lib/App/state-stuff'
import { setWritingDirection } from './lib/App/state-stuff'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = store.get('app-state') || { fields: [], writingDirection: true}
    // Handlers
    this.onKeyUp             = onKeyUp.bind(this)
    this.onChange            = onChange.bind(this)
    this.onClick             = onClick.bind(this)
    this.onCharClick         = onCharClick.bind(this)
    this.onFileInputChange   = onFileInputChange.bind(this)
    // State changers
    this.clearAll            = clearAll.bind(this)
    this.placeField          = placeField.bind(this)
    this.setCharByKey        = setCharByKey.bind(this)
    this.setFocusByKey       = setFocusByKey.bind(this)
    this.setWritingDirection = setWritingDirection.bind(this)
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas')
    this.ctx    = this.canvas.getContext('2d')
    this.updateCanvas()
  }

  updateCanvas() {
    const img   = new Image()
    img.src     = store.get('image')
    img.onload  = () => {
      const ratio = window.innerWidth / img.width
      const width  = img.width  * ratio
      console.log("img.width", img.width)
      const height = img.height * ratio
      console.log("img.height", img.height)
      console.log("img", img)

      this.setState({
        width:  width,
        height: height
      }, () => {
        this.canvas.width  = width
        this.canvas.height = height
        this.ctx.drawImage(img, 0, 0, width, height)
      })
    }
  }

  pdfToImg() {
    console.log("pdfToImg")
  }

  renderCharInputs() {
    return this.state.fields.map((f) => {
      return (
        <CharInput
          onKeyUp={ this.onKeyUp }
          onChange={ this.onChange }
          onClick={ this.onCharClick }
          key={ f.key }
          top={ f.y }
          left={ f.x }
          char={ f.char }
          hasFocus={ f.hasFocus }
          size={ f.size } />
      )
    })
  }

  render() {
    const style = {
      width:  this.state.width,
      height: this.state.height
    }
    return (
      <div className="App">
        <div className="app-container">
          <div className="action-bar">
            <input onChange={ this.onFileInputChange } ref="Upload" id="upload-button" name="upload-button[]" type="file" accept="application/pdf,image/*" />
            <label htmlFor="upload-button">
              <Button buttonCSS="upload-button" icon="file_upload" />
            </label>
            <Button buttonCSS="delete-button" onClick={ this.clearAll } icon="delete_forever" />
          </div>
          <div style={ style } className="canvas-container">
            <canvas
              className="canvas"
              id="canvas"
              onClick={ this.onClick }
            />
            { this.renderCharInputs() }
          </div>
        </div>
      </div>
    )
  }
}

export default App
