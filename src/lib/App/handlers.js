import { validCharacters }  from '../utils/text-stuff'
import store from 'store'

export function onKeyUp(e, topLeftX, topLeftY, size) {
  const id     = `${topLeftX}:${topLeftY}`
  const offset = size / 2
  const x      = topLeftX + offset
  const y      = topLeftY + offset
  // Go to input field back up, or left
  if(e.keyCode === 8) {
    e.preventDefault()
    if(this.state.writingDirection) {
      this.placeField(x - size, y)
    } else {
      this.placeField(x, y - size)
    }
    return
  }
}

export function onChange(e, topLeftX, topLeftY, size) {
  const c  = e.target.value.charAt(0)
  const id = `${topLeftX}:${topLeftY}`
  if(!e.target.value) {
    this.setCharByKey(id, '')
    if(this.state.writingDirection) {
      this.placeField(x - size, y)
    } else {
      this.placeField(x, y - size)
    }
    return
  }
  if(!validCharacters.test(c)) {
    e.preventDefault()
    return
  }
  // Char is allowed, update state
  this.setCharByKey(id, c)
  const offset = size / 2
  const x      = topLeftX + offset
  const y      = topLeftY + offset
  if(this.state.writingDirection) {
    this.placeField(x + size, y)
  } else {
    this.placeField(x, y + size)
  }
}

export function onCharClick(e, x, y) {
  const id = `${x}:${y}`
  this.setWritingDirection(x, y, () => {
    this.setFocusByKey(id)
  })
}

export function onClick(e) {
  const rect = this.canvas.getBoundingClientRect()
  const canvasX = e.clientX - rect.left
  const canvasY = e.clientY - rect.top
  this.setWritingDirection(canvasX, canvasY)
}

export function onFileInputChange(e) {
  const file    = e.target.files[0]
  const reader  = new FileReader()
  reader.onload = ((aImg) => {
    return (e) => {
      store.set('image', e.target.result)
      store.set('app-state', '')
      this.updateCanvas()
      this.setState({ fields: [], writingDirection: true})
    }
  })()
  reader.readAsDataURL(file)
}
