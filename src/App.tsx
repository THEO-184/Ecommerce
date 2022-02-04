import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import Products from "./components/Products/AllProducts/Products";
import CartItems from "./components/Cart/CartItems";
import Login from "./pages/authentication/Login";
import SignIn from "./pages/authentication/SignIn";
// Theme
const theme = createTheme();
const useStyles = makeStyles(() => ({
	offset: {
		...theme.mixins.toolbar,
		flexGrow: 1,
	},
}));

function App() {
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
					<Route path="login" element={<Login />} />
					<Route path="signin" element={<SignIn />} />

					<Route path="products" element={<CartItems />} />
					{/* <Route path="checkout" element={<Checkout />}></Route> */}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
