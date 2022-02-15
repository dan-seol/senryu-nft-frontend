import './App.css'
import React, { useState, useEffect } from 'react'
import SenryuGenerator from './components/SenryuGenerator'
import SenryuTypeArea from "./components/SenryuTypeArea"
import SenryuView from './components/SenryuView'
import Tabs from './components/Tabs'

const App = props => {
  const [drizzleReadinessState, setDrizzleReadinessState] = useState({drizzleState: null, loading: true})
  const { drizzle } = props

  useEffect( 
    () => {
      const unsubscribe = drizzle.store.subscribe( () => {
        // every time the store updates, grab the state from drizzle
        const drizzleState = drizzle.store.getState()
        // check to see if it's ready, if so, update local component state
        if (drizzleState.drizzleStatus.initialized) {
          setDrizzleReadinessState({drizzleState: drizzleState, loading: false})
        }
      })
      return () => {
        unsubscribe()
      }
    }, [drizzle.store, drizzleReadinessState]
  )
  
  return (
    drizzleReadinessState.loading ? 
      "Loading Drizzle..." 
      : (
        <div className="App">
          <SenryuView
          drizzle={drizzle} drizzleState={drizzleReadinessState.drizzleState}
          />
          <Tabs>
            <div label="Generate one">
              <SenryuGenerator />
            </div>
            <div label="Type your own">
              <SenryuTypeArea />
            </div>
          </Tabs>
  
        </div>
      )
      /*
      <Fragment>
        <ReadString drizzle={drizzle} drizzleState={drizzleReadinessState.drizzleState} />
        <SetString drizzle={drizzle} drizzleState={drizzleReadinessState.drizzleState} />
      </Fragment>
      */
  )
}

export default App