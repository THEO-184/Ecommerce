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
} from "@mui/material";
import { Avatar } from "@mui/material";
import { selectTotalItems } from "../../features/CartSlice";
import CustomizedMenus from "../menu/menu";
import { useAppSelector } from "../../app/hooks";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
	const Total = useAppSelector(selectTotalItems);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null);

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
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit"
							LinkComponent={Link}
							href="/products"
						>
							<Badge badgeContent={Total} color="error">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>

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
								src="./avatar.jpg"
								sx={{
									"&:hover": { background: "#fff" },
								}}
							/>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<CustomizedMenus />
			{renderMenu}
		</Box>
	);
};

export default NavBar;
