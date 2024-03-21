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

const addOrRemovoCoinFavorite = (
    state: FavoriteState,
    action: PayloadAction<Coin>
) => {
    const existingCoin = state.favoriteCoins.find(
        (coin) => coin.id === action.payload.id
    );

    if (!existingCoin) {
        state.favoriteCoins.push(action.payload);
    } else {
        const updateFavCoinList = state.favoriteCoins.filter(
            (coin) => coin.id !== action.payload.id
        );
        state.favoriteCoins = updateFavCoinList;
    }
};

const removeCoinFromFavorite = (
    state: FavoriteState,
    action: PayloadAction<number>
) => {
    const updateFavCoinList = state.favoriteCoins.filter(
        (coin) => coin.id !== action.payload
    );
    state.favoriteCoins = updateFavCoinList;
};

export const favroitesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addOrRemovoCoinFavorite,
        removeCoinFromFavorite,
    },
});

export const {
    addOrRemovoCoinFavorite: addOrRemoveFavorite,
    removeCoinFromFavorite: removeFavorite,
} = favroitesSlice.actions;

export default favroitesSlice.reducer;