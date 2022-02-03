import React from "react";
import { Container, Paper, Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const SignInBtn = styled("button")({
	backgroundColor: "#201764",
	color: "white",
	textAlign: "center",
	width: "100%",
	paddingTop: 10,
	paddingLeft: 10,
	paddingBottom: 10,
	paddingRight: 10,
	borderRadius: 30,
	cursor: "pointer",
	border: "none",
	transition: "all 0.3s",
	"&:hover": {
		backgroundColor: "#251A74",
	},
});
const Login = () => {
	return (
		<Container maxWidth="sm" sx={{ width: "400px", m: "auto" }}>
			<Paper elevation={3} sx={{ py: 3, px: 2, width: "100%" }}>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { my: 2, width: "100%" },
					}}
				>
					<Typography variant="h6">Sign Up</Typography>
					<Typography variant="body2">
						stay updated on your professional world
					</Typography>
					<TextField type={"email"} variant="filled" label="email" required />
					<TextField
						type={"password"}
						variant="filled"
						label="password"
						required
					/>
					<SignInBtn>
						<Typography variant="h6">Sign In</Typography>
					</SignInBtn>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login;
