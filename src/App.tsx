import React, { useEffect } from "react";
import {
	fetchProducts,
	selectProducts,
} from "./features/Products/ProductsSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import Products from "./components/Products/AllProducts/Products";
import { selectCartItems } from "./features/CartSlice";
import CartItems from "./components/Cart/CartItems";
import Checkout from "./components/Checkout/Checkout";
// Theme
const theme = createTheme();
const useStyles = makeStyles(() => ({
	offset: {
		...theme.mixins.toolbar,
		flexGrow: 1,
	},
}));

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	// component
	function AppBarOffset() {
		const classes = useStyles();
		return <div className={classes.offset} />;
	}

	return (
		<div className="App">
			<Router>
				<NavBar />
				<AppBarOffset />
				<Routes>
					<Route path="/" element={<Products />}></Route>
					<Route path="products" element={<CartItems />} />
					<Route path="checkout" element={<Checkout />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
