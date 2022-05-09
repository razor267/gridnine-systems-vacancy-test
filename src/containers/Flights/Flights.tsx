import React, {useCallback, useEffect, useState} from 'react'
import styles from './Flights.module.scss'
import FlightItem from './FlightItem'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {FlightType} from '../../types/types'
import {sortFlightsArray} from '../../redux/reduxSlice'

const Flights = () => {

    const dispatch = useAppDispatch()

    const flights = useAppSelector(state => state.app.renderFlights)
    const filters = useAppSelector(state => state.app.filters)

    const [renderArr, setRenderArr] = useState<FlightType[]>([])
    const [itemCol, setItemCol] = useState(0)

    const createRenderArray = useCallback((startIndex: number) => {
        if (itemCol !== 0) {
            for (let i = startIndex; i < itemCol; i++) {
                if (i < flights.length) {
                    setRenderArr(prev => [...prev, flights[i]])
                } else break
            }
        }
    }, [flights, itemCol])

    useEffect(() => {
        dispatch(sortFlightsArray('price_min'))
        setItemCol(2)
    }, [dispatch])

    useEffect(() => {
        setRenderArr([])
        createRenderArray(0)
    }, [createRenderArray, filters.sort])

    return (
        <div className={styles.flightsWrapper}>
            {renderArr.map((item, index) => <FlightItem flight={item} key={index}/>)}
            {renderArr.length !== 0 && renderArr.length < flights.length &&
            <button
                className={styles.button}
                onClick={() => setItemCol(prev => prev + 2)}
            >
                Показать еще
            </button>}
            {renderArr.length === 0 && <div className={styles.noFlights}>Нет подходящих рейсов</div>}
        </div>
    )
}

export default Flights