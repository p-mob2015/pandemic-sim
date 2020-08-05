class PeopleStore {
  data = []

  add = person => {
    this.data.push(person)
  }

  truncate = () => {
    this.data = []
  }

  getByIndex = index => this.data[index]

  getAllByStatus = status =>
    this.data.filter(person => person.status === status)

  get all() {
    return this.data
  }
}

export default new PeopleStore()
