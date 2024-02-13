import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

function UpdateOrder({ order }) {
    const fecther = useFetcher()

    console.log(order)

    return (
        <fecther.Form method="PATCH" className='"text-right'>
            <Button type="primary">make Priority</Button>
        </fecther.Form>
    )
}
export default UpdateOrder
export async function action({ request, params }) {
    console.log()

    const data = { priority: true }

    await updateOrder(params.orderId, data)
    return null
}
