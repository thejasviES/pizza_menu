import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

function UpdateQuantity({ pizzaId }) {
    const dispatch = useDispatch()

    const pizzas = useSelector((state) =>
        state.cart.cart.filter((obj) => obj.pizzaId === pizzaId)
    )

    return (
        <div
            className="flex items-center
        gap-1 md:gap-3"
        >
            <Button
                type="round"
                onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
            >
                -
            </Button>
            <p>{pizzas[0].quantity}</p>
            <Button
                type="round"
                onClick={() => dispatch(increaseItemQuantity(pizzaId))}
            >
                +
            </Button>
        </div>
    )
}

export default UpdateQuantity
