import React, { useState } from 'react'
import ItemList from './ItemList'


const RestaurantCategory = ({data, showItems, setshowIndex, dummy}) => {
    // console.log(data)

    const handleClick = () =>{
        setshowIndex()
    }

  return (
    <div>
      {/* Header */}
        <div className='mx-auto w-6/12 my-4 bg-gray-50 shadow-lg p-4'>
            <div className='flex justify-between cursor-pointer' onClick={handleClick}>
                <span className='font-bold text-lg'>
                {data.title}  
                ({data.itemCards.length})</span>
                <span className='align-center'>🔽</span>
            </div>

        {/* Accordion Body */}
                { showItems && <ItemList items={data?.itemCards} dummy = {dummy}/>}
        </div>
      

    </div>
  )
}

export default RestaurantCategory
