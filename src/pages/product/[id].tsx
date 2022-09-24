import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import axios from "axios";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductsDetails } from "../../styles/pages/product";

interface ProductProps {
	product: {
		id: string;
		name: string;
		imageUrl: string;
		price: string;
		description: string;
		defaultPriceId: string;
	}
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

	return (
		<ProductContainer>
			<ImageContainer>
				<Image src={product.imageUrl} width={540} height={480} alt="" />
			</ImageContainer>
			<ProductsDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>

				<p>{product.description}</p>

				<button onClick={handleBuyButton} disabled={isCreatingCheckoutSession}>
					Comprar agora
				</button>
			</ProductsDetails>
		</ProductContainer>
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
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}