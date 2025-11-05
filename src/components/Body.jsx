// // import RestaurantCard from "./RestaurantCard";
// // import { useContext, useEffect, useState } from "react";
// // import Shimmer from "./Shimmer";
// // import { Link } from "react-router-dom";
// // import useOnlineStatus from "../utils/useOnlineStatus";
// // import { withVegLabel } from "./RestaurantCard";
// // import UserContext from "../utils/UserContext";

// // const Body = () => {
// //     const [listofRestaurants, setlistofRestaurants] = useState([]);
// //     const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
// //     const [searchtext, setsearchText] = useState("");

// //     const RestaurantCardVeg = withVegLabel(RestaurantCard);

// //     // console.log(listofRestaurants)

// //     useEffect(()=> {
// //         const fetchRestaurants = async() => {
// //         try { 
// //         const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458&lng=79.0882&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

// //         const json = await response.json();

// //         const restaurants = json?.data?.cards?.find((item) => item?.card?.card?.id?.includes("restaurant_grid_listing_v2"))?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
// //         setlistofRestaurants(restaurants);
// //         setFilteredRestaurants(restaurants);
// //     } catch (err){}
// //     } 
// //     fetchRestaurants();
// //     }, [])

// //     const onlinestatus = useOnlineStatus();

// //     if(onlinestatus == false) 
// //         return (
// //         <h1>
// //             Looks like you're offline! Please check your Internet Connection
// //         </h1>)

// //         const {loggedInUser, setuserName} = useContext(UserContext)

// //         return listofRestaurants.length == 0 ? <Shimmer /> : (
// //             <div className="body px-6 py-4 bg-gray-50 min-h-screen">
// //                 <div className="filter flex flex-wrap justify-between items-center bg-white shadow-md rounded-xl px-4 py-0 m-0 mb-6">
// //                     <div className="search flex items-center gap-2 m-2">
// //                         <input 
// //                         type="text" 
// //                         data-testid="searchInput"
// //                         className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-orange-400" 
// //                         value={searchtext}
// //                         onChange={(e)=>{
// //                             setsearchText(e.target.value)}}
// //                         />
// //                         <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
// //                             onClick={()=>{
// //                             console.log(searchtext)

// //                             const filteredResto = listofRestaurants.filter((res)=>{
// //                                 return res.info.name.toLowerCase().includes(searchtext.toLowerCase())
// //                             }) 
// //                             setFilteredRestaurants(filteredResto);
// //                         }}>Search</button>
// //                     </div>
// //                     <div className="search m-2 flex items-center">
// //                     <button className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors duration-200"
// //                     onClick= {() => {
// //                         const filteredLists = listofRestaurants.filter(
// //                             (res) => res.info.avgRating > 4.0
// //                         );
// //                         setFilteredRestaurants(filteredLists)
// //                     }}
// //                     >
// //                     Top Rated Restaurants
// //                     </button>
// //                     </div>

// //                     <div className="search m-2 flex items-center gap-2">
// //                         <label className="font-medium text-gray-700">Username: </label>
// //                         <input type="text" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" 
// //                         value={loggedInUser}
// //                         onChange={(e)=>setuserName(e.target.value)}/>
// //                     </div>

// //                 </div>

// //                 <div className="flex flex-wrap gap-1">
// //                     {FilteredRestaurants.map((restaurant) => (
// //                         <Link key={restaurant.info.id} to={"/restaurants/"+ restaurant.info.id}>
                            
// //                             {/* New */}
// //                             {restaurant.info.veg ? (
// //                                 <RestaurantCardVeg resData={restaurant}/>):
// //                             (<RestaurantCard resData={restaurant}/>)} 
// //                             </Link>
// //                     )) }
// //                 </div>
// //             </div>
// //         )
// //     }

// // export default Body;
// import RestaurantCard from "./RestaurantCard";
// import { useContext, useEffect, useState } from "react";
// import Shimmer from "./Shimmer";
// import { Link } from "react-router-dom";
// import useOnlineStatus from "../utils/useOnlineStatus";
// import { withVegLabel } from "./RestaurantCard";
// import UserContext from "../utils/UserContext";


// const Body = () => {
//     const [listofRestaurants, setlistofRestaurants] = useState([]);
//     const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
//     const [searchtext, setsearchText] = useState("");

//     const RestaurantCardVeg = withVegLabel(RestaurantCard);

