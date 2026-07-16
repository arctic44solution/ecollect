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
            // Katunayake
            [79.8847, 7.1699],

            // Katana
            [79.8915, 7.2127],

            // Minuwangoda
            [79.9475, 7.1667],

            // Udugampola
            [79.9845, 7.1267],

            // Yakkala
            [80.05, 7.1167],

            // Attanagalla
            // [80.1397, 7.1322],

            // Dompe
            [80.0939, 6.9786],

            // Kosgama
            [80.1472, 6.9369],

            // Meepe
            [80.1656, 6.8617],

            // Padukka
            [80.1233, 6.8456],

            // Homagama
            [80.0006, 6.8428],

            // Mattegoda
            [79.9656, 6.8167],

            // Piliyandala
            [79.9222, 6.8017],

            // Moratuwa
            //[79.9, 6.773],

            [79.8816, 6.773],

            // Mount Lavinia
            [79.8697, 6.8344],

            // Wellawatta
            [79.8683, 6.8747],

            // Kollupitiya
            [79.85, 6.906],

            // Fort
            [79.8612, 6.9344],

            // Mattakkuliya
            [79.8731, 6.9694],

            // Mabola
            [79.8978, 6.9628],

            // Wattala
            [79.8897, 6.9892],

            // Ja-Ela
            [79.8917, 7.0747],

            // Close polygon back to start
            [79.8847, 7.1699],
          ],
        ],
      },
    },
  ],
};

