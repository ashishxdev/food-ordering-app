import React, { useState } from 'react'
import ItemList from './ItemList'

const RestaurantCategory = ({data, showItems, setshowIndex, dummy}) => {
    // console.log(data)

    const handleClick = () =>{
        setshowIndex()
    }

  return (
    <div>
        <div className='mx-auto w-full max-w-xl sm:max-w-2xl my-4 bg-gray-50 shadow-lg p-3 sm:p-4 rounded-lg'>
            <div className='flex justify-between items-center cursor-pointer' onClick={handleClick}>
                <span className='font-bold text-lg'>
                {data.title}  
                ({data.itemCards.length})</span>
                <span className='align-center'>🔽</span>
            </div>
              { showItems && <ItemList items={data?.itemCards} dummy = {dummy}/>}
        </div>
      

    </div>
  )
}

export default RestaurantCategory
