import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Box, Grid } from "@mui/material";
import { selectCartItems } from "../../features/CartSlice";
import Product from "../Products/Product/Product";

const CartItems = () => {
	const PRODUCTS = useAppSelector(selectCartItems);
	console.log(PRODUCTS);

	return (
		<Box component="main" sx={{ mx: 2 }}>
			<Typography>Cart Items</Typography>

			<Grid container spacing={2}>
				{/* {PRODUCTS?.map((product, id) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={id}>
						<Product {...product} />
					</Grid>
				))} */}
			</Grid>
		</Box>
	);
};

export default CartItems;
