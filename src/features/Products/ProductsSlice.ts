import {
	fireStoreProductType,
	ProductsState,
	ProductType,
	User,
} from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: ProductsState = {
	products: [],
	loading: "idle",
	isReloadItems: false,
	userObj: {
		userEmail: "",
		photoURL: "",
		displayName: "",
	},
};

const ProductsSlice = createSlice({
	name: "Products",
	initialState,
	reducers: {
		LOAD_ITEMS_TOCART: (
			state,
			action: PayloadAction<fireStoreProductType[]>
		) => {
			state.products = action.payload;
		},

		RELOAD_ITEMS: (state, action: PayloadAction<boolean>) => {
			state.isReloadItems = action.payload;
		},

		SET_USER: (state, action: PayloadAction<User>) => {
			state.userObj = action.payload;
		},
	},
});

// selectors
export const selectProducts = (state: RootState) => state.products.products;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectIsReload = (state: RootState) =>
	state.products.isReloadItems;
export const selectUser = (state: RootState) => state.products.userObj;

export const { LOAD_ITEMS_TOCART, RELOAD_ITEMS, SET_USER } =
	ProductsSlice.actions;
export default ProductsSlice.reducer;
