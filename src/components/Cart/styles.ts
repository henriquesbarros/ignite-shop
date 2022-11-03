import { styled } from "../../styles"
import * as Dialog from '@radix-ui/react-dialog'

export const CartContent = styled(Dialog.Content, {
	position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "30rem",
  background: "$gray800",
  padding: "3rem",
  paddingTop: "4.5rem",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
  display: "flex",
  flexDirection: "column",

	h2: {
		fontWeight: 700,
		fontSize: "$lg",
    color: "$gray100",
    marginBottom: "2rem",
	}
})

export const CartClose = styled(Dialog.Close, {
	background: "none",
	border: "none",
  color: "$gray500",
  position: "absolute",
  top: "1.75rem",
  right: "1.75rem",
	cursor: 'pointer',
})

export const CartProducts = styled('section', {
	display: "flex",
	flexDirection: "column",
	gap: "1.5rem",
	flex: 1,
  overflowY: "auto",
})

export const CartProduct = styled('div', {
	display: "flex",
	gap: "1.25rem",
})

export const CartProductImage = styled('div', {
  width: "6.3125rem",
  height: "5.8125rem",	
  background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
	borderRadius: 8,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	img: {
    objectFit: "cover",
  },
})

export const CartProductDetails = styled('div', {
	display: "flex",
	flexDirection: "column",
	height: "100%",

	p: {
		fontSize: "$md",
		color: "$gray300",
	},

	strong: {
		marginTop: 4,
		fontSize: "1.125rem",
    fontWeight: 700,
	},

	button: {
		marginTop: "auto",
		background: "none",
		border: "none",
		width: "max-content",
		color: "$green500",
		fontSize: "1rem",
		fontWeight: 700,
		cursor: "pointer",
		transition: "0.2s",

		"&:hover": {
			color: "$green300",
		}
	}
})

export const CartOrderSummary = styled("div", {
	display: "flex",
	flexDirection: "column",
	gap: "0.5rem",
})

export const CartOrderSummaryQuantity = styled("div", {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",

	span: {
		fontSize: "$md"
	}
})

export const CartOrderSummaryTotalPrice = styled("div", {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",

	p: {
		fontSize: "$md",
		fontWeight: 700
	},

	strong: {
		fontSize: "$xl"
	},
})

export const ContinueToPaymentButton = styled("button", {
	marginTop: "3.4375rem",
	background: "$green500",
	border: "none",
	width: "100%",
	height: "4.3125rem",
	textAlign: "center",
	color: "$white",
	fontWeight: 700,
	fontSize: "$md",
	borderRadius: 8,
	letterSpacing: 1,
	transition: "0.2s",
	cursor: "pointer",

	"&:disabled": {
		cursor: "not-allowed",
		opacity: 0.6
	},

	"&:not(:disabled):hover": {
		background: "$green300",
	}
})