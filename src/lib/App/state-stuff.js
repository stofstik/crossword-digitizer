import { findSquare } from '../utils/pixel-processing'

export function placeField(canvasX, canvasY) {
  const square = findSquare(this.ctx, canvasX, canvasY)
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
    this.setFocusByKey(existingField.key)
    return
  }
  const field = { key: key, x: x, y: y, char: '', hasFocus: true }
  this.setState(prevState => ({
    fields: prevState.fields.concat(field)
  }))
}

export function setCharByKey(key, char, cb) {
  this.setState(prevState => ({
    fields: prevState.fields.map((f) => {
      if(f.key === key) {
        f.char = char
      }
      return f
    })
  }), cb)
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
  }), cb)
}
