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
// Theme
import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
	MemoryRouter,
} from "react-router-dom";

const LinkBehavior = React.forwardRef<
	any,
	Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
	const { href, ...other } = props;
	// Map href (Material-UI) -> to (react-router)
	return <RouterLink ref={ref} to={href} {...other} />;
});
const theme = createTheme();

// const theme = createTheme({
// 	components: {
// 		MuiLink: {
// 			defaultProps: {
// 				component: LinkBehavior,
// 			} as RouterLinkProps,
// 		},
// 		MuiButtonBase: {
// 			defaultProps: {
// 				LinkComponent: LinkBehavior,
// 			},
// 		},
// 	},
// });
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
				</Routes>
			</Router>
		</div>
	);
}

export default App;
