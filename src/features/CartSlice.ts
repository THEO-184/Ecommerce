import { RootState } from "./../app/store";
import { ProductType } from "./../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../types";

const initialState: CartState = {
	cartItem: [],
	TotalItems: 0,
};

const CartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		ADD_TO_CART: (state, action: PayloadAction<ProductType>) => {
			state.cartItem.push(action.payload);
			state.TotalItems += 1;
		},
	},
});

// select srate
export const selectTotalItems = (state: RootState) => state.cart.TotalItems;
export const selectCartItems = (state: RootState) => state.cart.cartItem;
export const { ADD_TO_CART } = CartSlice.actions;
export default CartSlice.reducer;
