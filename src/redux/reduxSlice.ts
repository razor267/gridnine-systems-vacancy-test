import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FlightType, PriceEditActionType, SortType, StateType, TransferEditActionType} from '../types/types'
import flights from '../mock/flights'
import travelTime from '../helpers/travelTime'
import airlinesObject from '../helpers/airlinesObject'

const initialState: StateType = {
    flights: flights.result.flights,
    renderFlights: flights.result.flights,
    filters: {
        sort: 'price_min',
        transfer: {
            one: false,
            no: false
        },
        price: {
            min: '',
            max: ''
        },
        airlines: airlinesObject(flights.result.flights)
    }
}

export const reduxSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        transferEdit: (state: StateType, action: PayloadAction<TransferEditActionType>) => {
            if (action.payload.field === 1) {
                state.filters.transfer.one = action.payload.value
            } else {
                state.filters.transfer.no = action.payload.value
            }
        },
        priceEdit: (state: StateType, action: PayloadAction<PriceEditActionType>) => {
            if (action.payload.field === 'min') {
                state.filters.price.min = Number(action.payload.value.replace(/[^\d]/g, ''))
                if (state.filters.price.min === 0) {
                    state.filters.price.min = ''
                }
            } else {
                state.filters.price.max = Number(action.payload.value.replace(/[^\d]/g, ''))
                if (state.filters.price.max === 0) {
                    state.filters.price.max = ''
                }
            }
        },
        sortFlightsArray: (state: StateType, action: PayloadAction<SortType>) => {
            state.filters.sort = action.payload
            if (action.payload === 'price_min') {
                state.renderFlights.sort((a: FlightType, b: FlightType) =>
                    Number(a.flight.price.total.amount) > Number(b.flight.price.total.amount) ? 1 :
                        Number(a.flight.price.total.amount) === Number(b.flight.price.total.amount) ? 0 : -1)
            } else if (action.payload === 'price_max') {
                state.renderFlights.sort((a: FlightType, b: FlightType) =>
                    Number(a.flight.price.total.amount) < Number(b.flight.price.total.amount) ? 1 :
                        Number(a.flight.price.total.amount) === Number(b.flight.price.total.amount) ? 0 : -1)
            } else {
                state.renderFlights.sort((a: FlightType, b: FlightType) =>
                    travelTime(a.flight.legs[0].segments[a.flight.legs[0].segments.length - 1].arrivalDate,
                        a.flight.legs[0].segments[0].departureDate)
                    > travelTime(b.flight.legs[0].segments[b.flight.legs[0].segments.length - 1].arrivalDate,
                        b.flight.legs[0].segments[0].departureDate)
                        ? 1 : travelTime(a.flight.legs[0].segments[a.flight.legs[0].segments.length - 1].arrivalDate,
                        a.flight.legs[0].segments[0].departureDate)
                        === travelTime(b.flight.legs[0].segments[b.flight.legs[0].segments.length - 1].arrivalDate,
                        b.flight.legs[0].segments[0].departureDate) ?
                        travelTime(a.flight.legs[1].segments[a.flight.legs[1].segments.length - 1].arrivalDate,
                            a.flight.legs[1].segments[0].departureDate)
                        > travelTime(b.flight.legs[1].segments[b.flight.legs[1].segments.length - 1].arrivalDate,
                            b.flight.legs[1].segments[0].departureDate)
                            ? 1 : travelTime(a.flight.legs[1].segments[a.flight.legs[1].segments.length - 1].arrivalDate,
                            a.flight.legs[1].segments[0].departureDate)
                            === travelTime(b.flight.legs[1].segments[b.flight.legs[1].segments.length - 1].arrivalDate,
                            b.flight.legs[1].segments[0].departureDate) ? 0 : -1 : -1)
            }
        },
        filtersEdit: (state: StateType) => {
            state.renderFlights = JSON.parse(JSON.stringify(state.flights))
            if (state.filters.transfer.one && state.filters.transfer.no) {
                state.renderFlights = state.renderFlights.filter(item =>
                    (item.flight.legs[0].segments.length === 1 && item.flight.legs[1].segments.length === 1) ||
                    (item.flight.legs[0].segments.length <= 2 || item.flight.legs[1].segments.length <= 2))
            } else if (state.filters.transfer.one || state.filters.transfer.no) {
                if (state.filters.transfer.one) {
                    state.renderFlights = state.renderFlights.filter(item =>
                        item.flight.legs[0].segments.length <= 2 || item.flight.legs[1].segments.length <= 2)
                }
                if (state.filters.transfer.no) {
                    state.renderFlights = state.renderFlights.filter(item =>
                        item.flight.legs[0].segments.length === 1 && item.flight.legs[1].segments.length === 1)
                }
            }
            if (state.filters.price.min !== '' && state.filters.price.max !== '') {
                state.renderFlights = state.renderFlights.filter(item =>
                    (Number(item.flight.price.total.amount) >= state.filters.price.min) &&
                    (Number(item.flight.price.total.amount) <= state.filters.price.max))
            } else if (state.filters.price.min !== '' || state.filters.price.max !== '') {
                if (state.filters.price.min !== '') {
                    state.renderFlights = state.renderFlights.filter(item =>
                        Number(item.flight.price.total.amount) >= state.filters.price.min)
                } else {
                    state.renderFlights = state.renderFlights.filter(item =>
                        Number(item.flight.price.total.amount) <= state.filters.price.max)
                }
            }
            state.filters.airlines = airlinesObject(state.renderFlights, state.filters.airlines)
            if (state.filters.airlines.find(item => item.checked) !== undefined) {
                let newArray: FlightType[] = []
                state.filters.airlines.forEach(item => {
                    if (item.checked) {
                        newArray = [...newArray, ...state.renderFlights.filter(el => el.flight.carrier.caption === item.caption)]
                    }
                })
                state.renderFlights = newArray
            }
        },
        airlinesEdit: (state: StateType, action: PayloadAction<string>) => {
            const airline = state.filters.airlines.find(item => item.uid === action.payload)
            if (airline !== undefined) {
                airline.checked = !airline.checked
            }
        }
    }
})

export const {transferEdit, priceEdit, sortFlightsArray, filtersEdit, airlinesEdit} = reduxSlice.actions

export default reduxSlice.reducer