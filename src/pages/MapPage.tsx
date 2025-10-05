import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, ZoomControl, useMap } from "react-leaflet";
import { Icon, type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, AlertCircle, Shield, Database, X, Menu, Layers, ChevronDown, ChevronUp } from "lucide-react";
import GlitchText from "@/components/common/GlitchText";

/**
 * NOTES ON SOURCES
 * - Philippines EEZ bounding extents (simplified bounding polygon) derived from MarineRegions EEZ dataset.
 *   (simplified rectangle / polygon for clarity & performance). See: marineregions.org
 * - PCA 2016 Award referenced for legal basis/context. See: pca-cpa.org (2016 Award).
 * - PAGASA PAR coordinates used for Philippines Area of Responsibility polygon (PAR).
 * - Nine-dash line is represented as an approximate polyline for visualization only.
 *
 * See assistant message for citations.
 */

// ---------- Helper: custom marker icon ----------
const createCustomIcon = (color: string) => {
  const svg = `
    <svg width="36" height="36" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  `;
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
    className: "custom-leaflet-icon",
  });
};

// ---------- Locations (unchanged coordinates verified via public sources) ----------
const locations = [
  {
    name: "Scarborough Shoal (Panatag Shoal)",
    coordinates: [15.138, 117.756] as LatLngExpression,
    info: "A critical fishing ground for Filipino fishermen, located well within the Philippines' Exclusive Economic Zone (EEZ). Significant maritime contention here.",
    type: "disputed" as const,
    status: "CONTESTED",
  },
  {
    name: "Mischief Reef (Panganiban Reef)",
    coordinates: [9.897, 115.535] as LatLngExpression,
    info: "Originally a submerged reef; heavily modified by land reclamation and infrastructure. Located within the Philippines' EEZ according to the 2016 arbitral award.",
    type: "militarized" as const,
    status: "MILITARIZED",
  },
  {
    name: "Reed Bank (Recto Bank)",
    coordinates: [11.417, 116.833] as LatLngExpression,
    info: "An area believed to hold reserves of oil and natural gas. The 2016 arbitral ruling confirmed the Philippines' sovereign rights to explore resources here.",
    type: "resource" as const,
    status: "RESOURCE ZONE",
  },
  {
    name: "Ayungin Shoal (Second Thomas Shoal)",
    coordinates: [9.733, 115.866] as LatLngExpression,
    info: "Home to the BRP Sierra Madre (deliberately grounded Philippine ship) used as an outpost to assert sovereignty.",
    type: "outpost" as const,
    status: "PH OUTPOST",
  },
  {
    name: "Thitu Island (Pag-asa Island)",
    coordinates: [11.051, 114.284] as LatLngExpression, // small adjustment to match public coords
    info: "Largest Philippine-controlled island in the Spratlys, with civilian population and Philippine government presence.",
    type: "outpost" as const,
    status: "PH CONTROLLED",
  },
];

// ---------- Corrected / improved maritime geometry ----------

// Simplified Philippines EEZ bounding polygon (simplified rectangle-ish polygon).
// Source: MarineRegions EEZ (bounding lat/long extents). This is NOT a high-res EEZ polygon,
// but it is a corrected bounding polygon suitable for visualization. See MarineRegions. :contentReference[oaicite:1]{index=1}
const philippinesEEZ: LatLngExpression[] = [
  // west-north corner, northwest coast (approx)
  [22.2536, 113.6804],
  // northeast corner (north of Luzon toward Taiwan)
  [22.2536, 129.9438],
  // southeast corner (southernmost EEZ extent)
  [3.1114, 129.9438],
  // southwest corner (southwest boundary)
  [3.1114, 113.6804],
  // close the polygon
  [22.2536, 113.6804],
];

// PAGASA Philippine Area of Responsibility (PAR) polygon (explicit points from PAGASA).
// This polygon follows PAGASA public definition: 5°N 115°E, 15°N 115°E, 21°N 120°E, 25°N 120°E, 25°N 135°E, 5°N 135°E. :contentReference[oaicite:2]{index=2}
const philippinesPAR: LatLngExpression[] = [
  [5, 115],
  [15, 115],
  [21, 120],
  [25, 120],
  [25, 135],
  [5, 135],
  [5, 115],
];

