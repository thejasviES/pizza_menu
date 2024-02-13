import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import DeleteItem from './DeleteItem'
import UpdateQuantity from './UpdateQuantity'

function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item
    const dispatch = useDispatch()
    function handleDelete(e) {
        e.preventDefault()

        console.log(e)
    }
    if (quantity === 0) return null
    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex items-center justify-between sm:gap-6">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateQuantity pizzaId={pizzaId}></UpdateQuantity>
                <DeleteItem pizzaId={pizzaId}></DeleteItem>
            </div>
        </li>
    )
}

export default CartItem
