import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	AuthErrorCodes,
} from "firebase/auth";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Paper, Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SET_USER } from "../../features/Products/ProductsSlice";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// authenticate
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	login_hint: "user@example.com",
});

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
		.min(8),
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

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleError = (error: any) => {
		if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
			setError("Email Already In Use");
		}
	};

	const signIn: SubmitHandler<IFormInput> = async (data) => {
		const { email, password } = data;
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const { email: userEmail, photoURL, displayName } = userCredentials.user;
			console.log(userCredentials.user);

			dispatch(SET_USER({ userEmail, displayName, photoURL }));
			reset();
			setTimeout(() => {
				navigate("/");
			}, 100);
		} catch (error) {
			handleError(error);
			console.log(error);
		}
	};

	return (
		<Container maxWidth="sm" sx={{ width: "400px", m: "auto" }}>
			<Paper elevation={3} sx={{ py: 3, px: 2, width: "100%" }}>
				<Typography variant="h6">Sign In</Typography>
				{error && (
					<>
						<Typography variant="body2" color="crimson">
							{error} <br />
						</Typography>
						<Typography variant="body2">Log in</Typography>
					</>
				)}
				<Box
					onSubmit={handleSubmit(signIn)}
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
						<Typography variant="body1">Sign in</Typography>
					</SignInBtn>
				</Box>
				<Box sx={{ my: 1, textAlign: "center", fontSize: "1.2rem" }}>
					Already have an account?{" "}
					<Link underline="always" component={RouterLink} to="/login">
						Log In
					</Link>
				</Box>
			</Paper>
		</Container>
	);
};

export default SignIn;
