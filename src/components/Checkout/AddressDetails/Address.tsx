import { Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Address = () => {
	return (
		<Container>
			<Typography variant="h5" component={"h1"} gutterBottom sx={{ mt: 2 }}>
				Adress
			</Typography>
			<Grid container spacing={2} component={"form"}>
				<Grid item xs={12} sm={6}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="text"
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="text"
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="text"
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="text"
						variant="standard"
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Address;
