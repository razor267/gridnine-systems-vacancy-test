import React, {ChangeEvent} from 'react'
import styles from './Filters.module.scss'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {priceEdit, sortEdit, transferEdit} from '../../redux/reduxSlice'

const Filters = () => {

    const dispatch = useAppDispatch()

    const minPrice = useAppSelector(state => state.app.filters.price.min)
    const maxPrice = useAppSelector(state => state.app.filters.price.max)

    return (
        <div className={styles.filterWrapper}>
            <strong>Сортировать</strong>
            <div className={styles.filter}>
                <input
                    name="r1"
                    type="radio"
                    defaultChecked
                    onChange={() => dispatch(sortEdit('price_min'))}
                />
                <div> - по возрастанию цены</div>
                <input
                    name="r1"
                    type="radio"
                    onChange={() => dispatch(sortEdit('price_max'))}
                />
                <div>- по убыванию цены</div>
                <input
                    name="r1"
                    type="radio"
                    onChange={() => dispatch(sortEdit('time'))}
                />
                <div>- по времени в пути</div>
            </div>
            <strong>Фильтровать</strong>
            <div className={styles.filter}>
                <input
                    type="checkbox"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.checked ? dispatch(transferEdit({
                        field: 1,
                        value: true
                    })) : dispatch(transferEdit({field: 1, value: false}))}
                />
                <div>- 1 пересадка</div>
                <input
                    type="checkbox"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.checked ? dispatch(transferEdit({
                        field: 0,
                        value: true
                    })) : dispatch(transferEdit({field: 0, value: false}))}
                />
                <div>- без пересадок</div>
            </div>
            <strong>Цена</strong>
            <div className={styles.priceWrapper}>
                <div>
                    От <input
                    value={minPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(priceEdit({
                        field: 'min',
                        value: e.currentTarget.value
                    }))}
                />
                </div>
                <div>
                    До <input
                    value={maxPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(priceEdit({
                        field: 'max',
                        value: e.currentTarget.value
                    }))}
                />
                </div>
            </div>
            <strong>Авиакомпании</strong>
            <div className={styles.filter}>
                <input type="checkbox"/>
                <div>- Аэрофлот</div>
                <input type="checkbox"/>
                <div>- Уральские авиалинии</div>
            </div>
        </div>
    )
}

export default Filters