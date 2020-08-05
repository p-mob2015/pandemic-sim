import Service from '../PandemicService'
import PeopleService from '../PeopleService'
import Person from '../../models/Person'

describe('PandemicService', () => {
  let subject
  beforeEach(() => {
    subject = new Service()
  })

  it('correctly detects pandemic termination', () => {
    new PeopleService().populate(10, 5)
    expect(subject.over).not.toBeTruthy()

    Person.all.map(person => person.gotHealed())
    expect(subject.over).toBeTruthy()
  })
})
