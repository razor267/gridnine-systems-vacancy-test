import React, {FC} from 'react'
import styles from './FlightItem.module.scss'
import {FlightType} from '../../../types/types'
import Flight from '../../../components/Flight'
import airlinesLogo from '../../../mock/airlinesLogo'

type PropsType = {
    flight: FlightType
}
const FlightItem: FC<PropsType> = ({flight}) => {

    const logo = airlinesLogo.find(item => item.uid === flight.flight.carrier.uid)?.logo

    return (
        <div className={styles.flightWrapper}>
            <div className={styles.header}>
                <div className={styles.logo}><img src={logo} alt="logo"/></div>
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
