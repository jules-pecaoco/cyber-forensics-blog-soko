import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, ZoomControl } from "react-leaflet";
import { Icon, type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon using data URI to avoid external dependencies
const createCustomIcon = (color: string) => {
  const svgIcon = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const locations = [
  {
    name: "Scarborough Shoal (Panatag Shoal)",
    coordinates: [15.138, 117.756] as LatLngExpression,
    info: "A critical fishing ground for Filipino fishermen, located well within the Philippines' Exclusive Economic Zone (EEZ). It has been a site of significant maritime contention.",
    type: "disputed",
    status: "🔴 CONTESTED",
  },
  {
    name: "Mischief Reef (Panganiban Reef)",
    coordinates: [9.897, 115.535] as LatLngExpression,
    info: "Originally a submerged reef, it has been transformed into a large artificial island with military-grade facilities, including a runway and naval port, violating international law.",
    type: "militarized",
    status: "⚠️ MILITARIZED",
  },
  {
    name: "Reed Bank (Recto Bank)",
    coordinates: [11.417, 116.833] as LatLngExpression,
    info: "An area believed to hold vast reserves of oil and natural gas. The 2016 arbitral ruling confirmed the Philippines' sovereign rights to explore resources here.",
    type: "resource",
    status: "💎 RESOURCE ZONE",
  },
  {
    name: "Ayungin Shoal (Second Thomas Shoal)",
    coordinates: [9.733, 115.866] as LatLngExpression,
    info: "Home to the BRP Sierra Madre, a deliberately grounded ship that serves as a Philippine military outpost to assert our sovereignty in the area.",
    type: "outpost",
    status: "🛡️ PH OUTPOST",
  },
  {
    name: "Thitu Island (Pag-asa Island)",
    coordinates: [11.05, 114.289] as LatLngExpression,
    info: "The largest Philippine-controlled island in the Spratlys, with a small civilian community and military presence. A symbol of continued Filipino presence.",
    type: "outpost",
    status: "🏝️ PH CONTROLLED",
  },
];

// Philippines EEZ boundary (simplified)
const philippinesEEZ: LatLngExpression[] = [
  [21, 116],
  [20, 122],
  [18, 126],
  [12, 127],
  [8, 127],
  [5, 126],
  [4, 120],
  [6, 116],
  [10, 115],
  [14, 115],
  [18, 116],
  [21, 116],
];

// Nine-dash line (approximate)
const nineDashLine: LatLngExpression[] = [
  [23, 118],
  [21, 117],
  [18, 116],
  [15, 115],
  [12, 114],
  [9, 112],
  [7, 110],
  [5, 109],
  [4, 109],
  [3, 110],
  [3, 112],
  [4, 115],
];

const MapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[0] | null>(null);
  const [activeView, setActiveView] = useState<"satellite" | "dark">("dark");

  const tileUrls = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  const getMarkerIcon = (type: string) => {
    const colors: Record<string, string> = {
      disputed: "#ef4444",
      militarized: "#f59e0b",
      resource: "#10b981",
      outpost: "#3b82f6",
    };
    return createCustomIcon(colors[type] || "#ef4444");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto">
        {/* Header with Glitch Effect */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 relative inline-block">
            <span className="absolute inset-0 text-red-500 opacity-70 animate-pulse" style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}>
              WEST PHILIPPINES SEA
            </span>
            <span
              className="absolute inset-0 text-cyan-500 opacity-70"
              style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)", animation: "glitch 0.3s infinite" }}
            >
              WEST PHILIPPINES SEA
            </span>
            <span className="relative text-green-400">WEST PHILIPPINES SEA</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2 mb-4">[CLASSIFIED] Philippine Territory Defense Matrix • Est. 2016 Arbitral Ruling</p>
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setActiveView("dark")}
              className={`px-4 py-2 border ${activeView === "dark" ? "border-green-400 bg-green-400/10" : "border-gray-600"} text-xs transition-all`}
            >
              [TACTICAL VIEW]
            </button>
            <button
              onClick={() => setActiveView("satellite")}
              className={`px-4 py-2 border ${
                activeView === "satellite" ? "border-green-400 bg-green-400/10" : "border-gray-600"
              } text-xs transition-all`}
            >
              [SATELLITE VIEW]
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full h-[70vh] border-2 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] relative overflow-hidden rounded-lg">
          <div className="absolute top-2 left-2 z-[1000] bg-black/90 border border-green-400 p-2 text-xs max-w-xs">
            <div className="text-green-400 font-bold mb-1">[LEGEND]</div>
            <div className="space-y-1 text-gray-300">
              <div>🔴 Contested Territory</div>
              <div>⚠️ Militarized Zone</div>
              <div>💎 Resource Area</div>
              <div>🛡️ PH Military Outpost</div>
              <div className="border-t border-gray-700 pt-1 mt-1">
                <span className="text-blue-400">━━━</span> Philippine EEZ
              </div>
              <div>
                <span className="text-red-400">━ ━</span> Nine-Dash Line (Invalid)
              </div>
            </div>
          </div>

          <MapContainer center={[12.5, 119]} zoom={6} className="h-full w-full" zoomControl={false}>
            <ZoomControl position="topright" />
            <TileLayer attribution="&copy; OpenStreetMap contributors" url={tileUrls[activeView]} />

            {/* Philippine EEZ */}
            <Polygon
              positions={philippinesEEZ}
              pathOptions={{
                color: "#3b82f6",
                weight: 2,
                fillColor: "#3b82f6",
                fillOpacity: 0.1,
                dashArray: "5, 10",
              }}
            />

            {/* Nine-dash line (China's claim) */}
            <Polyline
              positions={nineDashLine}
              pathOptions={{
                color: "#ef4444",
                weight: 2,
                dashArray: "10, 10",
                opacity: 0.7,
              }}
            />

            {/* Location Markers */}
            {locations.map((location) => (
              <Marker
                key={location.name}
                position={location.coordinates}
                icon={getMarkerIcon(location.type)}
                eventHandlers={{
                  click: () => setSelectedLocation(location),
                }}
              >
                <Popup className="custom-popup">
                  <div className="bg-black border border-green-400 p-3 text-white font-mono min-w-[250px]">
                    <div className="text-green-400 font-bold text-sm mb-1">[{location.status}]</div>
                    <h3 className="text-base font-bold mb-2 text-cyan-400">{location.name}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">{location.info}</p>
                    <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-500">
                      Coordinates: {(location.coordinates as [number, number])[0].toFixed(3)}°N,{" "}
                      {(location.coordinates as [number, number])[1].toFixed(3)}°E
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Info Cards Below Map */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-green-400/50 bg-black/50 p-4">
            <h3 className="text-green-400 font-bold mb-2 text-lg">[2016 ARBITRAL RULING]</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Permanent Court of Arbitration ruled in favor of the Philippines, declaring China's nine-dash line claim has{" "}
              <span className="text-red-400">NO LEGAL BASIS</span> under international law. The West Philippine Sea falls within the Philippines'
              200-nautical-mile Exclusive Economic Zone.
            </p>
          </div>

          <div className="border border-red-400/50 bg-black/50 p-4">
            <h3 className="text-red-400 font-bold mb-2 text-lg">[ONGOING CHALLENGES]</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Despite international law, aggressive actions continue: artificial island construction, militarization of reefs, harassment of Filipino
              fishermen, and blocking of resupply missions to Philippine outposts. <span className="text-green-400">The fight continues.</span>
            </p>
          </div>
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="mt-8 border-2 border-cyan-400 bg-black/80 p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-cyan-400 text-xs">[SELECTED TARGET]</span>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedLocation.name}</h2>
                <span className="text-sm text-gray-400">{selectedLocation.status}</span>
              </div>
              <button onClick={() => setSelectedLocation(null)} className="text-red-400 hover:text-red-300 text-xl">
                ✕
              </button>
            </div>
            <p className="text-gray-300 leading-relaxed">{selectedLocation.info}</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center border border-green-400 bg-green-400/5 p-6">
          <p className="text-green-400 text-lg font-bold mb-2">🇵🇭 THE WEST PHILIPPINE SEA IS OURS 🇵🇭</p>
          <p className="text-gray-400 text-sm">Stand with Filipino fishermen. Defend sovereign rights. Support international law.</p>
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }

        .leaflet-popup-tip {
          background: #000 !important;
          border: 1px solid #34d399 !important;
        }

        .leaflet-container {
          background: #000 !important;
        }
      `}</style>
    </div>
  );
};

export default MapPage;
