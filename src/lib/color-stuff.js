export function isWhite(color) {
  const bool =
    color[0] === 255 &&
    color[1] === 255 &&
    color[2] === 255 &&
    color[3] === 255
  return bool;
}

export function isBlack(color) {
  const bool = color[0] === 0 &&
    color[1] === 0 &&
    color[2] === 0 &&
    color[3] === 255
  return bool;
}
