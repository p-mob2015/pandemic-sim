import Store from '../stores/LocationStore'
import { DIRECTION } from '../enum'
import { neighboringCoord, coordToKey } from '../utils/location'

class Location {
  constructor(coord, person) {
    this.coord = coord
    this.person = person

    Store.add(this)
  }

  static destroyAll = () => {
    Store.truncate()
  }

  static get all() {
    return Object.values(Store.all)
  }

  destroy = () => {
    Store.remove(this.key)
  }

  get key() {
    return coordToKey(this.coord)
  }

  get adjacents() {
    return Object.values(DIRECTION).reduce((adjLocations, direction) => {
      const adjCoord = neighboringCoord(this.coord, direction)
      const adjLocation = Store.get(coordToKey(adjCoord))

      if (adjLocation) {
        return [...adjLocations, adjLocation]
      }

      return adjLocations
    }, [])
  }

  get emptyAdjacentCoords() {
    return Object.values(DIRECTION).reduce((coords, direction) => {
      const adjCoord = neighboringCoord(this.coord, direction)

      if (!Store.get(coordToKey(adjCoord))) {
        return [...coords, adjCoord]
      }

      return coords
    }, [])
  }
}

export default Location
