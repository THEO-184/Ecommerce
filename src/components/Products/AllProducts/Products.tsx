import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { fireStoreProductType } from "../../../types";
import {
	selectIsReload,
	LOAD_ITEMS_TOCART,
} from "../../../features/Products/ProductsSlice";
import { colRef } from "../../../firebase-config";
import { query, onSnapshot, orderBy } from "firebase/firestore";
import Product from "../Product/Product";
import { CircularProgress, Box } from "@mui/material";
// import { Link } from "react-router-dom";

const Products = () => {
	const isReload = useAppSelector(selectIsReload);
	console.log(isReload);

	const [Products, setProducts] = useState<fireStoreProductType[]>([]);
	const dispatch = useAppDispatch();

	// get Data
	useEffect(() => {
		// const abortController = new AbortController();
		const q = query(colRef, orderBy("Title"));
		const unSuscribe = onSnapshot(q, (snapshot) => {
			let productsFire: fireStoreProductType[] = [];
			snapshot.docs.forEach((doc) => {
				productsFire.push({
					id: doc.id,
					title: doc.data().Title,
					description: doc.data().description,
					image: doc.data().image,
					disabled: doc.data().isAdded,
					price: doc.data().price,
					total: 0,
				});
			});

			setProducts(productsFire);
			dispatch(LOAD_ITEMS_TOCART(productsFire));
		});
		return () => unSuscribe();
	}, []);

	if (!Products.length) {
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
				{Products?.map((product) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
						<Product {...product} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Products;
