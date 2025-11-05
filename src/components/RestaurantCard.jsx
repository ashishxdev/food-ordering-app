import { CDN_URL } from "../utils/constant"; 
import UserContext from "../utils/UserContext";
import { useContext } from "react";

const RestaurantCard = (props) => {
    const { resData } = props;
    // console.log(resData)

    const {loggedInUser} = useContext(UserContext)

    const {name,cuisines,avgRating,costForTwo,} = resData?.info;
    const {deliveryTime} = resData?.info.sla;

    return (
        <div 
        data-testid = "resCard"
        className="m-3 sm:m-4 w-full sm:w-[240px] bg-white rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
            <img className="rounded-t-2xl w-full object-cover p-0 h-40 sm:h-[250px]" alt="res-logo" src={CDN_URL + resData.info.cloudinaryImageId}/>

            <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-800 truncate">{name}</h3>
            <h4 className="text-sm text-gray-600">{cuisines.join(", ")}</h4>

            <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
            <span className="font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-lg">{avgRating} ⭐️</span>
            <span className="text-gray-600">{costForTwo}</span>
            </div>

            <h4 className="mt-1 text-gray-500 text-sm">{deliveryTime} Minutes</h4>
            </div>
        </div>
    )
}
    export const withVegLabel = (RestaurantCard) =>{
        return (props)=>{
            return (
                <div className="relative group">
                    <span className="absolute top-0 left-4 z-20 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow-md tracking-wide">Vegeterian</span>
                    
                    <div className="transform transition-transform duration-300">
                    <RestaurantCard {...props}/>
                    </div>
                </div>
            )
        }
    }

export default RestaurantCard;