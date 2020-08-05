import Store from '../stores/PeopleStore'
import { PERSON_STATUS } from '../enum'
import { getRandomIndex } from '../utils/random'

import Location from './Location'

class Person {
  constructor(coord, status = PERSON_STATUS.SUSCEPTIBLE) {
    this.status = status
    this.location = new Location(coord, this)

    Store.add(this)
  }

  static get all() {
    return Store.all
  }

  static get infected() {
    return Store.getAllByStatus(PERSON_STATUS.INFECTED)
  }

  static at = index => {
    return Store.getByIndex(index)
  }

  static destroyAll = () => {
    Store.truncate()
  }

  live = () => {
    if (this.infected) this.sickDays++
  }

  move = coordLimit => {
    const { emptyAdjacentCoords } = this.location
    if (emptyAdjacentCoords.length === 0) return

    const targetCoord =
      emptyAdjacentCoords[getRandomIndex(emptyAdjacentCoords.length)]

    if (targetCoord.x < 0 || targetCoord.y < 0) return
    if (
      coordLimit &&
      (coordLimit.x <= targetCoord.x || coordLimit.y <= targetCoord.y)
    )
      return

    this.location.destroy()
    this.location = new Location(targetCoord, this)
  }

  gotInfected = () => {
    this.status = PERSON_STATUS.INFECTED
    this.sickDays = 0
  }

  gotHealed = () => {
    this.status = PERSON_STATUS.HEALED
  }

  enduredSickness(healingDays) {
    return (
      this.status === PERSON_STATUS.INFECTED && this.sickDays === healingDays
    )
  }

  get adjacents() {
    return this.location.adjacents.map(location => location.person)
  }

  get infected() {
    return this.status === PERSON_STATUS.INFECTED
  }

  get susceptible() {
    return this.status === PERSON_STATUS.SUSCEPTIBLE
  }

  get healed() {
    return this.status === PERSON_STATUS.HEALED
  }
}

export default Person
