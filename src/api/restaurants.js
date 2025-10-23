export default async function handler(req, res) {
  const url =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458&lng=79.0882&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
}