const locations = [
  // Gampaha District
  //   {
  //     id: 1,
  //     name: "Negombo",
  //     lat: 7.2083,
  //     lng: 79.8358,
  //   },
  {
    id: 2,
    name: "Gampaha",
    lat: 7.0917,
    lng: 79.9992,
  },
  {
    id: 3,
    name: "Kelaniya",
    lat: 6.9553,
    lng: 79.922,
  },
  {
    id: 4,
    name: "Wattala",
    lat: 6.9892,
    lng: 79.8917,
  },
  {
    id: 5,
    name: "Minuwangoda",
    lat: 7.1667,
    lng: 79.95,
  },
  {
    id: 6,
    name: "Biyagama",
    lat: 6.9405,
    lng: 80.0154,
  },
  {
    id: 8,
    name: "Yakkala",
    lat: 7.1167,
    lng: 80.05,
  },
  {
    id: 9,
    name: "Katana",
    lat: 7.1667,
    lng: 79.8833,
  },
  {
    id: 10,
    name: "Mahara",
    lat: 7.0013,
    lng: 79.9497,
  },
  //   {
  //     id: 11,
  //     name: "Dompe",
  //     lat: 6.9833,
  //     lng: 80.15,
  //   },
  {
    id: 12,
    name: "Malwana",
    lat: 6.9433,
    lng: 80.0306,
  },
  {
    id: 13,
    name: "Makola",
    lat: 6.9736,
    lng: 79.9639,
  },
  {
    id: 14,
    name: "Weliweriya",
    lat: 7.0307,
    lng: 80.0512,
  },
  {
    id: 15,
    name: "Udugampola",
    lat: 7.1333,
    lng: 79.9667,
  },
  {
    id: 16,
    name: "Thihariya",
    lat: 7.0167,
    lng: 80.0667,
  },
  {
    id: 17,
    name: "Mabola",
    lat: 6.988,
    lng: 79.88,
  },

  // Colombo District
  {
    id: 18,
    name: "Colombo 01 - Fort / Kotuwa",
    lat: 6.9344,
    lng: 79.8428,
  },
  {
    id: 19,
    name: "Colombo 02 - Slave Island",
    lat: 6.9275,
    lng: 79.85,
  },
  {
    id: 20,
    name: "Colombo 03 - Colpetty / Kollupitiya",
    lat: 6.906,
    lng: 79.85,
  },
  {
    id: 21,
    name: "Colombo 04 - Bambalapitiya",
    lat: 6.8886,
    lng: 79.8565,
  },
  {
    id: 22,
    name: "Colombo 05 - Narahenpita / Havelock Town",
    lat: 6.89,
    lng: 79.875,
  },
  {
    id: 23,
    name: "Colombo 06 - Wellawatta",
    lat: 6.8742,
    lng: 79.8605,
  },
  {
    id: 24,
    name: "Colombo 07 - Cinnamon Gardens",
    lat: 6.912,
    lng: 79.878,
  },
  {
    id: 25,
    name: "Colombo 08 - Borella",
    lat: 6.9167,
    lng: 79.8778,
  },
  {
    id: 26,
    name: "Colombo 09 - Dematagoda",
    lat: 6.9333,
    lng: 79.8833,
  },
  {
    id: 27,
    name: "Colombo 10 - Maradana",
    lat: 6.9275,
    lng: 79.8647,
  },
  {
    id: 28,
    name: "Colombo 11 - Pettah",
    lat: 6.9365,
    lng: 79.8487,
  },
  {
    id: 29,
    name: "Colombo 12 - Hulftsdorp",
    lat: 6.936,
    lng: 79.862,
  },
  {
    id: 30,
    name: "Colombo 13 - Kotahena",
    lat: 6.95,
    lng: 79.86,
  },
  {
    id: 31,
    name: "Colombo 14 - Grandpass",
    lat: 6.9508,
    lng: 79.875,
  },
  {
    id: 32,
    name: "Colombo 15 - Mattakkuliya",
    lat: 6.97,
    lng: 79.87,
  },

  // Sri Jayawardenepura Kotte
  {
    id: 33,
    name: "Sri Jayawardenepura Kotte",
    lat: 6.8947,
    lng: 79.9025,
  },
  {
    id: 34,
    name: "Rajagiriya",
    lat: 6.9061,
    lng: 79.897,
  },
  {
    id: 35,
    name: "Nugegoda",
    lat: 6.8649,
    lng: 79.8997,
  },

  // South Colombo
  {
    id: 36,
    name: "Dehiwala",
    lat: 6.8528,
    lng: 79.8656,
  },
  {
    id: 37,
    name: "Mount Lavinia",
    lat: 6.8389,
    lng: 79.8636,
  },
  {
    id: 38,
    name: "Ratmalana",
    lat: 6.8211,
    lng: 79.8862,
  },
  {
    id: 39,
    name: "Moratuwa",
    lat: 6.773,
    lng: 79.8816,
  },
  {
    id: 40,
    name: "Kalubowila",
    lat: 6.8667,
    lng: 79.8778,
  },

  // East Colombo
  {
    id: 41,
    name: "Battaramulla",
    lat: 6.9022,
    lng: 79.9186,
  },
  {
    id: 42,
    name: "Pelawatte",
    lat: 6.8833,
    lng: 79.9333,
  },
  {
    id: 43,
    name: "Thalawathugoda",
    lat: 6.8728,
    lng: 79.9583,
  },
  {
    id: 44,
    name: "Malabe",
    lat: 6.9068,
    lng: 79.9573,
  },
  {
    id: 45,
    name: "Kaduwela",
    lat: 6.9347,
    lng: 79.9847,
  },
  {
    id: 46,
    name: "Athurugiriya",
    lat: 6.8731,
    lng: 80.035,
  },
  {
    id: 47,
    name: "Homagama",
    lat: 6.844,
    lng: 80.0031,
  },

  // Other suburbs
  {
    id: 48,
    name: "Kolonnawa",
    lat: 6.9333,
    lng: 79.9,
  },
  {
    id: 49,
    name: "Maharagama",
    lat: 6.848,
    lng: 79.9265,
  },
  {
    id: 50,
    name: "Kottawa",
    lat: 6.8175,
    lng: 79.9583,
  },
  {
    id: 51,
    name: "Pannipitiya",
    lat: 6.8333,
    lng: 79.95,
  },
  {
    id: 52,
    name: "Piliyandala",
    lat: 6.801,
    lng: 79.922,
  },
];

export function CoverageMap() {
  return (
    <div className="h-[420px] w-full rounded-xl overflow-hidden">
      <Map center={[79.965, 6.95]} zoom={9}>
        <MapGeoJSON
          data={coverageArea}
          fillPaint={{
            "fill-color": "#22c55e",
            "fill-opacity": 0.25,
          }}
          linePaint={{
            "line-color": "#16a34a",
            "line-width": 3,
          }}
        />

        {locations.map((location) => (
          <MapMarker
            key={location.id}
            longitude={location.lng}
            latitude={location.lat}
          >
            <MarkerContent>
              <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>{location.name}</MarkerTooltip>
            <MarkerPopup>
              <div className="space-y-1">
                <p className="text-foreground font-medium">{location.name}</p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
