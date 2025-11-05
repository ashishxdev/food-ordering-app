import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
    const [resinfo, setresinfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, [resId]);

    const fetchMenu = async () => {
        try {
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