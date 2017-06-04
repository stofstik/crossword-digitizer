/*
 * Finds each edge of a square
 */
export function findSquare(ctx, x, y) {
  let color    = ctx.getImageData(x, y, 1, 1).data
  const DISTANCE = 40
  const OFFSET   = DISTANCE / 4
  if(!isLight(color)) {
    console.info('Not a white pixel : (')
    return
  }
  const startX = x
  const startY = y
  let right, left, top, bottom
  // Find right border first
  for(let x = 0; x < DISTANCE; x++) {
    const pos = startX + x
    color = ctx.getImageData(pos, startY, 1, 1).data
    if(isDark(color)) {
      right = pos
      break
    }
  }
  // Then find bottom border using right border's pos
  for(let y = 0; y < DISTANCE; y++) {
    const pos = startY + y
    color = ctx.getImageData(startX, pos, 1, 1).data
    if(isDark(color)) {
      bottom = pos
      break
    }
  }
  if(!right || !bottom) {
    console.warn('Could not find center')
    console.log("!right || !bottom", !right, !bottom)
    return null
  }
  // Then left using bottom right
  for(let x = 0; x < DISTANCE; x++) {
    const pos = right - OFFSET - x
    color = ctx.getImageData(pos, bottom - OFFSET, 1, 1).data
    if(isDark(color)) {
      left = pos
      break
    }
  }
  // And lastly top using bottom right
  for(let y = 0; y < DISTANCE; y++) {
    const pos = bottom - OFFSET - y
    color = ctx.getImageData(right - OFFSET, pos, 1, 1).data
    if(isDark(color)) {
      top = pos
      break
    }
  }
  const height   = bottom - top
  const width    = (Math.floor( ( (right - left) / 2 ) ) * 2)
  const centerX  = left   + width  / 2
  const centerY  = top    + height / 2
  const tooBig   = width > DISTANCE * 2 || height > DISTANCE * 2
  const tooSmall = width < 10 || height < 10
  if(tooBig || tooSmall || !height || !width) {
    console.log("tooBig", tooBig)
    console.log("tooSmall", tooSmall)
    console.log("height", !height)
    console.log("width", !width)
    console.warn('Could not find center')
    return null
  }
  return {
    topLeftX: left + 1,
    topLeftY: top + 1,
    x:        centerX,
    y:        centerY,
    onHori:   null,
    onVerti:  null,
    size:     width
  }
}

export function findHoriVerti(ctx, topLeftX, topLeftY, size) {
  const offset  = size / 2
  const x       = topLeftX + offset
  const y       = topLeftY + offset
  const top     = !!findSquare(ctx, x, y - size)
  const bottom  = !!findSquare(ctx, x, y + size)
  const right   = !!findSquare(ctx, x + size, y)
  const left    = !!findSquare(ctx, x - size, y)
  const onHori  = (left && right)  || right
  const onVerti = (top  && bottom) || bottom
  return {
    onHori:  onHori,
    onVerti: onVerti
  }
}

export function isWhite(color) {
  const bool =
    color[0] === 255 &&
    color[1] === 255 &&
    color[2] === 255 &&
    color[3] === 255
  return bool;
}

export function isLight(color) {
  const bool =
    color[0] > 215 &&
    color[1] > 215 &&
    color[2] > 215
  return bool;
}

export function isDark(color) {
  const bool =
    color[0] < 220 &&
    color[1] < 220 &&
    color[2] < 220
  return bool;
}
