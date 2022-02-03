import * as React from "react";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import { useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router-dom";
import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
	MemoryRouter,
} from "react-router-dom";
import { selectTotalPrice } from "../../features/CartSlice";

// COMPONENTS
const NavBar = () => {
	const Total = useAppSelector(selectTotalItems);
	const TOTALPRICE = useAppSelector(selectTotalPrice);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null);
	const location = useLocation();

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
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
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{ backgroundColor: "#fff", color: "InfoText" }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						TheoCommerce
					</Typography>
					<Box sx={{ flexGrow: 1 }} />

					<Box>
						{location.pathname === "/" ? (
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
						) : (
							<Typography
								variant="body2"
								component={"span"}
								sx={{ mr: 1, color: "#000" }}
							>
								TotalPrice: ${Math.abs(TOTALPRICE).toFixed(2)}
							</Typography>
						)}

						{/* <IconButton
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
								src="./avatar.jpg"
								sx={{
									"&:hover": { background: "#fff" },
								}}
							/>
						</IconButton> */}
					</Box>
					<Button variant="contained" component={RouterLink} to="login">
						Login
					</Button>
				</Toolbar>
			</AppBar>
			<CustomizedMenus />
			{renderMenu}
		</Box>
	);
};

export default NavBar;
