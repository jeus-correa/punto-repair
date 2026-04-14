import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { useEffect, useState, useRef, useMemo } from 'react';
import './CyberMap.css';

// URL to TopoJSON of the world
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Target: Curicó, Chile
const targetCoords = [-71.2858, -34.9828];

// Use standard viewport percentage for origins
const generateRandomOriginViewport = () => {
  const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
  let x, y;
  
  switch(edge) {
    case 0: // Top
      x = Math.random() * 100;
      y = -10;
      break;
    case 1: // Right
      x = 110;
      y = Math.random() * 100;
      break;
    case 2: // Bottom
      x = Math.random() * 100;
      y = 110;
      break;
    default: // Left
      x = -10;
      y = Math.random() * 100;
      break;
  }
  return { x, y };
};

export default function CyberMap({ onConnection, onImpact }) {
  const [activeConnections, setActiveConnections] = useState([]);
  const [targetPoint, setTargetPoint] = useState({ x: window.innerWidth * 0.58, y: window.innerHeight * 0.52 });
  const markerRef = useRef(null);

  // Keep target point precisely on the marker using actual DOM position
  useEffect(() => {
    const updateTarget = () => {
      if (markerRef.current) {
        const rect = markerRef.current.getBoundingClientRect();
        setTargetPoint({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };
    
    // Initial update and resize listener
    updateTarget();
    // Use a small timeout to ensure map projection has rendered before getting coords
    setTimeout(updateTarget, 100);
    window.addEventListener('resize', updateTarget);
    return () => window.removeEventListener('resize', updateTarget);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const attackCount = Math.floor(Math.random() * 3) + 2; 
      const nextAttacks = [];
      
      for(let i=0; i<attackCount; i++) {
        // Convert the 0-100 percentages to actual pixel values across the screen
        const rawOrigin = generateRandomOriginViewport();
        const pixelOrigin = {
          x: (rawOrigin.x / 100) * window.innerWidth,
          y: (rawOrigin.y / 100) * window.innerHeight
        };

        nextAttacks.push({
          id: Math.random().toString(), 
          origin: pixelOrigin,
          intensity: Math.random(),
          side: Math.random() > 0.5 ? 1 : -1
        });

        if (onImpact) {
          setTimeout(() => {
            onImpact();
          }, 1500); 
        }
      }

      setActiveConnections(nextAttacks);
      if (onConnection) onConnection(nextAttacks.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [onConnection, onImpact]);

  const staticMapLayer = useMemo(() => (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 1100,
        center: [-80, -38] 
      }}
      className="map-svg"
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            if (geo.properties.name !== "Chile") return null;
            
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--hud-bg)"
                stroke="var(--accent)"
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
          fill="var(--accent-glow)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 2], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
        <circle ref={markerRef} r={4} fill="var(--accent)" style={{ filter: "drop-shadow(0 0 10px var(--accent))" }} />
      </Marker>
    </ComposableMap>
  ), []);

  return (
    <div className="cyber-map-container">
      {staticMapLayer}

      {/* SVG Overlay using EXACT Pixel Coordinates */}
      <svg className="attack-overlay" style={{ width: '100%', height: '100%' }}>
        {activeConnections.map((conn) => {
          const dx = targetPoint.x - conn.origin.x;
          const dy = targetPoint.y - conn.origin.y;
          const midX = (conn.origin.x + targetPoint.x) / 2;
          const midY = (conn.origin.y + targetPoint.y) / 2;
          
          // Severe parabolic fall
          const arcAmount = 0.5 + (conn.intensity * 0.5);
          const offsetX = -dy * arcAmount * conn.side;
          const offsetY = dx * arcAmount * conn.side;

          const ctrlX = midX + offsetX;
          const ctrlY = midY + offsetY;

          const pathData = `M ${conn.origin.x} ${conn.origin.y} Q ${ctrlX} ${ctrlY} ${targetPoint.x} ${targetPoint.y}`;

          return (
            <g key={conn.id}>
              {/* Trail */}
              <motion.path
                d={pathData}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0.4, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                style={{ filter: "blur(2px)" }}
              />
              {/* Comet Head */}
              <motion.path
                d={pathData}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={4}
                strokeLinecap="round"
                initial={{ pathLength: 0.01, pathOffset: 0 }}
                animate={{ pathOffset: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
