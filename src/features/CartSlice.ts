import { RootState } from "./../app/store";
import { ProductType } from "./../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../types";
import { iteratorSymbol } from "immer/dist/internal";

const initialState: CartState = {
	cartItem: [],
	TotalItems: 0,
	TotalPrice: 0.0,
};

const CartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		ADD_TO_CART: (state, action: PayloadAction<ProductType>) => {
			state.cartItem.push({ ...action.payload, total: 1 });
			state.TotalItems += 1;
			state.TotalPrice += action.payload.price;
		},
		INCREASE_ITEM: (state, action: PayloadAction<number>) => {
			state.cartItem = state.cartItem.map((item) => {
				if (item.id === action.payload) {
					state.TotalPrice += item.price;
					return { ...item, total: (item.total += 1) };
				}
				return item;
			});
		},
		DECREASE_ITEM: (state, action: PayloadAction<number>) => {
			state.cartItem = state.cartItem.map((item) => {
				if (item.id === action.payload) {
					if (item.total === 1) {
						state.TotalItems -= 1;
						return { ...item, total: 1 };
					}
					if (item.total > 1) {
						state.TotalPrice -= item.price;
						return { ...item, total: (item.total -= 1) };
					}
				}
				return item;
			});
		},
		DELETE_ITEM: (state, action: PayloadAction<number>) => {
			// deduct the total price of item from Total Price
			state.TotalPrice = state.cartItem
				.filter((item) => item.id === action.payload)
				.reduce(
					(price, item) => price - item.price * item.total,
					state.TotalPrice
				);

			// return only items which are nit deleted
			state.cartItem = state.cartItem.filter(
				(item) => item.id !== action.payload
			);
			// decrease the total number of items
			state.TotalItems = state.TotalItems > 0 ? (state.TotalItems -= 1) : 0;
		},
		CLEAR_CART: (state) => {
			state.cartItem = [];
			state.TotalItems = 0;
			state.TotalPrice = 0;
		},
	},
});

// select srate
export const selectTotalItems = (state: RootState) => state.cart.TotalItems;
export const selectCartItems = (state: RootState) => state.cart.cartItem;
export const selectTotalPrice = (state: RootState) => state.cart.TotalPrice;
export const {
	ADD_TO_CART,
	INCREASE_ITEM,
	DECREASE_ITEM,
	DELETE_ITEM,
	CLEAR_CART,
} = CartSlice.actions;
export default CartSlice.reducer;
