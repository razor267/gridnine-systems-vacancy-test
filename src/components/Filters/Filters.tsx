import React, {ChangeEvent} from 'react'
import styles from './Filters.module.scss'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {airlinesEdit, filtersEdit, priceEdit, sortFlightsArray, transferEdit} from '../../redux/reduxSlice'
import {AirlineType} from '../../types/types'

const Filters = () => {

    const dispatch = useAppDispatch()

    const minPrice = useAppSelector(state => state.app.filters.price.min)
    const maxPrice = useAppSelector(state => state.app.filters.price.max)
    const sort = useAppSelector(state => state.app.filters.sort)
    const airlines = useAppSelector(state => state.app.filters.airlines)
    const flights = useAppSelector(state => state.app.flights)

    const editFiltersAndSort = () => {
        dispatch(filtersEdit())
        dispatch(sortFlightsArray(sort))
    }

    const airlineMinPrice = (airline: AirlineType) => {
        let min: number = 0
        flights.forEach(item => {
            if (item.flight.carrier.uid === airline.uid) {
                if (min === 0) {
                    min = Number(item.flight.price.total.amount)
                } else if (Number(item.flight.price.total.amount) < min) {
                    min = Number(item.flight.price.total.amount)
                }
            }
        })
        return min
    }

    return (
        <div className={styles.filterWrapper}>
            <strong>Сортировать</strong>
            <div className={styles.filter}>
                <input
                    name="r1"
                    type="radio"
                    defaultChecked
                    onChange={() => dispatch(sortFlightsArray('price_min'))}
                />
                <div> - по возрастанию цены</div>
                <input
                    name="r1"
                    type="radio"
                    onChange={() => dispatch(sortFlightsArray('price_max'))}
                />
                <div>- по убыванию цены</div>
                <input
                    name="r1"
                    type="radio"
                    onChange={() => dispatch(sortFlightsArray('time'))}
                />
                <div>- по времени в пути</div>
            </div>
            <strong>Фильтровать</strong>
            <div className={styles.filter}>
                <input
                    type="checkbox"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.target.checked ? dispatch(transferEdit({
                            field: 1,
                            value: true
                        })) : dispatch(transferEdit({field: 1, value: false}))
                        editFiltersAndSort()
                    }}
                />
                <div>- 1 пересадка</div>
                <input
                    type="checkbox"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.target.checked ? dispatch(transferEdit({
                            field: 0,
                            value: true
                        })) : dispatch(transferEdit({field: 0, value: false}))
                        editFiltersAndSort()
                    }}
                />
                <div>- без пересадок</div>
            </div>
            <strong>Цена</strong>
            <div className={styles.priceWrapper}>
                <div>
                    От <input
                    value={minPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(priceEdit({
                            field: 'min',
                            value: e.currentTarget.value
                        }))
                        editFiltersAndSort()
                    }}
                />
                </div>
                <div>
                    До <input
                    value={maxPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(priceEdit({
                            field: 'max',
                            value: e.currentTarget.value
                        }))
                        editFiltersAndSort()
                    }}
                />
                </div>
            </div>
            <strong>Авиакомпании</strong>
            <div className={styles.filterAirline}>
                {airlines.map(item => (
                    <div key={item.uid} className={styles.airline}>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => {
                                dispatch(airlinesEdit(item.uid))
                                editFiltersAndSort()
                            }}
                        />
                        <div className={styles.airlineName}>- {item.caption}</div>
                        <div>от {airlineMinPrice(item)} р.</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filters