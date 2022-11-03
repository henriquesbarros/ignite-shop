import { createContext, ReactNode, useState } from "react";

interface CartContextProviderProps {
  children: ReactNode;
}

export interface IProduct {
	id: string;
	name: string;
	imageUrl: string;
	price: string;
	numberPrice: number;
	description: string;
	defaultPriceId: string;
}

interface CartContextData {
	cartItems: IProduct[];
	addToCart: (product: IProduct) => void;
	removeFromCart: (productId: string) => void;
	checkIfProductAlreadyExists: (productId: string) => boolean;
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({children}: CartContextProviderProps) {
	const [cartItems, setCartItems] = useState([])

	function addToCart(product) {
		setCartItems(cartItems => [...cartItems, product])
	}

	function removeFromCart(productId) {
		setCartItems(cartItems => cartItems.filter(cartItem => cartItem.id !== productId))
	}

	function checkIfProductAlreadyExists(productId) {
		const productAlreadyExists = cartItems.some(cartItem => productId === cartItem.id);

		return productAlreadyExists
	}

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				checkIfProductAlreadyExists
				}}
			>
			{children}
		</CartContext.Provider>
	)
}