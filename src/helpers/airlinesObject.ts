import {AirlineType, FlightsType} from '../types/types'

const airlinesObject = (flights: FlightsType) => {

    const airlines: AirlineType[] = []

    flights.forEach(item => airlines.find(el => el.caption === item.flight.carrier.caption) === undefined
        && airlines.push({uid: item.flight.carrier.uid, caption: item.flight.carrier.caption}))

    airlines.sort((a: AirlineType, b: AirlineType) => {
            const el1 = a.caption.toLowerCase()
            const el2 = b.caption.toLowerCase()
            if (el1 < el2)
                return -1
            if (el1 > el2)
                return 1
            return 0
        }
    )
    return airlines
}

export default airlinesObject