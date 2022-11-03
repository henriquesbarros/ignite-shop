import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/future/image';
import { X } from 'phosphor-react';
import axios from "axios";
import { CartButton } from '../CartButton'
import {
	CartClose,
	CartContent,
	CartOrderSummary,
	CartOrderSummaryQuantity,
	CartOrderSummaryTotalPrice,
	CartProduct,
	CartProductDetails,
	CartProductImage,
	CartProducts,
	ContinueToPaymentButton
} from './styles'
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';

export const Cart = () => {
	const {cartItems = [], removeFromCart = () => {}} = useContext(CartContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

	const totalPrice = cartItems.reduce((orderTotal, currentCartItem) => {
		return orderTotal + currentCartItem.numberPrice
	}, 0)

  async function placeOrder() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<CartButton quantity={cartItems.length} />
			</Dialog.Trigger>
			<Dialog.Portal>
				<CartContent>
					<CartClose>
						<X size={24} weight="bold" />
					</CartClose>
					<h2>Sacola de compras</h2>
					<CartProducts>
						{cartItems.length > 0 ? (
							cartItems.map(cartItem => (
							<CartProduct key={cartItem.id}>
								<CartProductImage>
									<Image
										width={100}
										height={93}
										alt=""
										src={cartItem.imageUrl}
									/>
								</CartProductImage>
								<CartProductDetails>
									<p>{cartItem.name}</p>
									<strong>{cartItem.price}</strong>
									<button onClick={() => removeFromCart(cartItem.id)}>Remover</button>
								</CartProductDetails>
							</CartProduct>
							))
						) : <p>Parece que seu carrinho está vazio 😞</p>}
					</CartProducts>
					{cartItems.length > 0 && (
						<CartOrderSummary>
							<CartOrderSummaryQuantity>
								<p>Quantidade</p>
								<span>{cartItems.length} itens</span>
							</CartOrderSummaryQuantity>
							<CartOrderSummaryTotalPrice>
								<p>Valor total</p>
								<strong>R$ {totalPrice.toFixed(2)}</strong>
							</CartOrderSummaryTotalPrice>
						</CartOrderSummary>
					)}
					<ContinueToPaymentButton
						disabled={isCreatingCheckoutSession || cartItems.length <= 0}
						onClick={() => placeOrder()}
					>
						Continuar para o pagamento
					</ContinueToPaymentButton>
				</CartContent>
			</Dialog.Portal>
		</Dialog.Root>
	)
}