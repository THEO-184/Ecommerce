import Modal from "../Popup";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { doc, updateDoc, query, onSnapshot, getDocs } from "firebase/firestore";
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
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Paper,
	Typography,
	Box,
	Container,
	Grid,
	Link,
	Button,
} from "@mui/material";
import Popup from "reactjs-popup";
import { RELOAD_ITEMS } from "../../features/Products/ProductsSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { flex } from "./Cart";

// Component
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
		getDocs(productsRef).then((snapshot) => {
			snapshot.docs.forEach((document) => {
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
	};

	if (!PRODUCTS.length) {
		return (
			<>
				<Box sx={{ my: 2 }} textAlign={"center"}>
					<Button variant="contained" component={RouterLink} to="/">
						Go back
					</Button>
				</Box>
				<Typography variant="h4" sx={{ my: 2 }} textAlign={"center"}>
					No Item in Cart
				</Typography>
			</>
		);
	}
	return (
		<Container maxWidth="lg">
			<Box sx={{ my: 2 }} textAlign={"center"}>
				<Button variant="contained" component={RouterLink} to="/">
					Go back
				</Button>
			</Box>
			<Typography variant="h4" sx={{ my: 2 }} textAlign={"center"}>
				Cart Items
			</Typography>

			<Box sx={{ position: "fixed", top: "85px", right: "10px", mb: 4 }}>
				<Modal handleEmptyCart={handleEmptyCart} />
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
