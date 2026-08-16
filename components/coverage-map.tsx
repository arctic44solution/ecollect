"use client";

import { useState, useEffect } from "react";
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
      properties: { name: "Service Coverage Area" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.8847, 7.1699], [79.8915, 7.2127], [79.9475, 7.1667], 
            [79.9845, 7.1267], [80.05, 7.1167], [80.0939, 6.9786], 
            [80.1472, 6.9369], [80.09144761379936, 6.8586840816594234], 
            [80.0006, 6.8428], [79.9656, 6.8167], [79.9222, 6.8017], 
            [79.8816, 6.773], [79.8697, 6.8344], [79.8683, 6.8747], 
            [79.85, 6.906], [79.8612, 6.9344], [79.8731, 6.9694], 
            [79.8978, 6.9628], [79.8897, 6.9892], [79.8917, 7.0747], 
            [79.8847, 7.1699],
          ],
        ],
      },
    },
  ],
};

const locations = [
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

// --- 1. DEFINE THE MAIN HUBS (The Backbone) ---
const mainHubs = [
  { lng: 79.9992, lat: 7.0917 }, // Gampaha
  { lng: 79.9220, lat: 6.9553 }, // Kelaniya
  { lng: 79.8428, lat: 6.9344 }, // Colombo Fort
  { lng: 79.8997, lat: 6.8649 }, // Nugegoda
  { lng: 79.9265, lat: 6.8480 }, // Maharagama
  { lng: 79.9220, lat: 6.8010 }, // Piliyandala
  { lng: 79.8816, lat: 6.7730 }  // Moratuwa
];

// --- 2. PRE-CALCULATE FEEDER NETWORK (Hub -> Sub-city) ---
const baseFeederLines = locations.map((loc) => {
  let minDist = Infinity;
  let closestHub = mainHubs[0];
  
  mainHubs.forEach((hub) => {
    const dist = Math.pow(hub.lng - loc.lng, 2) + Math.pow(hub.lat - loc.lat, 2);
    if (dist < minDist) {
      minDist = dist;
      closestHub = hub;
    }
  });

  return { start: closestHub, end: { lng: loc.lng, lat: loc.lat } };
});

export function CoverageMap() {
  const [realRoadCoords, setRealRoadCoords] = useState<number[][]>([]);
  
  // Animation states
  const [drawnMainRoute, setDrawnMainRoute] = useState<number[][]>([]);
  const [drawnFeederFeatures, setDrawnFeederFeatures] = useState<GeoJSON.Feature[]>([]);

  // Fetch REAL Road geometries connecting the MAIN HUBS
  useEffect(() => {
    const fetchRealRoads = async () => {
      try {
        const stops = mainHubs.map(h => `${h.lng},${h.lat}`).join(";");
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${stops}?overview=full&geometries=geojson`);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          setRealRoadCoords(data.routes[0].geometry.coordinates);
        }
      } catch (error) {
        console.error("Failed to fetch road routes:", error);
      }
    };

    fetchRealRoads();
  }, []);

  // 3. THE MASTER ANIMATION LOOP (Animates BOTH Thick and Thin Lines!)
  useEffect(() => {
    if (realRoadCoords.length === 0) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 6500; // 6.5 seconds for full animation
    const totalPoints = realRoadCoords.length;

    const animateNetwork = (time: number) => {
      if (!startTime) startTime = time;
      
      // Calculate progress between 0.0 and 1.0
      const progress = Math.min((time - startTime) / duration, 1);

      // --- A. ANIMATE THE THICK MAIN ARTERY ---
      const currentFloatIndex = progress * (totalPoints - 1);
      const currentIndex = Math.floor(currentFloatIndex);
      const remainder = currentFloatIndex - currentIndex;

      const currentPath = realRoadCoords.slice(0, currentIndex + 1);

      if (currentIndex < totalPoints - 1) {
        const startPt = realRoadCoords[currentIndex];
        const endPt = realRoadCoords[currentIndex + 1];
        const interpLng = startPt[0] + (endPt[0] - startPt[0]) * remainder;
        const interpLat = startPt[1] + (endPt[1] - startPt[1]) * remainder;
        currentPath.push([interpLng, interpLat]);
      }
      setDrawnMainRoute(currentPath);

      // --- B. ANIMATE THE THIN FEEDER LINES ---
      // We calculate the exact pixel position of the thin line as it grows towards the city
      const currentFeederLines = baseFeederLines.map((line) => {
        // Easing curve makes the thin lines "shoot out" naturally
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);
        
        const currentLng = line.start.lng + (line.end.lng - line.start.lng) * easeProgress;
        const currentLat = line.start.lat + (line.end.lat - line.start.lat) * easeProgress;
        
        return {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [line.start.lng, line.start.lat], // Start at Hub
              [currentLng, currentLat],         // Grow to current point
            ],
          },
        };
      });
      
      setDrawnFeederFeatures(currentFeederLines as GeoJSON.Feature[]);

      // Keep looping until progress hits 100%
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateNetwork);
      }
    };

    animationFrameId = requestAnimationFrame(animateNetwork);
    return () => cancelAnimationFrame(animationFrameId);
  }, [realRoadCoords]);

  // Format GeoJSON for Mapbox
  const animatedMainRouteGeoJSON: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: drawnMainRoute.length > 1 ? [
      { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: drawnMainRoute } }
    ] : [],
  };

  const animatedFeederGeoJSON: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: drawnFeederFeatures,
  };

  const currentTruckPosition = drawnMainRoute.length > 0 ? drawnMainRoute[drawnMainRoute.length - 1] : null;

  return (
    <div className="relative w-full h-full">
      <Map center={[79.88, 6.92]} zoom={10.2}>
        
        {/* 1. The Light Green Outer Polygon */}
        <MapGeoJSON
          data={coverageArea}
          fillPaint={{
            "fill-color": "#10b981", 
            "fill-opacity": 0.08, 
          }}
          linePaint={{
            "line-color": "#10b981",
            "line-width": 1.5,
            "line-dasharray": [4, 4],
            "line-opacity": 0.5,
          }}
        />

        {/* 2. THE ANIMATED THIN FEEDER NETWORK */}
        <MapGeoJSON
          data={animatedFeederGeoJSON}
          fillPaint={{ "fill-opacity": 0 }}
          linePaint={{
            "line-color": "#34d399", // Lighter emerald
            "line-width": 1.5,       // THIN lines for the sub-cities
            "line-opacity": 0.5,    
            "line-dasharray": [2, 3], // Distinctive dotted pattern
          }}
        />

        {/* 3. THE ANIMATED THICK MAIN ARTERY */}
        <MapGeoJSON
          data={animatedMainRouteGeoJSON}
          fillPaint={{ "fill-opacity": 0 }} // Fixes grey polygon bug
          linePaint={{
            "line-color": "#059669", // Darker, bold Emerald Green
            "line-width": 3.5,       // THICKER line to show it's the main route
            "line-opacity": 1,
          }}
        />

        {/* 4. LIVE TRUCK TRACKER */}
        {currentTruckPosition && (
           <MapMarker longitude={currentTruckPosition[0]} latitude={currentTruckPosition[1]}>
             <MarkerContent>
               <div className="relative flex h-6 w-6 items-center justify-center -mt-3 -ml-3">
                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80"></span>
                 <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 border-[2px] border-white shadow-lg">
                   <div className="h-1.5 w-1.5 bg-white rounded-full" />
                 </div>
               </div>
             </MarkerContent>
           </MapMarker>
        )}

        {/* 5. All Service Area Dots */}
        {locations.map((location) => (
          <MapMarker
            key={location.id}
            longitude={location.lng}
            latitude={location.lat}
          >
            <MarkerContent>
              <div className="h-2.5 w-2.5 rounded-full bg-white border-[2.5px] border-emerald-400 shadow-sm opacity-90 hover:scale-150 transition-transform cursor-pointer"></div>
            </MarkerContent>
            <MarkerTooltip>{location.name}</MarkerTooltip>
          </MapMarker>
        ))}
      </Map>

      {/* Floating Status Badge */}
      <div className="absolute bottom-8 left-4 sm:bottom-8 sm:left-8 z-10 flex items-center gap-2 rounded-full bg-white/95 dark:bg-black/90 px-4 py-2 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 shadow-xl backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50">
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
        </span>
        Live Logistics Network
      </div>
    </div>
  );
}