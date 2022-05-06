import React, {FC} from 'react'
import styles from './Flight.module.scss'
import {LegType} from '../../types/types'
import cn from 'classnames'

type PropsType = {
    flight: LegType
    lastItem: boolean
}
const Flight: FC<PropsType> = ({flight, lastItem}) => {


    return (
        <div className={cn(styles.wrapper, {
            [styles.wrapperBottomBorder]: !lastItem
        })}>
            {flight.segments[0].departureCity?.caption},
            {flight.segments[0].departureAirport.caption}
            ({flight.segments[0].departureAirport.uid})
            →
            {flight.segments[1].arrivalCity?.caption},
            {flight.segments[1].arrivalAirport.caption}
            ({flight.segments[1].arrivalAirport.uid})
        </div>
    )
}

export default Flight