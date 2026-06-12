// Converts a place name into coordinates using Open-Meteo's free geocoding service
async function searchPlace(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Geocoding service returned an error (status ${res.status})`);
  }

  const data = await res.json();
  return data.results?.[0] ?? null;
}

export async function geocodeLocation(query) {
  let result = await searchPlace(query);

  // If the full query (e.g. "New York, NY") fails, try just the first part ("New York")
  if (!result) {
    const firstPart = query.split(",")[0].trim();
    if (firstPart && firstPart !== query) {
      result = await searchPlace(firstPart);
    }
  }

  if (!result) {
    throw new Error("Location not found. Try a more specific or different city name.");
  }

  return {
    latitude: result.latitude,
    longitude: result.longitude,
    displayName: [result.name, result.admin1, result.country]
      .filter(Boolean)
      .join(", "),
  };
}