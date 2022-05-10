import flights from '../mock/flights'

export type AirlineLogo = {
    logo: string
    uid: string
}

export type SegmentType = {
    departureAirport: {
        uid: string
        caption: string
    }
    departureCity?: {
        uid: string
        caption: string
    }
    arrivalCity?: {
        uid: string
        caption: string
    }
    arrivalDate: string
    departureDate: string
    airline: {
        uid: string
        caption: string
        airlineCode: string
    }
    arrivalAirport: {
        uid: string
        caption: string
    }
}

export type LegType = {
    duration : number
    segments: SegmentType[]
}

export type FlightType = {
    flight: {
        carrier: {
            caption: string
            uid: string
        }
        price: {
            total: {
                amount: string
            }
        }
        legs: LegType[]
    }
}

export type SortType = 'price_min' | 'price_max' | 'time'

export type AirlineType = {
    uid: string
    caption: string
    checked: boolean
}

export type FiltersType = {
    sort: SortType
    transfer: {
        one: boolean
        no: boolean
    }
    price: {
        min: number | ''
        max: number | ''
    }
    airlines: AirlineType[]
}

export type StateType = {
    flights: FlightsType
    renderFlights: FlightType[]
    filters: FiltersType
}

export type TransferEditActionType = {
    field: 1 | 0
    value: boolean
}

export type PriceEditActionType = {
    field: 'min' | 'max'
    value: string
}

export type FlightsType = typeof flights.result.flights