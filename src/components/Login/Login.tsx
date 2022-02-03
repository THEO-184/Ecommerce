import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Paper, Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";

interface IFormInput {
	email: string;
	password: string;
}

const schema = yup.object({
	email: yup
		.string()
		.email("invalid email format")
		.required("email is required"),
	password: yup
		.string()
		.required(
			"password must contain atleast 8 characters with atleast 1 uppercase,1 lowercase and 1 special character"
		)
		.min(8)
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"password must contain atleast 8 characters with atleast 1 uppercase,1 lowercase and 1 special character"
		),
});

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
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

	return (
		<Container maxWidth="sm" sx={{ width: "400px", m: "auto" }}>
			<Paper elevation={3} sx={{ py: 3, px: 2, width: "100%" }}>
				<Typography variant="h6">Sign Up</Typography>
				<Typography variant="body2">
					stay updated on your professional world
				</Typography>
				<Box
					onSubmit={handleSubmit(onSubmit)}
					component="form"
					sx={{
						"& .MuiTextField-root": { my: 2, width: "100%" },
					}}
				>
					<Controller
						name="email"
						control={control}
						defaultValue={""}
						render={({ field }) => (
							<TextField
								{...field}
								type={"email"}
								variant="filled"
								label="email"
							/>
						)}
					/>
					{errors.email && (
						<Typography variant="body2" color="crimson">
							{errors.email.message}
						</Typography>
					)}
					<Controller
						name="password"
						control={control}
						defaultValue={""}
						render={({ field }) => (
							<TextField
								{...field}
								type={"password"}
								variant="filled"
								label="password"
							/>
						)}
					/>

					{errors.password && (
						<Typography variant="body2" color="crimson" sx={{ my: 2 }}>
							{errors.password.message}
						</Typography>
					)}

					<SignInBtn>
						<Typography variant="body1">Sign In</Typography>
					</SignInBtn>

					<Typography variant="body2" sx={{ textAlign: "center", my: 1 }}>
						or
					</Typography>
				</Box>
				<SignInBtn>
					<Typography
						variant="body1"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<GoogleIcon sx={{ px: 1 }} />
						<Typography>Sign In with google</Typography>
					</Typography>
				</SignInBtn>
			</Paper>
		</Container>
	);
};

export default Login;
