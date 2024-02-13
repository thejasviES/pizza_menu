import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'

import MenuItem from './MenuItem'
import { useSelector } from 'react-redux'
function Menu() {
    const menu = useLoaderData()
    // console.log(menu)
    const cart = useSelector((state) => state.cart.cart)
    // console.log(cart)
    return (
        <ul className="divide-y divide-stone-300 px-2">
            {menu.map((pizza) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    )
}
export async function loader() {
    const menu = await getMenu()

    return menu
}
export default Menu
