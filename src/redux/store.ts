
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favorite/slice';
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    favorite: favoriteReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>