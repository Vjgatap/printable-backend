import axios from "axios";

const API_KEY = "5b3ce3597851110001cf6248d34233557de144998a2fdbd8e7bac08e";
const BASE_URL = "https://api.openrouteservice.org/v2/matrix/driving-car";
export const getNearestMerchantsWithDistance = async (
  origin: [number, number],
  merchants: any
) => {
  const destinations = merchants.map((m: any) => [
    parseFloat(m.merchantLat),
    parseFloat(m.merchantLong),
  ]);

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        locations: [origin, ...destinations],
        metrics: ["distance"],
      }),
    });

    const result = await response.json();
    const dist = result.distances[0];

    const data = merchants.map((m, index) => ({
      merchantId: m.merchantId,
      shopName: m.shopName,
      merchantLat: m.merchantLat,
      merchantLong: m.merchantLong,
      distance: `${dist[index + 1] / 1000}km`, // Convert meters to km
    }));

    return data;
  } catch (error) {
    console.error("ORS API Error:", error);
    return null;
  }
};
