// This file must be placed in: /api/swiggy.js
// Vercel will automatically turn this into a serverless function
// accessible at your-domain.com/api/swiggy

export default async function handler(request, response) {
  // This is the real Swiggy API URL you were trying to call
  // We use the same lat/lng you had in your component
  const SWIGGY_API_URL =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458&lng=79.0882&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  try {
    //
    // This fetch call happens on the server, not in the browser.
    // This is why it's not blocked by CORS.
    //
    const apiResponse = await fetch(SWIGGY_API_URL, {
      headers: {
        // Swiggy's API often blocks requests without a valid User-Agent.
        // This header makes our server request look like a real browser.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
        // You might need to add other headers here if Swiggy's API
        // requires them (e.g., cookies or auth tokens).
        // Use browser devtools on swiggy.com to see what headers it sends.
      },
    });

    // Check if Swiggy's API returned an error
    if (!apiResponse.ok) {
      console.error("Swiggy API Error:", apiResponse.status, apiResponse.statusText);
      return response
        .status(apiResponse.status)
        .json({ error: "Failed to fetch from Swiggy API" });
    }

    // Get the JSON data from Swiggy's response
    const data = await apiResponse.json();

    //
    // Send the data from Swiggy back to your frontend (Body.jsx)
    //
    
    // Add caching headers to make your app faster
    // This tells Vercel to cache the response for 10 minutes (600 seconds)
    response.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=30"
    );

    // Send the data!
    return response.status(200).json(data);
    
  } catch (error) {
    // Handle any network or parsing errors
    console.error("Internal Server Error:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
