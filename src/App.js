import React, { Component }    from 'react'
import _                       from 'underscore'
import bluebird                from 'bluebird'
import store                   from 'store'
import { Button }              from './components/Button'
import { CharInput }           from './components/CharInput'
import { ChooseFilePrompt }    from './components/ChooseFilePrompt'
import { LoadingSpinner }      from './components/LoadingSpinner'
import { onChange }            from './lib/App/handlers'
import { onCharClick }         from './lib/App/handlers'
import { onClick }             from './lib/App/handlers'
import { onFileInputChange }   from './lib/App/handlers'
import { onKeyUp }             from './lib/App/handlers'
import { recalculateFields }   from './lib/utils/pixel-processing'
import { clearAll }            from './lib/App/state-stuff'
import { placeField }          from './lib/App/state-stuff'
import { saveState }           from './lib/App/state-stuff'
import { setCharByKey }        from './lib/App/state-stuff'
import { setFocusByKey }       from './lib/App/state-stuff'
import { setWritingDirection } from './lib/App/state-stuff'

import './App.css'

const PADDING = 16

class App extends Component {
  constructor(props) {
    super(props)
    global.Promise = bluebird.Promise
    // Handlers
    this.onChange            = onChange.bind(this)
    this.onCharClick         = onCharClick.bind(this)
    this.onClick             = onClick.bind(this)
    this.onFileInputChange   = onFileInputChange.bind(this)
    this.onKeyUp             = onKeyUp.bind(this)
    // Pixel processing
    this.recalculateFields   = recalculateFields.bind(this)
    // State changers
    this.clearAll            = clearAll.bind(this)
    this.placeField          = placeField.bind(this)
    this.saveState           = saveState.bind(this)
    this.setCharByKey        = setCharByKey.bind(this)
    this.setFocusByKey       = setFocusByKey.bind(this)
    this.setWritingDirection = setWritingDirection.bind(this)

    this.state = store.get('app-state') || { fields: [], writingDirection: true}
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
      // Calculate canvas size using window width
      const windowWidth = window.innerWidth - PADDING
      const imgRatio    = windowWidth / img.width
      const width       = windowWidth
      const height      = img.height * imgRatio
      const windowRatio = windowWidth / (this.state.windowWidth || 1)

      this.setState({
        windowWidth: windowWidth,
        fields: this.recalculateFields(this.state.fields, windowRatio),
        width:  width,
        height: height
      }, () => {
        this.canvas.width  = width
        this.canvas.height = height
        this.ctx.drawImage(img, 0, 0, width, height)
        this.saveState(this.state)
      })
    }
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
          left={ f.x + ( PADDING / 2 ) }
          char={ f.char }
          hasFocus={ f.hasFocus }
          size={ f.size } />
      )
    })
  }

  render() {
    const { width, height, loading } = this.state
    const canvasContainerStyle = {
      width:  '100%',
      height: '100%',
      display: loading ? 'none' : 'block'
    }
    return (
      <div className="App">
        <div className="app-container">
          <div className="action-bar">
            <div className="upload-button-container">
              <input onChange={ this.onFileInputChange } ref="Upload" id="upload-button" name="upload-button[]" type="file" accept="application/pdf,image/*" />
              <label htmlFor="upload-button">
                <Button buttonCSS="upload-button" icon="file_upload" />
              </label>
            </div>
            <Button buttonCSS="delete-button" onClick={ this.clearAll } icon="delete_forever" />
          </div>

          {
            !width && !height && !loading ?
              <ChooseFilePrompt />
            :
              null
          }


          {
            loading ?
              ( <LoadingSpinner /> )
            :
              null
          }

          <div id="canvas-container" style={ canvasContainerStyle } className="canvas-container">
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
