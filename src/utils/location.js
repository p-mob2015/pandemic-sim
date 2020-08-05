import { DIRECTION } from '../enum'

import { pickRandomElements } from './random'

export const coordToKey = coord => `${coord.x},${coord.y}`

export const neighboringCoord = (coord, direction) => {
  const { x, y } = coord
  let newX = x,
    newY = y

  switch (direction) {
    case DIRECTION.UP: {
      newY -= 1
      break
    }
    case DIRECTION.DOWN: {
      newY += 1
      break
    }
    case DIRECTION.LEFT: {
      newX -= 1
      break
    }
    case DIRECTION.RIGHT: {
      newX += 1
      break
    }
    default:
      break
  }

  return {
    x: newX,
    y: newY,
  }
}

export const generateRandomCoords = (count, coordLimit) => {
  const coordArr = Array(coordLimit.x * coordLimit.y)
    .fill(0)
    .map((_val, index) => ({
      x: index % coordLimit.x,
      y: Math.floor(index / coordLimit.x),
    }))

  return pickRandomElements(coordArr, count)
}