//     useEffect(()=> {
//         const fetchRestaurants = async() => {
//         try { 
//         // ✅ Changed: Use your API route instead of direct Swiggy URL
//         const response = await fetch("/api/swiggy?lat=21.1458&lng=79.0882");

//         if (!response.ok) {
//             throw new Error('Failed to fetch restaurants');
//         }

//         const json = await response.json();

//         const restaurants = json?.data?.cards?.find((item) => item?.card?.card?.id?.includes("restaurant_grid_listing_v2"))?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
//         setlistofRestaurants(restaurants);
//         setFilteredRestaurants(restaurants);
//     } catch (err){
//         console.error('Error fetching restaurants:', err);
//     }
//     } 
//     fetchRestaurants();
//     }, [])

//     const onlinestatus = useOnlineStatus();

//     if(onlinestatus == false) 
//         return (
//         <h1>
//             Looks like you're offline! Please check your Internet Connection
//         </h1>)

//     const {loggedInUser, setuserName} = useContext(UserContext)

//     return listofRestaurants.length == 0 ? <Shimmer /> : (
//         <div className="body px-6 py-4 bg-gray-50 min-h-screen">
//             <div className="filter flex flex-wrap justify-between items-center bg-white shadow-md rounded-xl px-4 py-0 m-0 mb-6">
//                 <div className="search flex items-center gap-2 m-2">
//                     <input 
//                     type="text" 
//                     data-testid="searchInput"
//                     className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-orange-400" 
//                     value={searchtext}
//                     onChange={(e)=>{
//                         setsearchText(e.target.value)}}
//                     />
//                     <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
//                         onClick={()=>{
//                         console.log(searchtext)

//                         const filteredResto = listofRestaurants.filter((res)=>{
//                             return res.info.name.toLowerCase().includes(searchtext.toLowerCase())
//                         }) 
//                         setFilteredRestaurants(filteredResto);
//                     }}>Search</button>
//                 </div>
//                 <div className="search m-2 flex items-center">
//                 <button className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors duration-200"
//                 onClick= {() => {
//                     const filteredLists = listofRestaurants.filter(
//                         (res) => res.info.avgRating > 4.0
//                     );
//                     setFilteredRestaurants(filteredLists)
//                 }}
//                 >
//                 Top Rated Restaurants
//                 </button>
//                 </div>

//                 <div className="search m-2 flex items-center gap-2">
//                     <label className="font-medium text-gray-700">Username: </label>
//                     <input type="text" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" 
//                     value={loggedInUser}
//                     onChange={(e)=>setuserName(e.target.value)}/>
//                 </div>

//             </div>

//             <div className="flex flex-wrap gap-1">
//                 {FilteredRestaurants.map((restaurant) => (
//                     <Link key={restaurant.info.id} to={"/restaurants/"+ restaurant.info.id}>
                        
//                         {restaurant.info.veg ? (
//                             <RestaurantCardVeg resData={restaurant}/>):
//                         (<RestaurantCard resData={restaurant}/>)} 
//                         </Link>
//                 )) }
//             </div>
//         </div>
//     )
// }

