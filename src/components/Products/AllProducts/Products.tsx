import { Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import {
	selectProducts,
	selectLoading,
} from "../../../features/Products/ProductsSlice";
import Product from "../Product/Product";
import { CircularProgress, Box } from "@mui/material";

const Products = () => {
	const PRODUCTS = useAppSelector(selectProducts);
	const LOADING = useAppSelector(selectLoading);
	console.log(PRODUCTS);

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
		<Container disableGutters maxWidth="xl">
			<Grid container spacing={2}>
				{PRODUCTS?.map((product, id) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={id}>
						<Product {...product} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Products;
