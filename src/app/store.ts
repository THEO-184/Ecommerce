import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ProductReducer from "../features/Products/ProductsSlice";
import CartReducer from "../features/CartSlice";
export const store = configureStore({
	reducer: {
		products: ProductReducer,
		cart: CartReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
