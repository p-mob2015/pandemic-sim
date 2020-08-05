class LocationStore {
  data = {}

  add = location => {
    this.data[location.key] = location
  }

  remove = key => {
    delete this.data[key]
  }

  truncate = () => {
    this.data = {}
  }

  get(key) {
    return this.data[key]
  }

  get all() {
    return this.data
  }
}

export default new LocationStore()
