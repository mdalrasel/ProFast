import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// ✅ Internal component for fly animation
const FlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, {
        duration: 1.5,
      });
    }
  }, [position, map]);

  return null;
};

const Coverage = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [flyPosition, setFlyPosition] = useState(null);

  useEffect(() => {
    fetch("/data/warehouses.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const filtered = locations.filter(
    (location) =>
      location.district.toLowerCase().includes(search.toLowerCase()) ||
      location.city.toLowerCase().includes(search.toLowerCase())
  );

  const validLocations = filtered.filter(
    (loc) =>
      typeof loc.latitude === "number" && typeof loc.longitude === "number"
  );

  const handleSearch = () => {
    if (validLocations.length > 0) {
      const { latitude, longitude } = validLocations[0];
      setFlyPosition([latitude, longitude]);
    } else {
      alert("No matching location found!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-green-900 mb-4">
        We are available in 64 districts
      </h2>

      {/* Search */}
      <div className="flex gap-2 items-center mb-6">
        <input
          type="text"
          placeholder="Search district or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
        <button onClick={handleSearch} className="btn bg-lime-500 text-white">
          Search
        </button>
      </div>

      <p className="mb-4 font-semibold text-green-900">
        We deliver almost all over Bangladesh
      </p>

      {/* Map */}
      <div className="h-[500px] w-full rounded overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "80%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ✅ Fly to searched location */}
          {flyPosition && <FlyToLocation position={flyPosition} />}

          {/* Pins */}
          {validLocations.map((loc, idx) => (
            <Marker
              key={idx}
              position={[loc.latitude, loc.longitude]}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup>
                <strong>{loc.district}</strong> <br />
                City: {loc.city} <br />
                Region: {loc.region} <br />
                {loc.covered_area?.length > 0 && (
                  <span>Areas: {loc.covered_area.join(", ")}</span>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
