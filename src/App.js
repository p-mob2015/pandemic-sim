import React, { useState, useEffect, useCallback, useRef } from 'react'

import PeopleService from './services/PeopleService'
import PandemicService from './services/PandemicService'
import TimeService from './services/TimeService'
import WorldService from './services/WorldService'

import Person from './models/Person'
import Location from './models/Location'

import './App.css'

const COORD_LIMIT = { x: 60, y: 60 }
const DAY_INTERVAL = 100

function App() {
  const [pandemicRunning, setPandemicRunning] = useState(true)
  const [daysPassed, setDaysPassed] = useState(0)
  const [population, setPopulation] = useState(500)
  const [hostCount, setHostCount] = useState(1)
  const [infectionProb, setInfectionProb] = useState(0.6)
  const [healingDays, setHealingDays] = useState(10)
  const services = useRef({})
  const canvas = useRef()

  useEffect(() => {
    initPandemic()
    services.current.time.start()
  }, [])

  const handleToday = () => {
    services.current.people.conduct()
    services.current.pandemic.evolve()
    services.current.world.draw()
    setDaysPassed(services.current.time.daysPassed)

    if (services.current.pandemic.over) {
      services.current.time.stop()
    }
  }

  const initPandemic = useCallback(() => {
    Person.destroyAll()
    Location.destroyAll()

    services.current.people = new PeopleService(COORD_LIMIT)
    services.current.time = new TimeService(DAY_INTERVAL)
    services.current.pandemic = new PandemicService(
      +infectionProb,
      +healingDays
    )
    services.current.world = new WorldService(canvas.current, COORD_LIMIT)

    services.current.people.populate(+population, +hostCount)
    services.current.time.onToday = handleToday
    services.current.world.draw()
  }, [population, hostCount, infectionProb, healingDays])

  const handlePopulationChange = useCallback(e => {
    setPopulation(e.target.value)
  }, [])
  const handleHostCountChange = useCallback(e => {
    setHostCount(e.target.value)
  }, [])
  const handleInfectionProbChange = useCallback(e => {
    setInfectionProb(e.target.value)
  }, [])
  const handleHealingDaysChange = useCallback(e => {
    setHealingDays(e.target.value)
  }, [])

  const restartPandemic = useCallback(() => {
    services.current.time.stop()

    initPandemic()
    services.current.time.start()
    setPandemicRunning(true)
  }, [initPandemic])
  const togglePandemic = useCallback(() => {
    if (services.current.pandemic.over) return

    pandemicRunning
      ? services.current.time.stop()
      : services.current.time.pass()
    setPandemicRunning(!pandemicRunning)
  }, [pandemicRunning])

  return (
    <div className="App">
      <canvas ref={canvas} id="canvas" />
      <div className="control-panel">
        <h3>Days in Pandemic: {daysPassed}</h3>
        <div className="setting">
          <label htmlFor="population">Population: </label>
          <input
            name="population"
            type="number"
            step={100}
            min={100}
            max={3600}
            onChange={handlePopulationChange}
            value={population}
          />
        </div>
        <div className="setting">
          <label htmlFor="host">Host Count: </label>
          <input
            name="host"
            type="number"
            step={1}
            min={1}
            max={100}
            onChange={handleHostCountChange}
            value={hostCount}
          />
        </div>
        <div className="setting">
          <label htmlFor="infect_prob">Infection Probability: </label>
          <input
            name="infect_prob"
            type="number"
            step={0.1}
            min={0.1}
            max={1}
            onChange={handleInfectionProbChange}
            value={infectionProb}
          />
        </div>
        <div className="setting">
          <label htmlFor="healing_days">Healing Days: </label>
          <input
            name="healing_days"
            type="number"
            step={1}
            min={3}
            max={30}
            onChange={handleHealingDaysChange}
            value={healingDays}
          />
        </div>
        <div className="actions">
          <button onClick={restartPandemic}>Restart</button>
          <button onClick={togglePandemic}>
            {pandemicRunning ? 'Stop' : 'Resume'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
