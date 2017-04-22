import store          from 'store'
import { findSquare } from '../utils/pixel-processing'

export function saveState(state) {
  store.set('app-state', state)
}

export function placeField(canvasX, canvasY, cb) {
  console.log(canvasX, canvasY)
  const square = findSquare(this.ctx, canvasX, canvasY)
  if (!square) return

  const x    = square.topLeftX
  const y    = square.topLeftY
  const size = square.size
  const key = `${x}:${y}`

  console.log(x, y)

  // Set focus to field if it already exists
  const existingField = this.state.fields.find((f) => {
    return f.key === key
  })
  if(existingField) {
    console.log('exists')
    this.setFocusByKey(existingField.key)
    return
  }
  const field = { key: key, x: x, y: y, size: size, char: '', hasFocus: true }
  this.setState(prevState => ({
    fields: prevState.fields.concat(field)
  }), () => {
    saveState(this.state)
  })
}

export function setCharByKey(key, char, cb) {
  this.setState(prevState => ({
    fields: prevState.fields.map((f) => {
      if(f.key === key) {
        f.char = char
      }
      return f
    })
  }), () => {
    saveState(this.state)
  })
}

export function setFocusByKey(key, cb) {
  this.setState(prevState => ({
    fields: prevState.fields.map((f) => {
      if(f.key === key) {
        f.hasFocus = true
      } else {
        f.hasFocus = false
      }
      return f
    })
  }), () => {
    saveState(this.state)
  })
}