// Nine-dash line (approximate polyline for visualization).
// This is an approximation for display only; the nine-dash is a political/historical construct (PCA 2016 found no legal basis).
// Points chosen to produce a recognizable nine-dash path on the map. :contentReference[oaicite:3]{index=3}
const nineDashLine: LatLngExpression[] = [
  [21.0, 109.5],
  [20.0, 111.5],
  [18.5, 114.5],
  [16.5, 116.5],
  [14.5, 117.5],
  [12.0, 116.5],
  [9.5, 114.0],
  [7.5, 112.5],
  [5.5, 111.5],
];

// ---------- Utility: small map re-center hook for responsive UX ----------
function Recenter({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// ---------- Main Component ----------
const MapPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[0] | null>(null);
  const [activeView, setActiveView] = useState<"satellite" | "dark">("dark");
  const [legendOpen, setLegendOpen] = useState(true);

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
    return createCustomIcon(colors[type] || "#6b7280");
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 mb-4">
          <div>
            <GlitchText text="WEST PHILIPPINES SEA" />
            <p className="text-sm text-slate-400 mt-1">Philippine EEZ & maritime features — visualized (simplified).</p>
          </div>

          {/* Top Controls (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setActiveView("dark")}
              className={`px-3 py-2 border rounded text-sm ${activeView === "dark" ? "bg-slate-800 border-slate-400" : "border-slate-700"}`}
            >
              Tactical
            </button>
            <button
              onClick={() => setActiveView("satellite")}
              className={`px-3 py-2 border rounded text-sm ${activeView === "satellite" ? "bg-slate-800 border-slate-400" : "border-slate-700"}`}
            >
              Satellite
            </button>
            <button
              onClick={() => setLegendOpen((s) => !s)}
              className="px-3 py-2 border rounded flex items-center gap-2 border-slate-700"
              aria-expanded={legendOpen}
              aria-controls="legend"
            >
              <Layers size={16} />
              <span className="text-sm">Legend</span>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLegendOpen((s) => !s)}
              className="p-2 border rounded border-slate-700"
              aria-expanded={legendOpen}
              aria-controls="legend"
            >
              <Menu size={16} />
            </button>
          </div>
        </header>

        {/* Map */}
        <div className="w-full h-[68vh] md:h-[72vh] rounded-lg overflow-hidden relative border border-slate-800">
          {/* Collapsible Legend (bottom sheet on mobile, side panel on desktop) */}
          {/* Collapsible Legend */}
          <div
            id="legend"
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 md:left-4 md:bottom-auto md:top-4 md:translate-x-0 z-[1000] w-[90vw] md:w-64 
              bg-black/85 border border-green-400 rounded-md text-sm text-gray-200 transition-all duration-300 ease-in-out
              ${
                legendOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"
              }`}
          >
            {/* Legend Header */}
            <button
              onClick={() => setLegendOpen(!legendOpen)}
              className="flex items-center justify-between w-full px-3 py-2 border-b border-green-400/30 text-green-400 font-semibold tracking-wide hover:bg-green-400/10 transition"
            >
              <div className="flex items-center gap-2">
                <Layers size={16} />
                <span>Legend</span>
              </div>
              {legendOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Legend Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${legendOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <ul className="p-3 space-y-2 text-gray-300">
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-red-400" />
                  <span>Contested / Disputed features</span>
                </li>
                <li className="flex items-center gap-3">
                  <AlertCircle size={16} className="text-yellow-400" />
                  <span>Militarized / reclaimed features</span>
                </li>
                <li className="flex items-center gap-3">
                  <Database size={16} className="text-emerald-400" />
                  <span>Resource / hydrocarbon zones</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield size={16} className="text-blue-400" />
                  <span>Philippine outposts</span>
                </li>

                <li className="pt-2 border-t border-gray-700 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-6 h-1 bg-blue-400 rounded-sm" />
                    <span>Philippine EEZ boundary</span>
                  </div>
                </li>

                <li>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-6 h-1 bg-red-400 rounded-sm" />
                    <span>China’s Nine-Dash Line (invalid)</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <MapContainer center={[12.5, 119]} zoom={6} className="h-full w-full" zoomControl={false} preferCanvas>
            <ZoomControl position="topright" />
            <TileLayer attribution="&copy; OSM contributors" url={tileUrls[activeView]} />

            <Recenter center={[12.5, 119]} />

            {/* Philippine EEZ (simplified) */}
            <Polygon
              positions={philippinesEEZ}
              pathOptions={{
                color: "#0ea5e9", // sky-500
                weight: 2,
                fillColor: "#0ea5e9",
                fillOpacity: 0.08,
                dashArray: "6,8",
              }}
            />

            {/* PAGASA PAR polygon (monitoring domain) */}
            <Polygon
              positions={philippinesPAR}
              pathOptions={{
                color: "#94a3b8", // slate-400
                weight: 1.5,
                dashArray: "4,6",
                fillOpacity: 0.02,
              }}
            />

            {/* Nine-dash line (approximate) */}
            <Polyline
              positions={nineDashLine}
              pathOptions={{
                color: "#ef4444",
                weight: 3,
                dashArray: "10,8",
                opacity: 0.9,
              }}
            />

            {/* Markers */}
            {locations.map((loc) => (
              <Marker
                key={loc.name}
                position={loc.coordinates}
                icon={getMarkerIcon(loc.type)}
                eventHandlers={{
                  click: () => setSelectedLocation(loc),
                }}
              >
                <Popup>
                  <div className="max-w-xs font-sans">
                    <div className="flex items-center gap-2">
                      {loc.type === "disputed" && <MapPin size={16} />}
                      {loc.type === "militarized" && <AlertCircle size={16} />}
                      {loc.type === "resource" && <Database size={16} />}
                      {loc.type === "outpost" && <Shield size={16} />}
                      <strong className="ml-1">{loc.name}</strong>
                    </div>

                    <p className="text-xs mt-2 text-slate-600">{loc.info}</p>

                    <div className="text-xs mt-2 text-slate-500 border-t border-slate-200/5 pt-2">
                      Coordinates: {(loc.coordinates as [number, number])[0].toFixed(3)}°N, {(loc.coordinates as [number, number])[1].toFixed(3)}°E
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Bottom content / info cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-800 rounded bg-slate-900/40">
            <h3 className="font-semibold text-sky-400">2016 PCA Award (summary)</h3>
            <p className="text-sm text-slate-400 mt-2">
              The Philippines brought an arbitration to the Permanent Court of Arbitration. The Tribunal's Award of 12 July 2016 concluded that
              China's nine-dash historic rights claim had no legal basis insofar as it exceeded entitlements under UNCLOS.
            </p>
            <p className="text-xs text-slate-500 mt-2">Source: PCA Award (12 July 2016).</p>
          </div>

          <div className="p-4 border border-slate-800 rounded bg-slate-900/40">
            <h3 className="font-semibold text-emerald-400">Operational note</h3>
            <p className="text-sm text-slate-400 mt-2">
              EEZ polygon shown is a simplified bounding polygon for display and user interaction. If you need high-resolution EEZ geometry for
              analysis/printing, I can export GeoJSON from authoritative datasets (MarineRegions / national EEZ shapefiles).
            </p>
          </div>
        </div>

        {/* Selected location bottom sheet (mobile-friendly) */}
        {selectedLocation && (
          <div className="fixed left-0 right-0 bottom-0 z-40 md:relative md:mt-8">
            <div className="max-w-4xl mx-auto md:static">
              <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-t-lg md:rounded-lg p-4 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {selectedLocation.type === "disputed" && <MapPin size={18} />}
                      {selectedLocation.type === "militarized" && <AlertCircle size={18} />}
                      {selectedLocation.type === "resource" && <Database size={18} />}
                      {selectedLocation.type === "outpost" && <Shield size={18} />}

                      <h2 className="text-lg font-bold">{selectedLocation.name}</h2>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{selectedLocation.status}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedLocation(null)} className="p-2 border rounded border-slate-700" aria-label="Close">
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mt-3">{selectedLocation.info}</p>

                <div className="text-xs text-slate-500 mt-3">
                  Coordinates: {(selectedLocation.coordinates as [number, number])[0].toFixed(3)}°N,{" "}
                  {(selectedLocation.coordinates as [number, number])[1].toFixed(3)}°E
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer / sources */}
        <footer className="mt-6 text-xs text-slate-500">
          Sources: MarineRegions (Philippines EEZ), PCA Award (12 July 2016), PAGASA (PAR), public nine-dash line references. See citations in the
          developer assistant response.
        </footer>
      </div>

      {/* Styles (leaflet tweaks + small animations) */}
      <style>{`
        .leaflet-container { background: #000; }
        .custom-leaflet-icon img { filter: drop-shadow(0 1px 2px rgba(0,0,0,0.6)); }
        /* Ensure popups render over bottom sheet on mobile */
        .leaflet-popup-pane, .leaflet-shadow-pane { z-index: 1000; }
      `}</style>
    </div>
  );
};

export default MapPage;
