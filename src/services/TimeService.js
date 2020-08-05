class TimeService {
  constructor(dayInMS) {
    this.ticker = null
    this.tickerInterval = dayInMS
    this.daysPassed = 0
    this.onToday = null
  }

  start = () => {
    this.pass()
  }

  stop = () => {
    if (this.ticker) {
      clearTimeout(this.ticker)
    }
  }

  pass = () => {
    this.ticker = setTimeout(this.handleToday, this.tickerInterval)
  }

  handleToday = () => {
    this.daysPassed += 1
    this.pass()
    this.onToday && this.onToday()
  }
}

export default TimeService
