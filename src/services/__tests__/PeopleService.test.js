import Service from '../PeopleService'
import Person from '../../models/Person'
jest.mock('../../models/Person')

describe('PeopleService', () => {
  let subject
  beforeEach(() => {
    subject = new Service()
    Person.mockClear()
    Person.all = jest.fn()
  })

  describe('When populates', () => {
    it('creates Person entities', () => {
      subject.populate(10)
      expect(Person).toHaveBeenCalledTimes(10)
    })

    it('marks people as infected', () => {
      const mockPerson = {
        gotInfected: jest.fn(),
      }
      Person.at = jest.fn().mockImplementation(() => mockPerson)
      Person.all = Array(10).fill(0)

      subject.populate(10, 5)
      expect(mockPerson.gotInfected).toHaveBeenCalledTimes(5)
    })
  })
})
