// export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"

// export const LOGO_URL = "https://img.freepik.com/premium-vector/online-food-app-icon-food-shop-location-logo-also-online-resturent-location-template_608547-155.jpg"

// export const MENU_API = "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7043883&lng=77.0985646&restaurantId="
export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"

export const LOGO_URL = "https://img.freepik.com/premium-vector/online-food-app-icon-food-shop-location-logo-also-online-resturent-location-template_608547-155.jpg"

// Don't hardcode lat/lng in MENU_API - we'll pass them dynamically
export const MENU_API_BASE = "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true"

// API endpoints - adjust based on your setup
export const SWIGGY_API_ENDPOINT = "/api/swiggy"
export const MENU_API_ENDPOINT = "/api/menu"

// Fallback to direct Swiggy API if your proxy isn't working (NOT RECOMMENDED for production)
export const SWIGGY_DIRECT_API = "https://www.swiggy.com/dapi/restaurants/list/v5"