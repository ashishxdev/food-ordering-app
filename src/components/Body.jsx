import RestaurantCard from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withVegLabel } from "./RestaurantCard";
import UserContext from "../utils/UserContext";

const Body = () => {
    const [listofRestaurants, setlistofRestaurants] = useState([]);
    const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchtext, setsearchText] = useState("");

    const RestaurantCardVeg = withVegLabel(RestaurantCard);

    // console.log(listofRestaurants)

    useEffect(()=> {
        const fetchRestaurants = async() => {
        try { 
        const response = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458&lng=79.0882&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await response.json();

        const restaurants = json?.data?.cards?.find((item) => item?.card?.card?.id?.includes("restaurant_grid_listing_v2"))?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setlistofRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
    } catch (err){}
    } 
    fetchRestaurants();
    }, [])

    const onlinestatus = useOnlineStatus();

    if(onlinestatus == false) 
        return (
        <h1>
            Looks like you're offline! Please check your Internet Connection
        </h1>)

        const {loggedInUser, setuserName} = useContext(UserContext)

        return listofRestaurants.length == 0 ? <Shimmer /> : (
            <div className="body px-6 py-4 bg-gray-50 min-h-screen">
                <div className="filter flex flex-wrap justify-between items-center bg-white shadow-md rounded-xl px-4 py-0 m-0 mb-6">
                    <div className="search flex items-center gap-2 m-2">
                        <input 
                        type="text" 
                        data-testid="searchInput"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        value={searchtext}
                        onChange={(e)=>{
                            setsearchText(e.target.value)}}
                        />
                        <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
                            onClick={()=>{
                            console.log(searchtext)

                            const filteredResto = listofRestaurants.filter((res)=>{
                                return res.info.name.toLowerCase().includes(searchtext.toLowerCase())
                            }) 
                            setFilteredRestaurants(filteredResto);
                        }}>Search</button>
                    </div>
                    <div className="search m-2 flex items-center">
                    <button className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors duration-200"
                    onClick= {() => {
                        const filteredLists = listofRestaurants.filter(
                            (res) => res.info.avgRating > 4.0
                        );
                        setFilteredRestaurants(filteredLists)
                    }}
                    >
                    Top Rated Restaurants
                    </button>
                    </div>

                    <div className="search m-2 flex items-center gap-2">
                        <label className="font-medium text-gray-700">Username: </label>
                        <input type="text" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        value={loggedInUser}
                        onChange={(e)=>setuserName(e.target.value)}/>
                    </div>

                </div>

                <div className="flex flex-wrap gap-1">
                    {FilteredRestaurants.map((restaurant) => (
                        <Link key={restaurant.info.id} to={"/restaurants/"+ restaurant.info.id}>
                            
                            {/* New */}
                            {restaurant.info.veg ? (
                                <RestaurantCardVeg resData={restaurant}/>):
                            (<RestaurantCard resData={restaurant}/>)} 
                            </Link>
                    )) }
                </div>
            </div>
        )
    }

export default Body;