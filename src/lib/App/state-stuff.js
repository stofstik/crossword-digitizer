import store             from 'store'
import { findSquare }    from '../utils/pixel-processing'
import { findHoriVerti } from '../utils/pixel-processing'

export function saveState(state) {
  store.set('app-state', state)
}

export function clearAll() {
  if(confirm('Clear all?')) {
    this.setState({
      fields: []
    }, () => {
      saveState(this.state)
    })
  }
}

export function placeRow(canvasX, canvasY, cb) {
  if(!canvasX || !canvasY) return
  const square = findSquare(this.ctx, canvasX, canvasY)
  if (!square) return

  const x           = square.topLeftX
  const y           = square.topLeftY
  const size        = square.size
  const key         = `${x}:${y}`

  // Set focus to field if it already exists
  const existingField = this.state.fields.find((f) => {
    return f.key === key
  })
  if(existingField) {
    this.setFocusByKey(existingField.key)
    return
  }
  const field = {
    key:      key,
    x:        x,
    y:        y,
    size:     size,
    char:     '',
    hasFocus: true
  }
  this.setState((prevState) => {
    return {
      fields: prevState.fields.concat(field)
    }
  }, () => {
    saveState(this.state)
    if(cb) return cb()
  })
}

export function placeField(canvasX, canvasY, cb) {
  if(!canvasX || !canvasY) return
  const square = findSquare(this.ctx, canvasX, canvasY)
  if (!square) return

  const x           = square.topLeftX
  const y           = square.topLeftY
  const size        = square.size
  const key         = `${x}:${y}`

  // Set focus to field if it already exists
  const existingField = this.state.fields.find((f) => {
    return f.key === key
  })
  if(existingField) {
    this.setFocusByKey(existingField.key)
    return
  }
  const field = {
    key:      key,
    x:        x,
    y:        y,
    size:     size,
    char:     '',
    hasFocus: true
  }
  this.setState((prevState) => {
    return {
      fields: prevState.fields.concat(field)
    }
  }, () => {
    saveState(this.state)
    if(cb) return cb()
  })
}

export function setCharByKey(key, char, cb) {
  this.setState((prevState) => {
    return {
      fields: prevState.fields.map((f) => {
        if(f.key === key) {
          f.char = char
        }
        return f
      })
    }
  }, () => {
    saveState(this.state)
  })
}

export function setFocusByKey(key, cb) {
  this.setState((prevState) => {
    return {
      fields: prevState.fields.map((f) => {
        if(f.key === key) {
          f.hasFocus = true
        } else {
          f.hasFocus = false
        }
        return f
      })
    }
  }, () => {
    saveState(this.state)
    if(cb) return cb()
  })
}

export function setWritingDirection(canvasX, canvasY, cb) {
  const square = findSquare(this.ctx, canvasX, canvasY)
  if (!square) return
  const x      = square.topLeftX
  const y      = square.topLeftY
  const size   = square.size
  const { onHori } = findHoriVerti(this.ctx, x, y, size)
  this.setState((prevState) => {
    return { writingDirection: onHori }
  }, () => {
    this.placeField(canvasX, canvasY, cb)
  })
}
