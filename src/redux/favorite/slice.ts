import { createSlice } from '@reduxjs/toolkit'
import { CoinInterface } from '../../interfaces/coinsInterface'

const initialState = {
    favoriteCoins: [],
}

const favoriteCoinsSlice = createSlice({
    name: 'favoriteCoins',
    initialState,
    reducers: {
        addToFavoriteCoin: (state, action) => {
            state.favoriteCoins = [...state.favoriteCoins, { ...action.payload }]
        },
        removeFromFavoriteCoin: (state, action) => {
            state.favoriteCoins = state.favoriteCoins.filter(coin => coin.id !== action.payload)
        },
    },
})

export const { addToFavoriteCoin, removeFromFavoriteCoin } = favoriteCoinsSlice.actions
export const selectFavorites = state => state.favoriteCoins
export const favoriteReducer = favoriteCoinsSlice.reducer
