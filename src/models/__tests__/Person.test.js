import Person from '../Person'
import Store from '../../stores/PeopleStore'
import LocationStore from '../../stores/LocationStore'

describe('Person entity', () => {
  let subject
  beforeEach(() => {
    subject = new Person({ x: 10, y: 10 })
  })

  describe('When created', () => {
    it('keeps itself in a persistent store', () => {
      expect(Store.all.length).toEqual(1)
    })

    it('creates paired location entity', () => {
      expect(Object.keys(LocationStore.all).length).toEqual(1)
      expect(LocationStore.get('10,10')).not.toBeFalsy()
    })
  })

  describe('When moves', () => {
    it('deletes the previous location entity', () => {
      subject.move()
      expect(LocationStore.get('10,10')).not.toBeTruthy()
    })
  })

  it('does not move outside the limit', () => {
    let coordLimit = { x: 10, y: 10 }
    new Person({ x: 9, y: 10 })
    new Person({ x: 10, y: 9 })

    subject.move(coordLimit)
    expect(subject.location.coord).toEqual({ x: 10, y: 10 })
  })
})
