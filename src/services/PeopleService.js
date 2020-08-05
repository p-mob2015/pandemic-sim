import Person from '../models/Person'
import { generateRandomCoords } from '../utils/location'
import { pickRandomElements } from '../utils/random'

class PeopleService {
  constructor(coordLimit = { x: 1000, y: 1000 }) {
    this.coordLimit = coordLimit
  }

  populate(count, infectedCount = 0) {
    const peopleCoords = generateRandomCoords(count, this.coordLimit)

    for (let coord of peopleCoords) {
      new Person(coord)
    }

    this.markInfected(infectedCount)
  }

  markInfected(infectedCount) {
    const personIndexArr = Array(Person.all.length)
      .fill(0)
      .map((_val, index) => index)
    const infectedPeopleIndices = pickRandomElements(
      personIndexArr,
      infectedCount
    )

    for (let infectedIndex of infectedPeopleIndices) {
      Person.at(infectedIndex).gotInfected()
    }
  }

  conduct() {
    Person.all.forEach(person => {
      person.live()
      person.move(this.coordLimit)
    })
  }
}

export default PeopleService
