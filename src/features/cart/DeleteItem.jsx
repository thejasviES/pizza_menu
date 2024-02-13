import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { deletItem } from './cartSlice'
function DeleteItem({ pizzaId }) {
    const dispatch = useDispatch()

    return (
        <Button type="small" onClick={() => dispatch(deletItem(pizzaId))}>
            Delete
        </Button>
    )
}

export default DeleteItem
