import store            from 'store'
import { findSquare }   from '../utils/pixel-processing'
import { findHoriVerti } from '../utils/pixel-processing'

export function saveState(state) {
  store.set('app-state', state)
}

export function placeField(canvasX, canvasY, cb) {
  console.log(canvasX, canvasY)
  const square = findSquare(this.ctx, canvasX, canvasY)
  if (!square) return

  const x       = square.topLeftX
  const y       = square.topLeftY
  // const onHori  = square.onHori
  // const onVerti = square.onHori
  const size    = square.size
  const key     = `${x}:${y}`

  console.log(x, y)
  const { onHori, onVerti } = findHoriVerti(this.ctx, x, y, size)

  // Set focus to field if it already exists
  const existingField = this.state.fields.find((f) => {
    return f.key === key
  })
  if(existingField) {
    console.log('exists')
    this.setFocusByKey(existingField.key)
    return
  }
  const field = {
    key: key,
    x: x,
    y: y,
    onHori: onHori,
    onVerti: onVerti,
    size: size,
    char: '',
    hasFocus: true
  }
  this.setState(prevState => ({
    fields: prevState.fields.concat(field),
    writingDirection: onHori
  }), () => {
    saveState(this.state)
    console.log(this.state
    )
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