// export default Body;

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
    const [isLoading, setIsLoading] = useState(false);
    const [nextOffset, setNextOffset] = useState(null); // ✅ Track pagination offset
    const [hasMore, setHasMore] = useState(true); // ✅ Track if more data available
    
    const [location, setLocation] = useState({ lat: 21.1458, lng: 79.0882, name: "Nagpur" });
    
    const locations = [
        { lat: 21.1458, lng: 79.0882, name: "Nagpur" },
        { lat: 28.7041, lng: 77.1025, name: "Delhi" },
        { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
        { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
        { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
        { lat: 13.0827, lng: 80.2707, name: "Chennai" },
        { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
        { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
    ];

    const RestaurantCardVeg = withVegLabel(RestaurantCard);

    useEffect(() => {
        // Reset when location changes
        setlistofRestaurants([]);
        setFilteredRestaurants([]);
        setNextOffset(null);
        setHasMore(true);
        fetchRestaurants();
    }, [location]);

    const fetchRestaurants = async(offset = null) => {
        try {
            setIsLoading(true);
            
            // Build URL with optional offset
            let url = `/api/swiggy?lat=${location.lat}&lng=${location.lng}`;
            if (offset) {
                url += `&nextOffset=${offset}`;
            }
            
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }

            const json = await response.json();

            // Extract restaurants
            const restaurantsCard = json?.data?.cards?.find((item) => 
                item?.card?.card?.id?.includes("restaurant_grid_listing")
            );
            
            const newRestaurants = restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            
            // Extract next offset for pagination
            const paginationCard = json?.data?.cards?.find((item) => 
                item?.card?.card?.id === "restaurant_grid_listing"
            );
            const newNextOffset = paginationCard?.card?.card?.gridElements?.nextOffset;
            
            if (offset) {
                // Append new restaurants to existing ones
                setlistofRestaurants(prev => [...prev, ...newRestaurants]);
                setFilteredRestaurants(prev => [...prev, ...newRestaurants]);
            } else {
                // Initial load - replace all
                setlistofRestaurants(newRestaurants);
                setFilteredRestaurants(newRestaurants);
            }
            
            // Update pagination state
            setNextOffset(newNextOffset);
            setHasMore(!!newNextOffset && newRestaurants.length > 0);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching restaurants:', err);
            setIsLoading(false);
            setHasMore(false);
        }
    };

    // ✅ Load More function - now with real pagination
    const loadMoreRestaurants = () => {
        if (nextOffset && !isLoading) {
            fetchRestaurants(nextOffset);
        }
    };

    const onlinestatus = useOnlineStatus();

    if (onlinestatus == false) 
        return (
            <h1>
                Looks like you're offline! Please check your Internet Connection
            </h1>
        );

    const { loggedInUser, setuserName } = useContext(UserContext);

    return listofRestaurants.length == 0 && isLoading ? <Shimmer /> : (
        <div className="body px-6 py-4 bg-gray-50 min-h-screen">
            <div className="filter flex flex-wrap justify-between items-center bg-white shadow-md rounded-xl px-4 py-0 m-0 mb-6">
                
                <div className="search m-2 flex items-center gap-2">
                    <label className="font-medium text-gray-700">📍 Location: </label>
                    <select 
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={locations.findIndex(loc => loc.name === location.name)}
                        onChange={(e) => {
                            const selected = locations[e.target.value];
                            setLocation(selected);
                        }}
                    >
                        {locations.map((loc, idx) => (
                            <option key={idx} value={idx}>{loc.name}</option>
                        ))}
                    </select>
                </div>

                <div className="search flex items-center gap-2 m-2">
                    <input 
                        type="text" 
                        data-testid="searchInput"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        value={searchtext}
                        onChange={(e) => {
                            setsearchText(e.target.value);
                        }}
                    />
                    <button 
                        className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
                        onClick={() => {
                            const filteredResto = listofRestaurants.filter((res) => {
                                return res.info.name.toLowerCase().includes(searchtext.toLowerCase());
                            });
                            setFilteredRestaurants(filteredResto);
                        }}
                    >
                        Search
                    </button>
                </div>

                <div className="search m-2 flex items-center">
                    <button 
                        className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors duration-200"
                        onClick={() => {
                            const filteredLists = listofRestaurants.filter(
                                (res) => res.info.avgRating > 4.0
                            );
                            setFilteredRestaurants(filteredLists);
                        }}
                    >
                        Top Rated Restaurants
                    </button>
                </div>

                <div className="search m-2 flex items-center gap-2">
                    <label className="font-medium text-gray-700">Username: </label>
                    <input 
                        type="text" 
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        value={loggedInUser}
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </div>
            </div>

            {/* Restaurant Cards */}
            <div className="flex flex-wrap gap-1">
                {FilteredRestaurants.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
                        {restaurant.info.veg ? (
                            <RestaurantCardVeg resData={restaurant}/>
                        ) : (
                            <RestaurantCard resData={restaurant}/>
                        )}
                    </Link>
                ))}
            </div>

            {/* Loading shimmer when fetching more */}
            {isLoading && <Shimmer />}

            {/* Load More Button - only show if there's more data */}
            {hasMore && !isLoading && FilteredRestaurants.length > 0 && (
                <div className="text-center mt-8 mb-4">
                    <button 
                        className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md"
                        onClick={loadMoreRestaurants}
                    >
                        Load More Restaurants 🍽️
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                        Showing {FilteredRestaurants.length} restaurants
                    </p>
                </div>
            )}

            {/* No more restaurants message */}
            {!hasMore && FilteredRestaurants.length > 0 && (
                <div className="text-center mt-8 mb-4">
                    <p className="text-gray-600 font-medium">
                        🎉 You've seen all restaurants in {location.name}!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Body;