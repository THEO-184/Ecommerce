import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ProductReducer from "../features/Products/ProductsSlice";
import CartReducer from "../features/CartSlice";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const persistedCartReducer = persistReducer(persistConfig, CartReducer);
const persistedProductsReducer = persistReducer(persistConfig, ProductReducer);

export const store = configureStore({
	reducer: {
		products: persistedProductsReducer,
		cart: persistedCartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
