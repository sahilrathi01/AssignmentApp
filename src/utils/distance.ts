import haversine from 'haversine-distance';
export const metersToKm = (m: number) => (m / 1000).toFixed(1);
export function distanceMeters(
  a: {lat: number; lng: number},
  b: {lat: number; lng: number},
) {
  return haversine(
    {latitude: a.lat, longitude: a.lng},
    {latitude: b.lat, longitude: b.lng},
  );
}
