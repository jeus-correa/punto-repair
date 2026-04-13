import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { useEffect, useState } from 'react';
import './CyberMap.css';

// URL to TopoJSON of the world
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Target: Curicó, Chile
const targetCoords = [-71.2858, -34.9828];

// Origins: Other regions/cities in Chile
const chileRegions = [
  { name: "Arica", coords: [-70.3126, -18.4783] },
  { name: "Iquique", coords: [-70.1357, -20.2208] },
  { name: "Antofagasta", coords: [-70.4000, -23.6500] },
  { name: "Copiapó", coords: [-70.3333, -27.3667] },
  { name: "La Serena", coords: [-71.2519, -29.9045] },
  { name: "Valparaíso", coords: [-71.6127, -33.0472] },
  { name: "Santiago", coords: [-70.6693, -33.4489] },
  { name: "Concepción", coords: [-73.0498, -36.8201] },
  { name: "Temuco", coords: [-72.5904, -38.7359] },
  { name: "Valdivia", coords: [-73.2459, -39.8142] },
  { name: "Puerto Montt", coords: [-72.9423, -41.4693] },
  { name: "Coyhaique", coords: [-72.0662, -45.5712] },
  { name: "Punta Arenas", coords: [-70.9167, -53.1500] }
];

export default function CyberMap() {
  const [activeConnections, setActiveConnections] = useState([]);

  // Rotate connections to simulate network traffic
  useEffect(() => {
    const interval = setInterval(() => {
      const attackCount = Math.floor(Math.random() * 4) + 1;
      const nextAttacks = [];
      const originsCopy = [...chileRegions];
      
      for(let i=0; i<attackCount; i++) {
        const randIndex = Math.floor(Math.random() * originsCopy.length);
        const origin = originsCopy.splice(randIndex, 1)[0];
        nextAttacks.push({
          ...origin,
          id: Math.random().toString(), 
        });
      }

      setActiveConnections(nextAttacks);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-map-container">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1100, // Adjusted scale so the entire length of Chile is visible
          center: [-71, -38] // Centered correctly
        }}
        className="map-svg"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isChile = geo.properties.name === "Chile";
              if (!isChile) return null;
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(0, 243, 255, 0.12)"
                  stroke="#00f3ff"
                  strokeWidth={1.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        <Marker coordinates={targetCoords}>
          <motion.circle
            r={16}
            fill="rgba(0, 243, 255, 0.2)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            r={8}
            fill="rgba(0, 243, 255, 0.4)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <circle r={3} fill="#00f3ff" style={{ filter: "drop-shadow(0 0 5px #00f3ff)" }} />
        </Marker>

        {activeConnections.map((conn) => (
          <CyberConnection
            key={conn.id}
            from={conn.coords}
            to={targetCoords}
          />
        ))}
      </ComposableMap>
    </div>
  );
}

function CyberConnection({ from, to }) {
  return (
    <>
      <Line
        from={from}
        to={to}
        stroke="rgba(0, 243, 255, 0.15)"
        strokeWidth={1}
        strokeLinecap="round"
      />
      <Line
        from={from}
        to={to}
        stroke="#00f3ff"
        strokeWidth={2}
        strokeLinecap="round"
        className="cyber-line-glow"
      />
      <Marker coordinates={from}>
         <motion.circle
              r={3}
              fill="#ff3b5c"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: [1, 2], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
         <circle r={1.5} fill="#ff3b5c" />
      </Marker>
    </>
  );
}
