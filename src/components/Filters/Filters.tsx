import React from 'react'
import styles from './Filters.module.scss'

const Filters = () => {

    return (
        <div className={styles.filterWrapper}>
            <strong>Сортировать</strong>
            <div className={styles.filter}>
                <input name="r1" type="radio" value="1" defaultChecked/>
                <div> - по возрастанию цены</div>
                <input name="r1" type="radio" value="2"/>
                <div>- по убыванию цены</div>
                <input name="r1" type="radio" value="3"/>
                <div>- по времени в пути</div>
            </div>
            <strong>Фильтровать</strong>
            <div className={styles.filter}>
                <input type="checkbox" id="one_transfer"/>
                <div>- 1 пересадка</div>
                <input type="checkbox" id="no_transfer"/>
                <div>- без пересадок</div>
            </div>
            <strong>Цена</strong>
            <div className={styles.priceWrapper}>
                <div>От <input/></div>
                <div>До <input/></div>
            </div>
            <strong>Авиакомпании</strong>
            <div className={styles.filter}>
                <input type="checkbox" id="aeroflot"/>
                <div>- Аэрофлот</div>
                <input type="checkbox" id="ural_airlines"/>
                <div>- Уральские авиалинии</div>
            </div>
        </div>
    )
}

export default Filters