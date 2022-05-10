import {AirlineType, FlightType} from '../types/types'

const airlinesObject = (flights: FlightType[], airlineArray?: AirlineType[]) => {

    const airlines: AirlineType[] = []

    airlineArray?.forEach(item => item.checked &&
    airlines.push(item))

    flights.forEach(item => {
        if (airlines.find(el => el.caption === item.flight.carrier.caption) === undefined) {
            let checked: boolean = false
            if (airlineArray) {
                airlineArray.forEach(airline => {
                    if (item.flight.carrier.caption === airline.caption) {
                        airline.checked ? checked = true : checked = false
                    }
                })
            }
            airlines.push({uid: item.flight.carrier.uid, caption: item.flight.carrier.caption, checked: checked})
        }
    })

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