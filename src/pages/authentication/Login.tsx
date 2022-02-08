import { useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	AuthErrorCodes,
} from "firebase/auth";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Paper, Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
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

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleError = (error: any) => {
		if (error.code === AuthErrorCodes.USER_DELETED) {
			setError("User Not Found. Sign In");
		}
		if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
			setError("Invalid Password");
		}
		if (error.code === AuthErrorCodes.INVALID_EMAIL) {
			setError("Invalid Email");
		}
	};

	const loginWithEmailAndPassword: SubmitHandler<IFormInput> = async (data) => {
		// console.log(data);
		const { email, password } = data;
		try {
			const userCredentials = await signInWithEmailAndPassword(
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
		}
	};

	const handleSignInWithGoogle = async () => {
		await signInWithPopup(auth, provider).then((result) => {
			const { email: userEmail, photoURL, displayName } = result.user;
			console.log(result.user);
			dispatch(
				SET_USER({
					userEmail,
					displayName,
					photoURL,
				})
			);
		});
		setTimeout(() => {
			navigate("/");
		}, 300);
	};

	return (
		<Container
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{ py: 3, px: 2, width: { xs: "90vw", md: "400px" }, m: "auto" }}
			>
				<Typography variant="h6">Log In</Typography>
				{error && (
					<Typography variant="body2" color="crimson">
						{error}
					</Typography>
				)}
				<Box
					onSubmit={handleSubmit(loginWithEmailAndPassword)}
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
						<Typography variant="body1">Log in</Typography>
					</SignInBtn>

					<Typography variant="body2" sx={{ textAlign: "center", my: 1 }}>
						or
					</Typography>
				</Box>
				{/* <SignInBtn onClick={handleSignInWithGoogle}>
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
				</SignInBtn> */}
				<Box sx={{ my: 1, textAlign: "center", fontSize: "1.2rem" }}>
					Dont have an account?{" "}
					<Link underline="always" component={RouterLink} to="/signIn">
						Sign up
					</Link>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login;
