import Location from '../Location'
import Store from '../../stores/LocationStore'

describe('Location entity', () => {
  describe('When created', () => {
    it('stores itself in a persistent store', () => {
      new Location({ x: 10, y: 10 })
      expect(Object.keys(Store.all).length).toEqual(1)
    })
  })

  describe('When destroys itself', () => {
    it('releases from the persistent store', () => {
      const location = new Location({ x: 10, y: 10 })
      location.destroy()

      expect(Object.keys(Store.all).length).toEqual(0)
    })
  })

  it('correctly deduces empty adjacent directions', () => {
    const location = new Location({ x: 10, y: 10 })
    expect(location.emptyAdjacentCoords.length).toEqual(4)

    new Location({ x: 9, y: 10 })
    new Location({ x: 10, y: 9 })
    expect(location.emptyAdjacentCoords.length).toEqual(2)
  })
})
