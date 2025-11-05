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
//     const [isLoading, setIsLoading] = useState(false);
//     const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
    
//     const [location, setLocation] = useState({ lat: 28.7041, lng: 77.1025, name: "Delhi" });
//     const [customCity, setCustomCity] = useState("");
//     const [isSearchingLocation, setIsSearchingLocation] = useState(false);
    
//     const popularLocations = [
//         { lat: 21.1458, lng: 79.0882, name: "Nagpur" },
//         { lat: 28.7041, lng: 77.1025, name: "Delhi" },
//         { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
//         { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
//         { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
//         { lat: 13.0827, lng: 80.2707, name: "Chennai" },
//         { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
//         { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
//     ];

//     const sortOptions = ['', 'RELEVANCE', 'DELIVERY_TIME', 'RATING', 'COST_FOR_TWO'];
//     const RestaurantCardVeg = withVegLabel(RestaurantCard);

//     useEffect(() => {
//         setlistofRestaurants([]);
//         setFilteredRestaurants([]);
//         setCurrentBatchIndex(0);
//         fetchRestaurants();
//     }, [location]);

//     const useCurrentLocation = () => {
//         if (navigator.geolocation) {
//             setIsSearchingLocation(true);
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation({
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude,
//                         name: "Your Location"
//                     });
//                     setIsSearchingLocation(false);
//                 },
//                 (error) => {
//                     console.error("Error getting location:", error);
//                     alert("Could not get your location. Please enable location access.");
//                     setIsSearchingLocation(false);
//                 }
//             );
//         } else {
//             alert("Geolocation is not supported by your browser.");
//         }
//     };

//     const searchCustomLocation = async () => {
//         if (!customCity.trim()) return;
        
//         setIsSearchingLocation(true);
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(customCity)},India&format=json&limit=1`
//             );
//             const data = await response.json();
            
//             if (data && data.length > 0) {
//                 const { lat, lon, display_name } = data[0];
//                 setLocation({
//                     lat: parseFloat(lat),
//                     lng: parseFloat(lon),
//                     name: customCity.charAt(0).toUpperCase() + customCity.slice(1)
//                 });
//                 setCustomCity("");
//             } else {
//                 alert("Location not found! Please try another city.");
//             }
//         } catch (error) {
//             console.error("Error searching location:", error);
//             alert("Failed to search location. Please try again.");
//         } finally {
//             setIsSearchingLocation(false);
//         }
//     };

//     const fetchRestaurants = async(batchIndex = 0) => {
//         try {
//             setIsLoading(true);
            
//             const sortBy = sortOptions[batchIndex] || '';
//             let url = `/api/swiggy?lat=${location.lat}&lng=${location.lng}`;
//             if (sortBy) {
//                 url += `&sortBy=${sortBy}`;
//             }
            
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch restaurants');
//             }

//             const json = await response.json();
//             const restaurantsCard = json?.data?.cards?.find((item) => 
//                 item?.card?.card?.id?.includes("restaurant_grid_listing")
//             );
            
//             const newRestaurants = restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            
//             if (batchIndex === 0) {
//                 setlistofRestaurants(newRestaurants);
//                 setFilteredRestaurants(newRestaurants);
//             } else {
//                 setlistofRestaurants(prev => {
//                     const existingIds = new Set(prev.map(r => r.info.id));
//                     const uniqueNew = newRestaurants.filter(r => !existingIds.has(r.info.id));
//                     return [...prev, ...uniqueNew];
//                 });
//                 setFilteredRestaurants(prev => {
//                     const existingIds = new Set(prev.map(r => r.info.id));
//                     const uniqueNew = newRestaurants.filter(r => !existingIds.has(r.info.id));
//                     return [...prev, ...uniqueNew];
//                 });
//             }
            
//             setIsLoading(false);
//         } catch (err) {
//             console.error('Error fetching restaurants:', err);
//             setIsLoading(false);
//         }
//     };

//     const loadMoreRestaurants = () => {
//         const nextBatch = currentBatchIndex + 1;
//         if (nextBatch < sortOptions.length) {
//             setCurrentBatchIndex(nextBatch);
//             fetchRestaurants(nextBatch);
//         }
//     };

//     const onlinestatus = useOnlineStatus();
//     if (onlinestatus == false) 
//         return (
//             <h1>
//                 Looks like you're offline! Please check your Internet Connection
//             </h1>
//         );

//     const { loggedInUser, setuserName } = useContext(UserContext);
//     const hasMoreToLoad = currentBatchIndex < sortOptions.length - 1;

//     return listofRestaurants.length == 0 && isLoading ? <Shimmer /> : (
//         <div className="body px-6 py-4 bg-gray-50 min-h-screen">
//             <div className="filter flex flex-wrap justify-between items-center bg-white shadow-md rounded-xl px-4 py-0 m-0 mb-6">
                
//                 <div className="search m-2 flex items-center gap-2">
//                     <label className="font-medium text-gray-700">📍 Popular: </label>
//                     <select 
//                         className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                         value={popularLocations.findIndex(loc => loc.name === location.name)}
//                         onChange={(e) => {
//                             const selected = popularLocations[e.target.value];
//                             setLocation(selected);
//                         }}
//                     >
//                         {popularLocations.map((loc, idx) => (
//                             <option key={idx} value={idx}>{loc.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="search m-2 flex items-center gap-2">
//                     <input 
//                         type="text" 
//                         placeholder="Enter any city..."
//                         className="border border-gray-300 rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         value={customCity}
//                         onChange={(e) => setCustomCity(e.target.value)}
//                         onKeyPress={(e) => {
//                             if (e.key === 'Enter') searchCustomLocation();
//                         }}
//                     />
//                     <button 
//                         className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
//                         onClick={searchCustomLocation}
//                         disabled={isSearchingLocation}
//                     >
//                         {isSearchingLocation ? '🔄' : '🔍'}
//                     </button>
//                 </div>

//                 <div className="search m-2">
//                     <button 
//                         className="px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center gap-2"
//                         onClick={useCurrentLocation}
//                         disabled={isSearchingLocation}
//                     >
//                         📍 Use My Location
//                     </button>
//                 </div>

//                 <div className="search flex items-center gap-2 m-2">
//                     <input 
//                         type="text" 
//                         data-testid="searchInput"
//                         placeholder="Search restaurants..."
//                         className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-orange-400" 
//                         value={searchtext}
//                         onChange={(e) => {
//                             setsearchText(e.target.value);
//                         }}
//                     />
//                     <button 
//                         className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
//                         onClick={() => {
//                             const filteredResto = listofRestaurants.filter((res) => {
//                                 return res.info.name.toLowerCase().includes(searchtext.toLowerCase());
//                             });
//                             setFilteredRestaurants(filteredResto);
//                         }}
//                     >
//                         Search
//                     </button>
//                 </div>

//                 <div className="search m-2 flex items-center">
//                     <button 
//                         className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors duration-200"
//                         onClick={() => {
//                             const filteredLists = listofRestaurants.filter(
//                                 (res) => res.info.avgRating > 4.0
//                             );
//                             setFilteredRestaurants(filteredLists);
//                         }}
//                     >
//                         Top Rated Restaurants
//                     </button>
//                 </div>

//                 <div className="search m-2 flex items-center gap-2">
//                     <label className="font-medium text-gray-700">Username: </label>
//                     <input 
//                         type="text" 
//                         className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" 
//                         value={loggedInUser}
//                         onChange={(e) => setuserName(e.target.value)}
//                     />
//                 </div>
//             </div>

//             <div className="text-center mb-4">
//                 <p className="text-gray-600">
//                     📍 Showing restaurants in <span className="font-semibold text-orange-600">{location.name}</span>
//                 </p>
//             </div>

//             <div className="flex flex-wrap gap-1">
//                 {FilteredRestaurants.map((restaurant) => (
//                     <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
//                         {restaurant.info.veg ? (
//                             <RestaurantCardVeg resData={restaurant}/>
//                         ) : (
//                             <RestaurantCard resData={restaurant}/>
//                         )}
//                     </Link>
//                 ))}
//             </div>

//             {isLoading && <Shimmer />}

//             {hasMoreToLoad && !isLoading && FilteredRestaurants.length > 0 && (
//                 <div className="text-center mt-8 mb-4">
//                     <button 
//                         className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md"
//                         onClick={loadMoreRestaurants}
//                     >
//                         Load More Restaurants 🍽️
//                     </button>
//                     <p className="text-sm text-gray-500 mt-2">
//                         Showing {FilteredRestaurants.length} restaurants
//                     </p>
//                 </div>
//             )}

//             {!hasMoreToLoad && FilteredRestaurants.length > 0 && !isLoading && (
//                 <div className="text-center mt-8 mb-4">
//                     <p className="text-gray-600 font-medium">
//                         ✨ Showing all available restaurants in {location.name}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                         Try searching another city
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

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
    
    const [location, setLocation] = useState({ lat: 28.7041, lng: 77.1025, name: "Delhi" });
    const [customCity, setCustomCity] = useState("");
    const [isSearchingLocation, setIsSearchingLocation] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    
    const popularLocations = [
        { lat: 21.1458, lng: 79.0882, name: "Nagpur" },
        { lat: 28.7041, lng: 77.1025, name: "Delhi" },
        { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
        { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
        { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
        { lat: 13.0827, lng: 80.2707, name: "Chennai" },
        { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
        { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
    ];

    const sortOptions = ['', 'RELEVANCE', 'DELIVERY_TIME', 'RATING', 'COST_FOR_TWO'];
    const RestaurantCardVeg = withVegLabel(RestaurantCard);

    useEffect(() => {
        setlistofRestaurants([]);
        setFilteredRestaurants([]);
        setCurrentBatchIndex(0);
        fetchRestaurants();
    }, [location]);

    const useCurrentLocation = () => {
        if (navigator.geolocation) {
            setIsSearchingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        name: "Your Location"
                    });
                    setIsSearchingLocation(false);
                    setShowLocationModal(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Could not get your location. Please enable location access.");
                    setIsSearchingLocation(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const searchCustomLocation = async () => {
        if (!customCity.trim()) return;
        
        setIsSearchingLocation(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(customCity)},India&format=json&limit=1`
            );
            const data = await response.json();
            
            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                setLocation({
                    lat: parseFloat(lat),
                    lng: parseFloat(lon),
                    name: customCity.charAt(0).toUpperCase() + customCity.slice(1)
                });
                setCustomCity("");
                setShowLocationModal(false);
            } else {
                alert("Location not found! Please try another city.");
            }
        } catch (error) {
            console.error("Error searching location:", error);
            alert("Failed to search location. Please try again.");
        } finally {
            setIsSearchingLocation(false);
        }
    };

    const fetchRestaurants = async(batchIndex = 0) => {
        try {
            setIsLoading(true);
            
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
                setlistofRestaurants(newRestaurants);
                setFilteredRestaurants(newRestaurants);
            } else {
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
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <div className="text-6xl mb-4">📡</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">You're Offline</h1>
                    <p className="text-gray-600">Please check your internet connection</p>
                </div>
            </div>
        );

    const { loggedInUser } = useContext(UserContext);
    const hasMoreToLoad = currentBatchIndex < sortOptions.length - 1;

    return listofRestaurants.length == 0 && isLoading ? <Shimmer /> : (
        <div className="body px-3 sm:px-6 py-4 bg-gray-50 min-h-screen">
            {/* Filter Bar */}
            <div className="filter bg-white shadow-md rounded-xl px-3 sm:px-4 py-4 mb-6">
                {/* Location & Search Row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    {/* Location Selector Button */}
                    <button 
                        onClick={() => setShowLocationModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
                    >
                        <span className="text-lg">📍</span>
                        <span className="font-medium">{location.name}</span>
                        <span className="text-sm">▼</span>
                    </button>

                    {/* Restaurant Search */}
                    <div className="flex items-center gap-2 flex-1">
                        <input 
                            type="text" 
                            data-testid="searchInput"
                            placeholder="Search restaurants..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" 
                            value={searchtext}
                            onChange={(e) => setsearchText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    const filteredResto = listofRestaurants.filter((res) => {
                                        return res.info.name.toLowerCase().includes(searchtext.toLowerCase());
                                    });
                                    setFilteredRestaurants(filteredResto);
                                }
                            }}
                        />
                        <button 
                            className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 whitespace-nowrap"
                            onClick={() => {
                                const filteredResto = listofRestaurants.filter((res) => {
                                    return res.info.name.toLowerCase().includes(searchtext.toLowerCase());
                                });
                                setFilteredRestaurants(filteredResto);
                            }}
                        >
                            🔍
                        </button>
                    </div>
                </div>

                {/* Filter Buttons Row */}
                <div className="flex flex-wrap gap-2">
                    <button 
                        className="px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors duration-200 border border-green-200"
                        onClick={() => {
                            const filteredLists = listofRestaurants.filter(
                                (res) => res.info.avgRating > 4.0
                            );
                            setFilteredRestaurants(filteredLists);
                        }}
                    >
                        ⭐ Top Rated
                    </button>

                    <button 
                        className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
                        onClick={() => {
                            setFilteredRestaurants(listofRestaurants);
                            setsearchText("");
                        }}
                    >
                        🔄 Reset Filters
                    </button>
                </div>
            </div>

            {/* Location Modal */}
            {showLocationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Choose Location</h2>
                            <button 
                                onClick={() => setShowLocationModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Use Current Location */}
                            <button 
                                className="w-full px-4 py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                onClick={useCurrentLocation}
                                disabled={isSearchingLocation}
                            >
                                {isSearchingLocation ? '🔄 Detecting...' : '📍 Use My Current Location'}
                            </button>

                            {/* Custom City Search */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Or Search City</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Enter city name..."
                                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={customCity}
                                        onChange={(e) => setCustomCity(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') searchCustomLocation();
                                        }}
                                    />
                                    <button 
                                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                        onClick={searchCustomLocation}
                                        disabled={isSearchingLocation}
                                    >
                                        {isSearchingLocation ? '🔄' : '🔍'}
                                    </button>
                                </div>
                            </div>

                            {/* Popular Cities */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Popular Cities</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {popularLocations.map((loc, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setLocation(loc);
                                                setShowLocationModal(false);
                                            }}
                                            className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                                                location.name === loc.name
                                                    ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                                                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                                            }`}
                                        >
                                            {loc.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Current Location Display */}
            <div className="text-center mb-6">
                <p className="text-gray-600 text-sm sm:text-base">
                    📍 Showing restaurants in <span className="font-semibold text-orange-600">{location.name}</span>
                </p>
            </div>

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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

            {/* Loading Shimmer */}
            {isLoading && <Shimmer />}

            {/* Load More Button */}
            {hasMoreToLoad && !isLoading && FilteredRestaurants.length > 0 && (
                <div className="text-center mt-8 mb-4">
                    <button 
                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={loadMoreRestaurants}
                    >
                        Load More Restaurants 🍽️
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                        Showing {FilteredRestaurants.length} restaurants
                    </p>
                </div>
            )}

            {/* End of Results */}
            {!hasMoreToLoad && FilteredRestaurants.length > 0 && !isLoading && (
                <div className="text-center mt-8 mb-4">
                    <p className="text-gray-600 font-medium">
                        ✨ Showing all available restaurants in {location.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Try searching another city
                    </p>
                </div>
            )}

            {/* No Results */}
            {FilteredRestaurants.length === 0 && !isLoading && listofRestaurants.length > 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No restaurants found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                    <button 
                        className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
                        onClick={() => {
                            setFilteredRestaurants(listofRestaurants);
                            setsearchText("");
                        }}
                    >
                        Clear Search
                    </button>
                </div>
            )}
        </div>
    );
};

export default Body;