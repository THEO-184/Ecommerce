import React, { useEffect } from "react";
import { app } from "../../firebase-config.js";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { selectUser, SET_USER } from "../../features/Products/ProductsSlice";
import {
	Box,
	Toolbar,
	IconButton,
	Typography,
	Badge,
	MenuItem,
	Menu,
	Button,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { selectTotalItems } from "../../features/CartSlice";
import CustomizedMenus from "../menu/menu";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useLocation } from "react-router-dom";
import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
} from "react-router-dom";
import { selectTotalPrice } from "../../features/CartSlice";
import { Link } from "@mui/material";

const auth = getAuth(app);

// COMPONENTS
const NavBar = () => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const Total = useAppSelector(selectTotalItems);
	const TOTALPRICE = useAppSelector(selectTotalPrice);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null);
	const location = useLocation();

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				dispatch(
					SET_USER({
						userEmail: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
					})
				);
			} else {
			}
		});
	}, [user.displayName]);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleLogOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(
					SET_USER({
						userEmail: "",
						photoURL: "",
						displayName: "",
					})
				);
			})
			.catch((err) => {
				alert(err);
			});
		handleMenuClose();
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	// logout and
	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleLogOut}>Log Out</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{ backgroundColor: "#fff", color: "InfoText" }}
			>
				<Toolbar>
					<Link
						variant="h6"
						underline="none"
						noWrap
						component={RouterLink}
						to="/"
						sx={{ color: "#000" }}
					>
						TheoCommerce
					</Link>
					<Box sx={{ flexGrow: 1 }} />
					<Box>
						{location.pathname === "/" && (
							<IconButton
								size="large"
								aria-label="show 17 new notifications"
								color="inherit"
								component={RouterLink}
								to="products"
							>
								<Badge badgeContent={Total} color="error">
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						)}

						{location.pathname === "/products" && (
							<Typography
								variant="body1"
								component={"span"}
								sx={{ mr: 1, color: "#000" }}
							>
								TotalPrice: ${Math.abs(TOTALPRICE).toFixed(2)}
							</Typography>
						)}

						{user.userEmail ? (
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<Avatar
									alt="profile"
									src={user.photoURL || undefined}
									sx={{
										"&:hover": { background: "#fff" },
									}}
								/>
							</IconButton>
						) : (
							location.pathname === "/" && (
								<Button
									variant="contained"
									component={RouterLink}
									to="login"
									sx={{ ml: 1 }}
								>
									Login
								</Button>
							)
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<CustomizedMenus />
			{renderMenu}
		</Box>
	);
};

export default NavBar;
