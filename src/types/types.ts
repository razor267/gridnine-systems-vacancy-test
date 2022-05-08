import flights from '../mock/flights'

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
    carrier: {
        caption: string
    }
    price: {
        total: {
            amount: string
        }
    }
    legs: LegType[]
}

export type SortType = 'price_min' | 'price_max' | 'time'

export type StateType = {
    // flights: FlightType[]
    flights: FlightsType
    filters: {
        sort: SortType
        transfer: {
            one: boolean
            no: boolean
        }
        price: {
            min: number | ''
            max: number | ''
        }
    }
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

// type InferActionsTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>