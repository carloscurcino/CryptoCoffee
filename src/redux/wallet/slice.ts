import { WalletInterface } from "@/interfaces/walletinterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Wallet = Omit<
    WalletInterface,
    "overview" | "vote_average" | "release_date" | "runtime" | "genres"
>;

interface WalletState {
    wallet: Wallet;
}

const initialState: WalletState = {
    wallet: {
        address: "",
        balance: "",
    },
};

const addWallet = (
    state: WalletState,
    action: PayloadAction<Wallet>
) => {
    const existingWallet = state.wallet.address === action.payload.address

    if (!existingWallet) {
        state.wallet = {
            address: action.payload.address,
            balance: action.payload.balance
        };
    }
};

const removeWallet = (
    state: WalletState,
    // action: PayloadAction<Wallet>
) => {
    state.wallet = {
        address: "",
        balance: "",
    };
};

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        addWallet,
        removeWallet,
    },
});

export const {
    addWallet: addWalletAccount,
    removeWallet: removeWalletAccount,
} = walletSlice.actions;

export default walletSlice.reducer;