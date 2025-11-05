import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemList from './ItemList'
import { clearCart, removeItem } from '../utils/cartSlice'
import Shimmer from './Shimmer'

const Cart = () => {

    const cartItems = useSelector((store)=> store.cart.items)
    const [isCartLoading, setIsCartLoading] = useState(true)

    const dispatch = useDispatch()
    const handleClearCart = () => {
        dispatch(clearCart())
    }

    useEffect(()=>{
      const t = setTimeout(()=> setIsCartLoading(false), 300)
      return () => clearTimeout(t)
    }, [])

  return (
    <div className='text-center px-3 sm:px-4 py-4 m-0 sm:m-4'>
      <h1 className='text-2xl font-bold mb-3 sm:mb-4'>Cart</h1>
        <div className='w-full max-w-2xl sm:max-w-3xl m-auto text-left'>
        <div className='flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between'>
          <button className='p-2 sm:px-4 sm:py-2 bg-black text-white rounded-lg w-full sm:w-auto'
          onClick={handleClearCart}
          >Clear Cart</button>
          {cartItems.length > 0 && (
            <div className='text-sm text-gray-600'>Items: <span className='font-semibold'>{cartItems.length}</span></div>
          )}
        </div>
        {isCartLoading ? (
          <div className='mt-3 sm:mt-4'><Shimmer /></div>
        ) : cartItems.length == 0 ? (
          <h2 className='mt-3 sm:mt-4 text-gray-700'>Cart is empty. Add items to the cart!</h2>
        ) : null}
        <div className='mt-3 sm:mt-4'>
          <ItemList items={cartItems}/>
        </div>
        </div>
    </div>
  )
}

export default Cart
