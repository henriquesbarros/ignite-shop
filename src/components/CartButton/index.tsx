import { Handbag } from "phosphor-react"
import { CartButtonContainer } from "./styles"

interface CartButtonProps {
	quantity: number
}

export const CartButton = ({quantity = 0, ...rest}: CartButtonProps) => {
	return (
		<CartButtonContainer {...rest}>
      {quantity > 0 && <span>{quantity}</span>}
      <Handbag weight="bold" size={24} />			
		</CartButtonContainer>
	)
}