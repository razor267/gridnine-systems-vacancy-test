import React, {FC} from 'react'
import styles from './FlightItem.module.scss'
import {FlightType} from '../../../types/types'
import Flight from '../../../components/Flight'

type PropsType = {
    flight: FlightType
}
const FlightItem: FC<PropsType> = ({flight}) => {

    console.log(flight)

    return (
        <div className={styles.flightWrapper}>
            <div className={styles.header}>
                <div>{flight.carrier.caption}</div>
                <div className={styles.priceWrapper}>
                    <div>{flight.price.total.amount} ₽</div>
                    <div className={styles.priceText}>Стоимость для одного взрослого пассажира</div>
                </div>
            </div>
            {flight.legs.map((item, index) => <Flight
                key={index}
                flight={item}
                lastItem={index === flight.legs.length - 1}
            />)}
            <button className={styles.button}>ВЫБРАТЬ</button>
        </div>
    )
}

export default FlightItem


/*
<div>{flight.carrier.caption}</div>
<div>{flight.price.total.amount}</div>
<div>{flight.legs[0].duration}</div>
<div>{flight.legs[0].segments[0].departureAirport.uid}</div>
<div>{flight.legs[0].segments[0].departureAirport.caption}</div>
<div>{flight.legs[0].segments[0].departureCity?.uid}</div>
<div>{flight.legs[0].segments[0].departureCity?.caption}</div>
<div>{flight.legs[0].segments[0].arrivalCity?.uid}</div>
<div>{flight.legs[0].segments[0].arrivalCity?.caption}</div>
<div>{flight.legs[0].segments[0].arrivalDate}</div>
<div>{flight.legs[0].segments[0].departureDate}</div>
<div>{flight.legs[0].segments[0].airline.uid}</div>
<div>{flight.legs[0].segments[0].airline.caption}</div>
<div>{flight.legs[0].segments[0].airline.airlineCode}</div>
<div>{flight.legs[0].segments[0].arrivalAirport.uid}</div>
<div>{flight.legs[0].segments[0].arrivalAirport.caption}</div>
*/
