import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/future/image';
import { X } from 'phosphor-react';
import { CartButton } from '../CartButton'
import { CartClose, CartContent, CartOrderSummary, CartOrderSummaryQuantity, CartOrderSummaryTotalPrice, CartProduct, CartProductDetails, CartProductImage, CartProducts, ContinueToPaymentButton } from './styles'
import shirtImage from '../../../public/camisa-rocketseat.png'

export const Cart = () => {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<CartButton quantity={3} />
			</Dialog.Trigger>
			<Dialog.Portal>
				<CartContent>
					<CartClose>
						<X size={24} weight="bold" />
					</CartClose>
					<h2>Sacola de compras</h2>
					<CartProducts>
						<CartProduct>
							<CartProductImage>
								<Image
									width={100}
									height={93}
									alt=""
									src={shirtImage}
								/>
							</CartProductImage>
							<CartProductDetails>
								<p>Camiseta Beyond the Limits</p>
								<strong>R$ 79,00</strong>
								<button>Remover</button>
							</CartProductDetails>
						</CartProduct>
						<CartProduct>
							<CartProductImage>
								<Image
									width={100}
									height={93}
									alt=""
									src={shirtImage}
								/>
							</CartProductImage>
							<CartProductDetails>
								<p>Camiseta Beyond the Limits</p>
								<strong>R$ 79,00</strong>
								<button>Remover</button>
							</CartProductDetails>
						</CartProduct>
						<CartProduct>
							<CartProductImage>
								<Image
									width={100}
									height={93}
									alt=""
									src={shirtImage}
								/>
							</CartProductImage>
							<CartProductDetails>
								<p>Camiseta Beyond the Limits</p>
								<strong>R$ 79,00</strong>
								<button>Remover</button>
							</CartProductDetails>
						</CartProduct>
					</CartProducts>
					<CartOrderSummary>
						<CartOrderSummaryQuantity>
							<p>Quantidade</p>
							<span>3 itens</span>
						</CartOrderSummaryQuantity>
						<CartOrderSummaryTotalPrice>
							<p>Valor total</p>
							<strong>R$ 270,00</strong>
						</CartOrderSummaryTotalPrice>
					</CartOrderSummary>
					<ContinueToPaymentButton>
						Continuar para o pagamento
					</ContinueToPaymentButton>
				</CartContent>
			</Dialog.Portal>
		</Dialog.Root>
	)
}