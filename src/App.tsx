import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { fetchProducts } from "./features/Products/ProductsSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import NavBar from "./components/NavBar/NavBar";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
import Products from "./components/Products/AllProducts/Products";
import { Box } from "@mui/system";
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
			<NavBar />
			<AppBarOffset />
			<Box component="main" sx={{ mx: 2 }}>
				<Products />
			</Box>
		</div>
	);
}

export default App;
