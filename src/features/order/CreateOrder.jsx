import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from '../cart/EmptyCart'
import store from '../../store'
import { clearCart, getTotalCartPrice } from '../cart/cartSlice'
import { fetchAddress } from '../user/userSlice'
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

function CreateOrder() {
    const cart = useSelector((state) => state.cart.cart)
    const [withPriority, setWithPriority] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const {
        username,
        status: addressStatus,
        position,
        address,
        error: errorAddress,
    } = useSelector((state) => state.user)
    const isLoadingAddress = addressStatus === 'loading'
    console.log(address)
    let totalCartPrice = useSelector(getTotalCartPrice)
    const formErrors = useActionData()
    console.log(withPriority)
    if (withPriority)
        totalCartPrice = totalCartPrice + (totalCartPrice / 100) * 20
    if (cart.length === 0) return <EmptyCart></EmptyCart>
    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold ">
                Ready to order Let go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex  flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        required
                        defaultValue={username}
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-200 p-2 text-xs  text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="w-full  rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-200 placeholder:text-stone-400 focus:outline-none  focus:ring focus:ring-yellow-400  md:px-6 md:py-3"
                            type="text"
                            name="address"
                            required
                            defaultValue={address}
                            disabled={isLoadingAddress}
                        />
                        {addressStatus === 'error' && (
                            <p className="mt-2 rounded-md bg-red-200 p-2 text-xs  text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>
                    {!position.latitude && !position.longitude && (
                        <span className="smright-[3px]  :top-[3px] absolute right-[3px]   z-50 sm:top-[3px]">
                            <Button
                                disabled={isLoadingAddress}
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(fetchAddress())
                                }}
                            >
                                get position
                            </Button>
                        </span>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className=" h-6 w-6  accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        onChange={(e) => setWithPriority(!withPriority)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.latitude
                                ? `${position.latitude},${position.longitude}`
                                : ''
                        }
                    ></input>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    ></input>
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting
                            ? 'placing order..'
                            : `$${totalCartPrice} ordernow`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    console.log(data)

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'on',
    }

    const errors = {}
    if (!isValidPhone(data.phone)) errors.phone = 'Invalid phone number'

    if (Object.keys(errors).length > 0) return errors

    const newOrder = await createOrder(order)
    store.dispatch(clearCart())
    return redirect(`/order/${newOrder.id}`)
}
export default CreateOrder
