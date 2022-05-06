import React from 'react'
import styles from './Flights.module.scss'
import flights from '../../mock/flights'
import FlightItem from './FlightItem'

const Flights = () => {

console.log(flights)

    return (
        <div className={styles.flightsWrapper}>
          <FlightItem flight={flights.result.flights[141].flight}/>
          <FlightItem flight={flights.result.flights[142].flight}/>
        </div>
    )
}

export default Flights