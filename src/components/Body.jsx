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
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
    
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

    // Different sorting options to get variety
    const sortOptions = [
        '', // Default
        'RELEVANCE',
        'DELIVERY_TIME',
        'RATING',
        'COST_FOR_TWO',
    ];

    const RestaurantCardVeg = withVegLabel(RestaurantCard);

    useEffect(() => {
        setlistofRestaurants([]);
        setFilteredRestaurants([]);
        setCurrentBatchIndex(0);
        fetchRestaurants();
    }, [location]);

    const fetchRestaurants = async(batchIndex = 0) => {
        try {
            setIsLoading(true);
            
            // Fetch with different sort to get variety
            const sortBy = sortOptions[batchIndex] || '';
            let url = `/api/swiggy?lat=${location.lat}&lng=${location.lng}`;
            if (sortBy) {
                url += `&sortBy=${sortBy}`;
            }
            
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }

            const json = await response.json();

            const restaurantsCard = json?.data?.cards?.find((item) => 
                item?.card?.card?.id?.includes("restaurant_grid_listing")
            );
            
            const newRestaurants = restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            
            if (batchIndex === 0) {
                // First load
                setlistofRestaurants(newRestaurants);
                setFilteredRestaurants(newRestaurants);
            } else {
                // Load more - remove duplicates
                setlistofRestaurants(prev => {
                    const existingIds = new Set(prev.map(r => r.info.id));
                    const uniqueNew = newRestaurants.filter(r => !existingIds.has(r.info.id));
                    return [...prev, ...uniqueNew];
                });
                setFilteredRestaurants(prev => {
                    const existingIds = new Set(prev.map(r => r.info.id));
                    const uniqueNew = newRestaurants.filter(r => !existingIds.has(r.info.id));
                    return [...prev, ...uniqueNew];
                });
            }
            
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching restaurants:', err);
            setIsLoading(false);
        }
    };

    const loadMoreRestaurants = () => {
        const nextBatch = currentBatchIndex + 1;
        if (nextBatch < sortOptions.length) {
            setCurrentBatchIndex(nextBatch);
            fetchRestaurants(nextBatch);
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

    const hasMoreToLoad = currentBatchIndex < sortOptions.length - 1;

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

            {/* Loading shimmer */}
            {isLoading && <Shimmer />}

            {/* Load More Button */}
            {hasMoreToLoad && !isLoading && FilteredRestaurants.length > 0 && (
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

            {/* End message */}
            {!hasMoreToLoad && FilteredRestaurants.length > 0 && !isLoading && (
                <div className="text-center mt-8 mb-4">
                    <p className="text-gray-600 font-medium">
                        ✨ Showing all available restaurants in {location.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Try changing location to see more restaurants
                    </p>
                </div>
            )}
        </div>
    );
};

export default Body;