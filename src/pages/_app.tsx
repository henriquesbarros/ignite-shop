import { useRouter } from "next/router";
import { AppProps } from "next/app"
import Image from 'next/future/image'
import { globalStyles } from "../styles/global"

import logoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app";
import { Cart } from "../components/Cart";
import { CartContextProvider } from "../contexts/CartContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter()

	const showCartButton = pathname !== '/success'

  return (
		<CartContextProvider>
			<Container>
				<Header>
					<Image src={logoImg} alt="" />
					{showCartButton && <Cart />}
				</Header>
				<Component {...pageProps} />
			</Container>
		</CartContextProvider>
	)
}
