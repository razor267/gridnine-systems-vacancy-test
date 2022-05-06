type SegmentType = {
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