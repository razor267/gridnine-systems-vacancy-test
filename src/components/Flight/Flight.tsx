import React, {FC} from 'react'
import styles from './Flight.module.scss'
import {LegType} from '../../types/types'
import clockIcon from '../../media/clock.svg'
import cn from 'classnames'
import zeroInDate from '../../helpers/zeroInDate'
import month from '../../helpers/month'
import day from '../../helpers/day'
import airline from '../../helpers/airline'
import transfer from '../../helpers/transfer'

type PropsType = {
    flight: LegType
    lastItem: boolean
}
const Flight: FC<PropsType> = ({flight, lastItem}) => {

    const departureDate = new Date(flight.segments[0].departureDate)
    const arrivalDate = new Date(flight.segments[flight.segments.length - 1].arrivalDate)

    const travelTime = Date.parse(flight.segments[flight.segments.length - 1].arrivalDate) - Date.parse(flight.segments[0].departureDate)
    let travelHours = Math.floor(travelTime / (1000 * 60 * 60))
    const travelMinutes = Math.floor((travelTime / 1000 / 60) % 60)

    if (lastItem) {
        travelHours = travelHours - 2
    } else {
        travelHours = travelHours + 2
    }

    return (
        <div className={cn(styles.wrapper, {
            [styles.wrapperBottomBorder]: !lastItem
        })}>
            <div className={styles.route}>
                <span>{flight.segments[0].departureCity?.caption}, </span>
                <span>{flight.segments[0].departureAirport.caption} </span>
                <span className={styles.blueText}>({flight.segments[0].departureAirport.uid}) </span>
                <span className={styles.blueText}>→ </span>
                <span>{flight.segments[flight.segments.length - 1].arrivalCity?.caption}, </span>
                <span>{flight.segments[flight.segments.length - 1].arrivalAirport.caption} </span>
                <span
                    className={styles.blueText}>({flight.segments[flight.segments.length - 1].arrivalAirport.uid})</span>
            </div>
            <div className={styles.travelTime}>
                <div className={styles.departureTime}>
                    <span
                        className={styles.time}>{`${zeroInDate(departureDate.getHours())}:${zeroInDate(departureDate.getMinutes())} `}</span>
                    <span className={styles.blueText}>{`${departureDate.getDate()}
                ${month(departureDate.getMonth())}
                ${day(departureDate.getDay())}`}</span>
                </div>
                <div className={styles.flightTime}>
                    <img src={clockIcon} alt="clock" className={styles.img}/>
                    <div>{`${travelHours} ч ${travelMinutes} мин`}</div>
                </div>
                <div className={styles.arrivalTime}>
                    <span className={styles.blueText}>{`${arrivalDate.getDate()}
                ${month(arrivalDate.getMonth())}
                ${day(arrivalDate.getDay())} `}</span>
                    <span className={styles.time}>
                        {`${zeroInDate(arrivalDate.getHours())}:${zeroInDate(arrivalDate.getMinutes())}`}
                    </span>
                </div>
            </div>
            <div className={styles.line}>
                <div className={cn(styles.transfer, {
                    [styles.bgWhite]: flight.segments.length > 1
                })}>
                    {flight.segments.length > 1 && `${flight.segments.length - 1} ${transfer(flight.segments.length - 1)}`}
                </div>
            </div>
            <div className={styles.airline}>
                Рейс выполняет: {airline(flight.segments)}
            </div>
        </div>
    )
}

export default Flight