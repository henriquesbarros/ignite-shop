import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/future/image'
import Stripe from 'stripe'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '../lib/stripe'

import { HomeContainer, Product } from '../styles/pages/home'
import { CartButton } from '../components/CartButton'
import { MouseEvent, useContext } from 'react'
import { CartContext, IProduct } from '../contexts/CartContext'

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
	const {addToCart = () => {}, checkIfProductAlreadyExists = () => false} = useContext(CartContext)

	const [sliderRef] = useKeenSlider({
		slides: {
			perView: 3,
			spacing: 48,
		}
	})

	function handleAddToCart(event: MouseEvent<HTMLButtonElement>, product: IProduct) {
		event.preventDefault()
		addToCart(product)
	}

  return (
    <>
			<Head>
				<title>Home | Ignite Shop</title>
			</Head>
			<HomeContainer ref={sliderRef} className="keen-slider">
				{products.map(product => {
					return (
						<Link key={product.id} href={`/product/${product.id}`} prefetch={false} passHref>
							<Product
								className="keen-slider__slide"
							>
								<Image src={product.imageUrl} width={520} height={480} alt="" />

								<footer>
									<div>
										<strong>{product.name}</strong>
										<span>{product.price}</span>
									</div>
									<CartButton
										onClick={event => handleAddToCart(event, product)}
										disabled={checkIfProductAlreadyExists(product.id)}
										size="large" 
										color="green" 
									/>
								</footer>
							</Product>
						</Link>
					)
				})}
			</HomeContainer>		
		</>
  )
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await stripe.products.list({
		expand: ['data.default_price']
	})

	const products = response.data.map(product => {
		const price = product.default_price as Stripe.Price

		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat('pt-br', {
				style: 'currency',
				currency: 'BRL'
			}).format(price.unit_amount / 100),
			numberPrice: price.unit_amount / 100,
			description: product.description,
			defaultPriceId: price.id
		}
	})

	return {
		props: {
			products,
		},
		revalidate: 60 * 60 * 2, // 2 hours
	}
}
