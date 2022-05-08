import React, {useEffect, useState} from 'react'
import styles from './Flights.module.scss'
import FlightItem from './FlightItem'
import {useAppSelector} from '../../hooks/hooks'
import {FlightType} from '../../types/types'

const Flights = () => {

    const flights = useAppSelector(state => state.app.flights)

    const [renderArr, setRenderArr] = useState<FlightType[]>([])
    const [itemCol, setItemCol] = useState(2)

    useEffect(() => {
        for (let i = itemCol - 2; i < itemCol; i++) {
            if (i < flights.length) {
                setRenderArr(prev => [...prev, flights[i].flight])
            } else break
        }
    }, [flights, itemCol])

    return (
        <div className={styles.flightsWrapper}>
            {renderArr.map((item, index) => <FlightItem flight={item} key={index}/>)}
            {renderArr.length < flights.length &&
            <button
                className={styles.button}
                onClick={() => setItemCol(prev => prev + 2)}
            >
                Показать еще
            </button>}
        </div>
    )
}

export default Flights