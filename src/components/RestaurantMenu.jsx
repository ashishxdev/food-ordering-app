import Shimmer from './Shimmer';
import { useParams } from 'react-router';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';

const RestaurantMenu = () => {
    const { resId } = useParams();

    const resinfo = useRestaurantMenu(resId);

    const dummy = "Dummy Data";

    const [showIndex, setshowIndex] = useState(null)
    
    if (resinfo === null) {
        return <Shimmer />;
    }
    const { name, cuisines, costForTwoMessage } = resinfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resinfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card.card;

    const categories = resinfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=> c.card?.["card"]?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    return (
    <div className='text-center'>
      <h1 className='font-bold my-6 text-2xl'>{name}</h1>
      <p className='font-bold text-lg'>{cuisines.join(", ")} - Rs.{costForTwoMessage}</p>

      {categories.map((category, index)=>
        <RestaurantCategory 
          key={category?.card?.card?.title} 
          data={category?.card?.card}
          showItems={index == showIndex ? true : false} 
          setshowIndex = {() => setshowIndex(index)}
          dummy = {dummy}
      />)}
    </div>
  )
}

export default RestaurantMenu;
