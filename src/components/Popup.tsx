import React from "react";

import Popup from "reactjs-popup";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MyPopup = styled(Popup)({
	padding: "5px",
});

const overlayStyle = { background: "rgba(0,0,0,0.5)" };

const Modal = ({ handleEmptyCart }: { handleEmptyCart: () => void }) => (
	<MyPopup
		trigger={
			<Button className="button" variant="contained">
				{" "}
				Clear Cart{" "}
			</Button>
		}
		{...{ overlayStyle }}
		modal
		lockScroll
		nested
		repositionOnResize
	>
		{(close: any) => (
			<Box
				className="modal"
				sx={{
					fontSize: "12px",
					backgroundColor: "#fff",
					width: { xs: "82vw", sm: "82vw", md: "50vw" },
					textAlign: "center",
					p: 4,
					color: "white",
					borderRadius: "10px",
				}}
			>
				<Button
					className="close"
					onClick={close}
					sx={{
						position: "absolute",
						display: "block",
						p: 0,
						left: "5px",
						top: "5px",
						fontSize: "24px",
						background: "#Fff",
					}}
				>
					<CloseIcon />
				</Button>

				<Typography
					variant="h5"
					className="content"
					sx={{
						width: "100%",
						px: 2,
						color: "#014750",
						fontSize: { xs: "1rem", md: "1.5rem" },
					}}
				>
					Do you want to clear cart?
				</Typography>
				<Box
					className="actions"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Button
						className="button"
						variant="contained"
						sx={{ m: 2, fontSize: { xm: "0.8rem" } }}
						onClick={() => {
							close();
						}}
					>
						Cancel
					</Button>

					<Button
						className="button"
						variant="outlined"
						sx={{ m: 2, fontSize: { xm: "0.8rem" } }}
						onClick={() => handleEmptyCart()}
					>
						Clear cart
					</Button>
				</Box>
			</Box>
		)}
	</MyPopup>
);

export default Modal;
