// src/components/common/LocationPicker.jsx
import { useMapEvents } from "react-leaflet";

export default function LocationPicker({ setLocation, setLocationName }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setLocation([lat, lng]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        const address = data.address || {};
        let placeParts = [];

        const city = address.city || address.town || address.village;
        if (city) placeParts.push(city);

        const district = address.suburb || address.county || address.state_district;
        if (district) placeParts.push(district);

        const province = address.state || address.region || address.province;
        if (province) placeParts.push(province);

        const village = address.village;
        if (village && !placeParts.includes(village)) placeParts.push(village);

        const country = address.country;
        if (country) placeParts.push(country);

        const finalLocationName =
          placeParts.join(", ") || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

        console.log("📍 Picked:", finalLocationName);
        setLocationName(finalLocationName);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    },
  });

  return null;
}
