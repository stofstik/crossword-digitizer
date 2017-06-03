import { validCharacters }  from '../utils/text-stuff'

export function onKeyUp(e, topLeftX, topLeftY, size) {
  console.log('onKeyUp')
  const id     = `${topLeftX}:${topLeftY}`
  const offset = size / 2
  const x      = topLeftX + offset
  const y      = topLeftY + offset
  // Go to input field top
  // if(e.key === 'ArrowUp') {
    // e.preventDefault()
    // this.placeField(x, y - size)
    // return
  // }
  // // Go to input field right
  // if(e.keyCode === 32  || e.key === 'ArrowRight') {
    // e.preventDefault()
    // this.placeField(x + size, y)
    // return
  // }
  // // Go to input field below
  // if(e.key === 'Enter' || e.key === 'ArrowDown') {
    // e.preventDefault()
    // this.placeField(x, y + size)
    // return
  // }
  // // Go to input field left
  // if(e.key === 'ArrowLeft') {
    // e.preventDefault()
    // this.placeField(x - size, y)
    // return
  // }
  // Go to input field back up, or left ; )
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
  console.log('onChange')
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
  console.log(this.state)
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
