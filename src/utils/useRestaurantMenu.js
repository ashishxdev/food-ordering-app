// import { useEffect, useState } from "react";
// import { MENU_API } from "./constant";

// const useRestaurantMenu = (resId) => {
//     // fetch data

//     const [resInfo, setResInfo] = useState(null);

//     useEffect(()=>{
//         fetchmenu();
//     },[])

//     const fetchmenu = async()=>{
//         const data = await fetch(MENU_API + resId)
//         const json = await data.json();
//         setResInfo(json.data);
//     };

//     return resInfo;
// }

// export default useRestaurantMenu;
import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
    const [resinfo, setresinfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, [resId]); // Added resId dependency

    const fetchMenu = async () => {
        try {
            // ✅ Use your API route instead of direct Swiggy call
            const response = await fetch(
                `/api/menu?restaurantId=${resId}&lat=28.7043883&lng=77.0985646`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch menu');
            }
            
            const json = await response.json();
            setresinfo(json.data);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };

    return resinfo;
};

export default useRestaurantMenu;