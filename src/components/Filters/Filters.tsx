import React from 'react'
import styles from './Filters.module.scss'
import flights from '../../mock/flights'

const Filters = () => {

console.log(flights)

    return (
        <div className={styles.filterWrapper}>
            <strong>Сортировать</strong>
            <div><input name="r1" type="radio" value="1"/> - по возрастанию цены</div>
            <div><input name="r1" type="radio" value="2"/> - по убыванию цены</div>
            <div><input name="r1" type="radio" value="3"/> - по времени в пути</div>
            <strong>Фильтровать</strong>
            <div><input type="checkbox" id="one_transfer"/> - 1 пересадка</div>
            <div><input type="checkbox" id="no_transfer"/> - без пересадок</div>
            <strong>Цена</strong>
            <div>От <input /></div>
            <div>До <input /></div>
            <strong>Авиакомпании</strong>
            <div><input type="checkbox" id="aeroflot"/> - Аэрофлот</div>
            <div><input type="checkbox" id="ural_airlines"/> - Уральские авиалинии</div>
        </div>
    )
}

export default Filters