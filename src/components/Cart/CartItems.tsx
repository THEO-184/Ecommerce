import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	doc,
	updateDoc,
	query,
	orderBy,
	onSnapshot,
	where,
} from "firebase/firestore";
import db, { colRef } from "../../firebase-config";
import {
	selectCartItems,
	selectTotalPrice,
	INCREASE_ITEM,
	DECREASE_ITEM,
	DELETE_ITEM,
	CLEAR_CART,
} from "../../features/CartSlice";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Paper,
	Typography,
	Box,
	Container,
	Grid,
} from "@mui/material";
import {
	LOAD_ITEMS_TOCART,
	RELOAD_ITEMS,
	selectIsReload,
} from "../../features/Products/ProductsSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { flex } from "./Cart";
import { fireStoreProductType } from "../../types";
// export { flex } from "./Cart";

// Compoent
const CartItems = () => {
	const navigate = useNavigate();
	const PRODUCTS = useAppSelector(selectCartItems);
	const TOTAL = useAppSelector(selectTotalPrice);
	const dispatch = useAppDispatch();

	// Increase Item
	const handleIncreaseItem = (id: string): void => {
		dispatch(INCREASE_ITEM(id));
	};

	// decrease Item
	const handleDecreaseItem = (id: string): void => {
		dispatch(DECREASE_ITEM(id));
	};

	// delete Item;
	const handleDeleteItem = (id: string): void => {
		// delete item from cart
		dispatch(DELETE_ITEM(id));

		// reset product's disabled button from  firebase
		const docRef = doc(db, "products", id);
		updateDoc(docRef, {
			isAdded: false,
		});
		if (PRODUCTS.length === 1) {
			setTimeout(() => {
				navigate("/");
			}, 500);
		}
	};

	// empty cart
	const handleEmptyCart = (): any => {
		const productsRef = query(colRef);
		onSnapshot(productsRef, (snapshot) => {
			snapshot.docs.map((document) => {
				const docRef = doc(db, "products", document.id);
				updateDoc(docRef, {
					isAdded: false,
				});
			});
		});
		dispatch(CLEAR_CART());
		dispatch(RELOAD_ITEMS(true));
		setTimeout(() => {
			navigate("/");
		}, 500);
		// return () => unSub();
	};

	if (!PRODUCTS.length) {
		return (
			<Typography variant="h4" sx={{ my: 2 }} textAlign={"center"}>
				No Item in Cart
			</Typography>
		);
	}
	return (
		<Container maxWidth="lg">
			<Typography variant="h4" sx={{ my: 2 }} textAlign={"center"}>
				Cart Items
			</Typography>

			<Box sx={{ position: "fixed", top: "70px", right: "10px", mb: 4 }}>
				<Button
					color="error"
					sx={{ mr: 2, my: 1 }}
					variant="contained"
					size="small"
					onClick={handleEmptyCart}
				>
					EMPTY CART
				</Button>
			</Box>

			<Grid container spacing={2} sx={{ ...flex, justifyContent: "center" }}>
				{PRODUCTS?.map((product, id) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={id}>
						<Paper elevation={3}>
							<Card sx={{ maxWidth: "100%" }}>
								<CardMedia
									component={"img"}
									height={"170"}
									alt="img"
									image={product.image}
								/>
								<CardContent>
									<Box
										sx={{
											py: 0.1,
											...flex,
										}}
									>
										<Typography component="h4" variant="body2">
											{product.title.length > 20
												? product.title.slice(0, 20) + "..."
												: product.title}
										</Typography>
										<Typography component="h4" variant="body2">
											${product.price}
										</Typography>
									</Box>
								</CardContent>
								<CardActions
									sx={{
										...flex,
									}}
								>
									<Box
										sx={{
											...flex,
										}}
									>
										<Button
											size="small"
											onClick={() => handleIncreaseItem(product.id)}
										>
											{" "}
											<AddOutlinedIcon fontSize="small" />{" "}
										</Button>
										<Typography>{product.total}</Typography>
										<Button
											size="small"
											onClick={() => handleDecreaseItem(product.id)}
										>
											{" "}
											<RemoveOutlinedIcon fontSize="small" />{" "}
										</Button>
									</Box>
									<Box>
										<Button
											size="small"
											color="error"
											onClick={() => handleDeleteItem(product.id)}
										>
											<DeleteForeverOutlinedIcon />
										</Button>
									</Box>
								</CardActions>
							</Card>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default CartItems;
