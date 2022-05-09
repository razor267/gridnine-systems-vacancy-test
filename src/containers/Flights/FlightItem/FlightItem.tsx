import React, {FC} from 'react'
import styles from './FlightItem.module.scss'
import {FlightType} from '../../../types/types'
import Flight from '../../../components/Flight'

type PropsType = {
    flight: FlightType
}
const FlightItem: FC<PropsType> = ({flight}) => {

    return (
        <div className={styles.flightWrapper}>
            <div className={styles.header}>
                <div>{flight.flight.carrier.caption}</div>
                <div className={styles.priceWrapper}>
                    <div className={styles.price}>{flight.flight.price.total.amount} ₽</div>
                    <div className={styles.priceText}>Стоимость для одного взрослого пассажира</div>
                </div>
            </div>
            {flight.flight.legs.map((item, index) => <Flight
                key={index}
                flight={item}
                lastItem={index === flight.flight.legs.length - 1}
            />)}
            <button className={styles.button}>ВЫБРАТЬ</button>
        </div>
    )
}

export default FlightItem
