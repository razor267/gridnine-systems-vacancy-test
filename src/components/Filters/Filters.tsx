import React, {ChangeEvent} from 'react'
import styles from './Filters.module.scss'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {filtersEdit, priceEdit, sortFlightsArray, transferEdit} from '../../redux/reduxSlice'

const Filters = () => {

    const dispatch = useAppDispatch()

    const minPrice = useAppSelector(state => state.app.filters.price.min)
    const maxPrice = useAppSelector(state => state.app.filters.price.max)
    const sort = useAppSelector(state => state.app.filters.sort)
    const airlines = useAppSelector(state => state.app.filters.airlines)

    const editFiltersAndSort = () => {
        dispatch(filtersEdit())
        dispatch(sortFlightsArray(sort))
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
                    <div key={item.uid} className={styles.filter}>
                        <input type="checkbox"/>
                        <div>- {item.caption}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filters