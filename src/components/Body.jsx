import RestaurantCard from "./RestaurantCard";
import { useContext, useEffect, useRef, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withVegLabel } from "./RestaurantCard";
import UserContext from "../utils/UserContext";
import { SWIGGY_DIRECT_API } from "../utils/constant";

const Body = () => {
    const [listofRestaurants, setlistofRestaurants] = useState([]);
    const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchtext, setsearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
    
    const [location, setLocation] = useState({ lat: 28.7041, lng: 77.1025, name: "Delhi" });
    const [customCity, setCustomCity] = useState("");
    const [isSearchingLocation, setIsSearchingLocation] = useState(false);
    const activeAbortControllerRef = useRef(null);
    const activeRequestIdRef = useRef(0);
    
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
        // cancel any in-flight request for previous location
        if (activeAbortControllerRef.current) {
            try { activeAbortControllerRef.current.abort(); } catch (_) {}
        }
        // bump request id so late responses are ignored
        activeRequestIdRef.current += 1;
        const requestId = activeRequestIdRef.current;

        // reset lists and search when location changes
        setlistofRestaurants([]);
        setFilteredRestaurants([]);
        setsearchText("");
        setCurrentBatchIndex(0);
        fetchRestaurants(0, requestId);

        return () => {
            // ensure request is aborted on unmount or before next effect run
            if (activeAbortControllerRef.current) {
                try { activeAbortControllerRef.current.abort(); } catch (_) {}
            }
        };
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

    const fetchRestaurants = async(batchIndex = 0, requestId = activeRequestIdRef.current) => {
        try {
            setIsLoading(true);
            
            const sortBy = sortOptions[batchIndex] || '';
            const apiBaseOverride = (typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost')
                ? (localStorage.getItem('apiBase') || '')
                : '';
            let urlProxy = `${apiBaseOverride}/api/swiggy?lat=${location.lat}&lng=${location.lng}`;
            if (sortBy) {
                urlProxy += `&sortBy=${sortBy}`;
            }

            const directParams = `lat=${location.lat}&lng=${location.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING${sortBy ? `&sortBy=${sortBy}` : ''}`;
            const urlDirect = `${SWIGGY_DIRECT_API}?${directParams}`;

            const abortController = new AbortController();
            activeAbortControllerRef.current = abortController;
            // Try proxy first; if it fails in dev, fallback to direct API
            let response;
            try {
                response = await fetch(urlProxy, { signal: abortController.signal });
                if (!response.ok) {
                    throw new Error('Proxy fetch failed');
                }
                const ct = response.headers.get('content-type') || '';
                if (!ct.includes('application/json')) {
                    throw new Error('Proxy returned non-JSON');
                }
            } catch (proxyErr) {
                // If request was aborted, rethrow to be handled below
                if (proxyErr && proxyErr.name === 'AbortError') throw proxyErr;
                response = await fetch(urlDirect, { signal: abortController.signal });
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurants');
                }
                const ct2 = response.headers.get('content-type') || '';
                if (!ct2.includes('application/json')) {
                    throw new Error('Direct API returned non-JSON');
                }
            }

            const json = await response.json();
            const restaurantsCard = json?.data?.cards?.find((item) => 
                item?.card?.card?.id?.includes("restaurant_grid_listing")
            );
            
            const newRestaurants = restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            
            // ignore late/stale responses
            if (requestId !== activeRequestIdRef.current) {
                return;
            }

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
            if (err && err.name === 'AbortError') {
                return;
            }
            console.error('Error fetching restaurants:', err);
            // only update loading if this is the active request
            if (requestId === activeRequestIdRef.current) {
                setIsLoading(false);
                if (typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost') {
                    alert('Failed to load restaurants locally. Set localStorage.apiBase to your deployed domain (e.g., https://your-app.vercel.app) and reload.');
                }
            }
        }
    };

    const loadMoreRestaurants = () => {
        const nextBatch = currentBatchIndex + 1;
        if (nextBatch < sortOptions.length) {
            setCurrentBatchIndex(nextBatch);
            fetchRestaurants(nextBatch, activeRequestIdRef.current);
        }
    };

    const onlinestatus = useOnlineStatus();
    if (onlinestatus == false) 
        return (
            <h1>
                Looks like you're offline! Please check your Internet Connection
            </h1>
        );

    const hasMoreToLoad = currentBatchIndex < sortOptions.length - 1;

    return listofRestaurants.length == 0 && isLoading ? <Shimmer /> : (
        <div className="body px-3 sm:px-6 py-3 bg-gray-50 min-h-screen">
            <div className="filter grid grid-cols-1 md:flex md:flex-row md:flex-wrap gap-2 sm:gap-3 justify-between items-stretch md:items-center bg-white shadow-md rounded-xl px-3 sm:px-4 py-3 m-0 mb-4">
                
                <div className="search m-0 md:m-2 flex items-center gap-2 text-sm sm:text-base">
                    <label className="font-medium text-gray-700 shrink-0">📍 Popular: </label>
                    <select 
                        className="border border-gray-300 rounded-lg px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
                        value={popularLocations.findIndex(loc => loc.name === location.name)}
                        onChange={(e) => {
                            const selected = popularLocations[e.target.value];
                            setLocation(selected);
                        }}
                    >
                        {popularLocations.map((loc, idx) => (
                            <option key={idx} value={idx}>{loc.name}</option>
                        ))}
                    </select>
                </div>

                <div className="search m-0 md:m-2 flex items-center gap-2 text-sm sm:text-base">
                    <input 
                        type="text" 
                        placeholder="Enter any city..."
                        className="border border-gray-300 rounded-lg px-3 py-2 h-10 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') searchCustomLocation();
                        }}
                    />
                    <button 
                        className="px-3 py-2 h-10 text-sm sm:text-base bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 w-auto"
                        onClick={searchCustomLocation}
                        disabled={isSearchingLocation}
                    >
                        {isSearchingLocation ? '🔄' : '🔍'}
                    </button>
                </div>

                <div className="search m-0 md:m-2">
                    <button 
                        className="px-3 py-2 h-10 text-sm sm:text-base bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
                        onClick={useCurrentLocation}
                        disabled={isSearchingLocation}
                    >
                        📍 Use My Location
                    </button>
                </div>

                <div className="search flex items-center gap-2 m-0 md:m-2 text-sm sm:text-base">
                    <input 
                        type="text" 
                        data-testid="searchInput"
                        placeholder="Search restaurants..."
                        className="border border-gray-300 rounded-lg px-3 py-2 h-10 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                        value={searchtext}
                        onChange={(e) => {
                            setsearchText(e.target.value);
                        }}
                    />
                    <button 
                        className="px-3 py-2 h-10 text-sm sm:text-base bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 w-auto"
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

                <div className="search m-0 md:m-2 flex items-center">
                    <button 
                        className="px-3 py-2 h-10 text-sm sm:text-base bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors duration-200 w-full sm:w-auto"
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
            </div>

            <div className="text-center mb-4 px-1">
                <p className="text-gray-600">
                    📍 Showing restaurants in <span className="font-semibold text-orange-600">{location.name}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                {FilteredRestaurants.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id} className="block h-full">
                        {restaurant.info.veg ? (
                            <RestaurantCardVeg resData={restaurant}/>
                        ) : (
                            <RestaurantCard resData={restaurant}/>
                        )}
                    </Link>
                ))}
            </div>

            {isLoading && <Shimmer />}

            {hasMoreToLoad && !isLoading && FilteredRestaurants.length > 0 && (
                <div className="text-center mt-6 sm:mt-8 mb-4">
                    <button 
                        className="px-4 sm:px-8 py-2 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md w-full sm:w-auto"
                        onClick={loadMoreRestaurants}
                    >
                        Load More Restaurants 🍽️
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                        Showing {FilteredRestaurants.length} restaurants
                    </p>
                </div>
            )}

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
        </div>
    );
};

export default Body;