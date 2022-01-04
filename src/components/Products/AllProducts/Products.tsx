import { Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import {
	selectProducts,
	selectLoading,
} from "../../../features/Products/ProductsSlice";
import Product from "../Product/Product";
import { CircularProgress, Box } from "@mui/material";
// import { Link } from "react-router-dom";

const Products = () => {
	const PRODUCTS = useAppSelector(selectProducts);
	const LOADING = useAppSelector(selectLoading);

	if (LOADING === "loading") {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "80vh",
				}}
			>
				<CircularProgress color="success" />
			</Box>
		);
	}

	return (
		<Box component="main" sx={{ mx: 2 }}>
			<Grid container spacing={2}>
				{PRODUCTS?.map((product, id) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={id}>
						<Product {...product} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Products;
