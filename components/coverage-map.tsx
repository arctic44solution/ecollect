"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  MapGeoJSON,
} from "@/components/ui/map";

const coverageArea: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Service Coverage Area",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.8847, 7.1699], // Katunayake
            [79.8915, 7.2127], // Katana
            [79.9475, 7.1667], // Minuwangoda
            [79.9845, 7.1267], // Udugampola
            [80.05, 7.1167],   // Yakkala
            [80.0939, 6.9786], // Dompe
            [80.1472, 6.9369], // Kosgama
            [80.09144761379936, 6.8586840816594234], // Meepe
            [80.0006, 6.8428], // Homagama
            [79.9656, 6.8167], // Mattegoda
            [79.9222, 6.8017], // Piliyandala
            [79.8816, 6.773],  // Moratuwa
            [79.8697, 6.8344], // Mount Lavinia
            [79.8683, 6.8747], // Wellawatta
            [79.85, 6.906],    // Kollupitiya
            [79.8612, 6.9344], // Fort
            [79.8731, 6.9694], // Mattakkuliya
            [79.8978, 6.9628], // Mabola
            [79.8897, 6.9892], // Wattala
            [79.8917, 7.0747], // Ja-Ela
            [79.8847, 7.1699], // Close polygon
          ],
        ],
      },
    },
  ],
};

const locations = [
  // Gampaha District
  { id: 2, name: "Gampaha", lat: 7.0917, lng: 79.9992 },
  { id: 3, name: "Kelaniya", lat: 6.9553, lng: 79.922 },
  { id: 4, name: "Wattala", lat: 6.9892, lng: 79.8917 },
  { id: 5, name: "Minuwangoda", lat: 7.1667, lng: 79.95 },
  { id: 6, name: "Biyagama", lat: 6.9405, lng: 80.0154 },
  { id: 8, name: "Yakkala", lat: 7.1167, lng: 80.05 },
  { id: 9, name: "Katana", lat: 7.1667, lng: 79.8833 },
  { id: 10, name: "Mahara", lat: 7.0013, lng: 79.9497 },
  { id: 12, name: "Malwana", lat: 6.9433, lng: 80.0306 },
  { id: 13, name: "Makola", lat: 6.9736, lng: 79.9639 },
  { id: 14, name: "Weliweriya", lat: 7.0307, lng: 80.0512 },
  { id: 15, name: "Udugampola", lat: 7.1333, lng: 79.9667 },
  { id: 16, name: "Thihariya", lat: 7.0167, lng: 80.0667 },
  { id: 17, name: "Mabola", lat: 6.988, lng: 79.88 },
  // Colombo District
  { id: 18, name: "Colombo 01 - Fort", lat: 6.9344, lng: 79.8428 },
  { id: 19, name: "Colombo 02 - Slave Island", lat: 6.9275, lng: 79.85 },
  { id: 20, name: "Colombo 03 - Kollupitiya", lat: 6.906, lng: 79.85 },
  { id: 21, name: "Colombo 04 - Bambalapitiya", lat: 6.8886, lng: 79.8565 },
  { id: 22, name: "Colombo 05 - Narahenpita", lat: 6.89, lng: 79.875 },
  { id: 23, name: "Colombo 06 - Wellawatta", lat: 6.8742, lng: 79.8605 },
  { id: 24, name: "Colombo 07 - Cinnamon Gardens", lat: 6.912, lng: 79.878 },
  { id: 25, name: "Colombo 08 - Borella", lat: 6.9167, lng: 79.8778 },
  { id: 26, name: "Colombo 09 - Dematagoda", lat: 6.9333, lng: 79.8833 },
  { id: 27, name: "Colombo 10 - Maradana", lat: 6.9275, lng: 79.8647 },
  { id: 28, name: "Colombo 11 - Pettah", lat: 6.9365, lng: 79.8487 },
  { id: 29, name: "Colombo 12 - Hulftsdorp", lat: 6.936, lng: 79.862 },
  { id: 30, name: "Colombo 13 - Kotahena", lat: 6.95, lng: 79.86 },
  { id: 31, name: "Colombo 14 - Grandpass", lat: 6.9508, lng: 79.875 },
  { id: 32, name: "Colombo 15 - Mattakkuliya", lat: 6.97, lng: 79.87 },
  // Sri Jayawardenepura Kotte & Suburbs
  { id: 33, name: "Sri Jayawardenepura Kotte", lat: 6.8947, lng: 79.9025 },
  { id: 34, name: "Rajagiriya", lat: 6.9061, lng: 79.897 },
  { id: 35, name: "Nugegoda", lat: 6.8649, lng: 79.8997 },
  { id: 36, name: "Dehiwala", lat: 6.8528, lng: 79.8656 },
  { id: 37, name: "Mount Lavinia", lat: 6.8389, lng: 79.8636 },
  { id: 38, name: "Ratmalana", lat: 6.8211, lng: 79.8862 },
  { id: 39, name: "Moratuwa", lat: 6.773, lng: 79.8816 },
  { id: 40, name: "Kalubowila", lat: 6.8667, lng: 79.8778 },
  { id: 41, name: "Battaramulla", lat: 6.9022, lng: 79.9186 },
  { id: 42, name: "Pelawatte", lat: 6.8833, lng: 79.9333 },
  { id: 43, name: "Thalawathugoda", lat: 6.8728, lng: 79.9583 },
  { id: 44, name: "Malabe", lat: 6.9068, lng: 79.9573 },
  { id: 45, name: "Kaduwela", lat: 6.9347, lng: 79.9847 },
  { id: 46, name: "Athurugiriya", lat: 6.8731, lng: 80.035 },
  { id: 47, name: "Homagama", lat: 6.844, lng: 80.0031 },
  { id: 48, name: "Kolonnawa", lat: 6.9333, lng: 79.9 },
  { id: 49, name: "Maharagama", lat: 6.848, lng: 79.9265 },
  { id: 50, name: "Kottawa", lat: 6.8175, lng: 79.9583 },
  { id: 51, name: "Pannipitiya", lat: 6.8333, lng: 79.95 },
  { id: 52, name: "Piliyandala", lat: 6.801, lng: 79.922 },
];

export function CoverageMap() {
  return (
    <div className="relative h-full min-h-[400px] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <Map center={[79.935, 6.92]} zoom={10.5}>
        <MapGeoJSON
          data={coverageArea}
          fillPaint={{
            "fill-color": "#10b981", // Beautiful Emerald Green
            "fill-opacity": 0.15,
          }}
          linePaint={{
            "line-color": "#059669",
            "line-width": 2,
            "line-dasharray": [2, 2],
          }}
        />

        {locations.map((location) => (
          <MapMarker
            key={location.id}
            longitude={location.lng}
            latitude={location.lat}
          >
            <MarkerContent>
              {/* Premium Pulsing Radar Dots */}
              <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600 border border-white dark:border-neutral-900 shadow-sm"></span>
              </div>
            </MarkerContent>
            <MarkerTooltip>{location.name}</MarkerTooltip>
            <MarkerPopup>
              <div className="space-y-1 px-1 py-0.5">
                <p className="text-foreground font-bold text-sm tracking-tight">{location.name}</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">Active Service Area</p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>

      {/* Floating Glassmorphism Status Badge - RAISED TO bottom-8 to prevent cutoff on mobile! */}
      <div className="absolute bottom-8 left-4 sm:bottom-8 sm:left-8 z-10 flex items-center gap-2 rounded-full bg-white/95 dark:bg-black/90 px-4 py-2 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 shadow-xl backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50">
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
        </span>
        Live Collection Route
      </div>
    </div>
  );
}