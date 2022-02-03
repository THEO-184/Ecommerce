import { fireStoreProductType, ProductsState, ProductType } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: ProductsState = {
	products: [],
	loading: "idle",
	isReloadItems: false,
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
	},
});

// selectors
export const selectProducts = (state: RootState) => state.products.products;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectIsReload = (state: RootState) =>
	state.products.isReloadItems;

export const { LOAD_ITEMS_TOCART, RELOAD_ITEMS } = ProductsSlice.actions;
export default ProductsSlice.reducer;
