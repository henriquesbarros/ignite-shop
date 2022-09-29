import * as Dialog from '@radix-ui/react-dialog'
import { CartButton } from '../CartButton'

export const Cart = () => {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<CartButton quantity={2} />
			</Dialog.Trigger>
		</Dialog.Root>
	)
}