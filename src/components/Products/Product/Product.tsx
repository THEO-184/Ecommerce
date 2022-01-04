import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ProductType } from "../../../types";
import { Box } from "@mui/system";

const Product = (props: ProductType) => {
	const { title, price, image, description } = props;
	return (
		<Box>
			<Card sx={{ maxWidth: "100%" }}>
				<CardMedia component={"img"} height={"170"} alt="img" image={image} />
				<CardContent>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							py: 0.1,
						}}
					>
						<Typography component="h4" variant="body2">
							{title.length > 20 ? title.slice(0, 20) + "..." : title}
						</Typography>
						<Typography component="h4" variant="body2">
							${price}
						</Typography>
					</Box>
					<Typography variant="body2" sx={{ mt: 1 }}>
						{description
							? description.length > 30
								? description.slice(0, 30).toLowerCase() + "..."
								: description
							: "Product"}
					</Typography>
				</CardContent>
				<CardActions>
					<Box flexGrow={1} />
					<Button
						variant="text"
						disableElevation
						sx={{ "&:hover": { background: 0 } }}
					>
						<ShoppingCartOutlinedIcon sx={{ color: "#000" }} />
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default Product;
