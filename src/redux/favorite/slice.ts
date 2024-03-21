import { CoinInterface } from "@/interfaces/coinsInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Coin = Omit<
    CoinInterface,
    "overview" | "vote_average" | "release_date" | "runtime" | "genres"
>;

interface FavoriteState {
    favoriteCoins: Coin[];
}

const initialState: FavoriteState = {
    favoriteCoins: [],
};

const addCoinToFavorite = (
    state: FavoriteState,
    action: PayloadAction<Coin>
) => {
    const existingCoin = state.favoriteCoins.find(
        (movie) => movie.id === action.payload.id
    );

    if (!existingCoin) {
        state.favoriteCoins.push(action.payload);
    }
};

const removeCoinFromFavorite = (
    state: FavoriteState,
    action: PayloadAction<number>
) => {
    const updateFavCoinList = state.favoriteCoins.filter(
        (movie) => movie.id !== action.payload
    );
    state.favoriteCoins = updateFavCoinList;
};

export const favroitesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addCoinToFavorite,
        removeCoinFromFavorite,
    },
});

export const {
    addCoinToFavorite: addFavorite,
    removeCoinFromFavorite: removeFavorite,
} = favroitesSlice.actions;

export default favroitesSlice.reducer;