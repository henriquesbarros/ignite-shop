import { useContext, useState } from "react";
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductsDetails } from "../../styles/pages/product";
import { CartContext } from "../../contexts/CartContext";

interface ProductProps {
	product: {
		id: string;
		name: string;
		imageUrl: string;
		price: string;
		numberPrice: number;
		description: string;
		defaultPriceId: string;
	}
}

export default function Product({ product }: ProductProps) {
	const {addToCart = () => {}, checkIfProductAlreadyExists = () => false} = useContext(CartContext)

	return (
		<>
		<Head>
			<title>{product.name} | Ignite Shop</title>
		</Head>
		<ProductContainer>
			<ImageContainer>
				<Image src={product.imageUrl} width={540} height={480} alt="" />
			</ImageContainer>
			<ProductsDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>

				<p>{product.description}</p>

				<button onClick={() => addToCart(product)} disabled={checkIfProductAlreadyExists(product.id)}>
					Colocar na sacola
				</button>
			</ProductsDetails>
		</ProductContainer>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
				numberPrice: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}