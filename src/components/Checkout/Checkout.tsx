import {
	Box,
	Container,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import React from "react";
import Address from "./AddressDetails/Address";
import Payment from "./payment/Payment";

const steps = ["Shipping address", "payment details"];

const Checkout = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	// FORM
	const Form = () => (activeStep === 0 ? <Address /> : <Payment />);

	return (
		<Container maxWidth="sm" component={"main"}>
			<Typography align="center" component={"h4"} gutterBottom>
				Checkout
			</Typography>
			<Stepper activeStep={activeStep}>
				{steps.map((step) => (
					<Step key={step}>
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Form />
		</Container>
	);
};

export default Checkout;
