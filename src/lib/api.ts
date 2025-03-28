const API_KEY = Deno.env.get("DISTANCE_MATRIX_GOOGLE_API_KEY");
const BASE_URL = Deno.env.get("GOOGLE_API_BASE_URL");

export const getNearestMerchantsWithDistance = async (
  origin: [number, number],
  merchants: any,
) => {
  const destinations = merchants
    .map((m: any) => `${m.merchantLat},${m.merchantLong}`)
    .join("|"); // Google API requires '|' as separator
  try {
    const response = await fetch(
      `${BASE_URL}?origins=${origin[0]},${origin[1]}&destinations=${destinations}&mode=driving&departure_time=now&key=${API_KEY}`,

      {
        method: "GET",

        headers: {
          Accept: "application/json",
        },
      },
    );
    const result = await response.json();
    if (!result.rows || !result.rows[0])
      throw new Error("Invalid API response");

    return merchants.map((m: any, index: number) => ({
      merchantId: m.merchantId,
      shopName: m.shopName,
      merchantLat: m.merchantLat,
      merchantLong: m.merchantLong,
      distance: result.rows[0].elements[index].distance.text,
      estimated_reaching_time: result.rows[0].elements[index].duration.text,
      estimated_reaching_time_with_traffic:
        result.rows[0].elements[index].duration_in_traffic.text,
    }));
  } catch (error) {
    console.error("Google API Error:", error);
    return null;
  }
};
