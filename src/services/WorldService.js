import Location from '../models/Location'
import { PERSON_STATUS } from '../enum'

const CELL_SIZE = 10
const GRID_COLOR = '#eee'
const STATUS_COLOR = {
  [PERSON_STATUS.SUSCEPTIBLE]: 'green',
  [PERSON_STATUS.INFECTED]: 'red',
  [PERSON_STATUS.HEALED]: '#ccc',
}

class WorldService {
  constructor(canvas, coordLimit) {
    this.coordLimit = coordLimit
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.canvas.width = CELL_SIZE * coordLimit.x
    this.canvas.height = CELL_SIZE * coordLimit.y
  }

  draw() {
    this.canvas.width = this.canvas.width
    this.ctx.strokeStyle = GRID_COLOR

    this.drawGrid()
    this.drawMatrix()
  }

  drawGrid() {
    for (let x = 0.5; x < this.coordLimit.x * CELL_SIZE; x += CELL_SIZE) {
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.coordLimit.y * CELL_SIZE)
    }

    for (let y = 0.5; y < this.coordLimit.y * CELL_SIZE; y += CELL_SIZE) {
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.coordLimit.x * CELL_SIZE, y)
    }

    this.ctx.stroke()
  }

  drawMatrix() {
    for (let location of Location.all) {
      const {
        coord: { x, y },
        person,
      } = location

      this.ctx.fillStyle = STATUS_COLOR[person.status]
      this.ctx.fillRect(
        x * CELL_SIZE + 1,
        y * CELL_SIZE + 1,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      )
    }
  }
}

export default WorldService
