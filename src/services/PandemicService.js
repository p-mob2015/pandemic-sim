import Person from '../models/Person'
import { probability } from '../utils/random'

class PandemicService {
  constructor(infectionProbability, healingDays) {
    this.infectionProbability = infectionProbability
    this.healingDays = healingDays
  }

  evolve() {
    this.heal()
    this.infect()
  }

  heal() {
    Person.infected.forEach(infectedPerson => {
      if (infectedPerson.enduredSickness(this.healingDays)) {
        infectedPerson.gotHealed()
      }
    })
  }

  infect() {
    for (let infectedPerson of Person.infected) {
      infectedPerson.adjacents.forEach(person => {
        if (person.susceptible && probability(this.infectionProbability)) {
          person.gotInfected()
        }
      })
    }
  }

  get over() {
    return Person.infected.length === 0
  }
}

export default PandemicService
