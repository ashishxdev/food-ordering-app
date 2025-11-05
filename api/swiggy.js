// export default async function handler(req, res) {
//   // Enable CORS
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   const { lat, lng } = req.query;
  
//   if (!lat || !lng) {
//     return res.status(400).json({ error: 'Missing lat or lng parameters' });
//   }

//   try {
//     const response = await fetch(
//       `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
//       {
//         headers: {
//           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
//           'Accept': 'application/json',
//         }
//       }
//     );
    
//     if (!response.ok) {
//       throw new Error(`Swiggy API returned ${response.status}`);
//     }
    
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching from Swiggy:', error);
//     res.status(500).json({ error: 'Failed to fetch restaurants' });
//   }
// }
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { lat, lng, nextOffset } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  try {
    // Build URL with or without nextOffset
    let url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    
    // Add nextOffset if provided (for pagination)
    if (nextOffset) {
      url += `&nextOffset=${nextOffset}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Swiggy API returned ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Swiggy:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
}