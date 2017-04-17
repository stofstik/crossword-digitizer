import { validCharacters }  from '../utils/text-stuff'

export function onKeyUp(e, x, y, size) {
  const id = `${x}:${y}`
  // Go to input field top
  if(e.key === 'ArrowUp') {
    e.preventDefault()
    this.placeField(x, y - size / 2)
    return
  }
  // Go to input field right
  if(e.keyCode === 32 || e.key === 'ArrowRight') {
    e.preventDefault()
    this.placeField(x + size * 2, y)
    return
  }
  // Go to input field below
  if(e.key === 'Enter' || e.key === 'ArrowDown') {
    e.preventDefault()
    this.placeField(x, y + size * 2)
    return
  }
  // Go to input field left
  if(e.key === 'ArrowLeft') {
    e.preventDefault()
    this.placeField(x - size / 2, y)
    return
  }
  // Pressed backspace, clear input field
  if(e.keyCode === 8) {
    this.setCharByKey(id, '')
    return
  }
  // Pressed another key, check its length
  if(e.key.length !== 1) {
    e.preventDefault()
    return
  }
  // Probably pressed character, check it against allowed characters
  if(!validCharacters.test(e.key)) {
    e.preventDefault()
    return
  }
  // Char is allowed, update state
  this.setCharByKey(id, e.key)
}

export function onCharClick(e, x, y) {
  const id = `${x}:${y}`
  this.setFocusByKey(id)
}

export function onClick(e) {
  const rect = this.canvas.getBoundingClientRect()
  const canvasX = e.clientX - rect.left
  const canvasY = e.clientY - rect.top
  this.placeField(canvasX, canvasY)
}
