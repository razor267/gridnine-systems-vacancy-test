import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PriceEditActionType, SortType, StateType, TransferEditActionType} from '../types/types'
import flights from '../mock/flights'

const initialState: StateType = {
    flights: flights.result.flights,
    filters: {
        sort: 'price_min',
        transfer: {
            one: false,
            no: false
        },
        price: {
            min: '',
            max: ''
        }
    }
}

export const reduxSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        sortEdit: (state: StateType, action: PayloadAction<SortType>) => {
            state.filters.sort = action.payload
        },
        transferEdit: (state: StateType, action: PayloadAction<TransferEditActionType>) => {
            if (action.payload.field === 1) {
                state.filters.transfer.one = action.payload.value
            } else {
                state.filters.transfer.no = action.payload.value
            }
        },
        priceEdit: (state: StateType, action:PayloadAction<PriceEditActionType>) => {
            if (action.payload.field === 'min') {
                state.filters.price.min = Number(action.payload.value.replace(/[^\d]/g,''))
                if (state.filters.price.min === 0) {
                    state.filters.price.min = ''
                }
            } else {
                state.filters.price.max = Number(action.payload.value.replace(/[^\d]/g,''))
                if (state.filters.price.max === 0) {
                    state.filters.price.max = ''
                }
            }
        }
    }
})

export const {sortEdit, transferEdit, priceEdit} = reduxSlice.actions

export default reduxSlice.reducer