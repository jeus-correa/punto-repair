import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import './CyberGlobe.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Curicó / Chile center approx
const chileCoords = [-71.2858, -34.9828];

export default function CyberGlobeFeatures({ activeFeature }) {
  const [rotation, setRotation] = useState([0, -20]);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotation effect (Wobble instead of full spin)
  const baseLon = 71.3;
  const baseLat = 40;

  useEffect(() => {
    let animationId;
    const startTime = Date.now() - 5000; // Offset start so it doesn't always start at 0
    
    const animate = () => {
      if (document.visibilityState === 'visible') {
        if (!isHovering) {
          // Gentle wobble side to side (+/- 25 degrees)
          const elapsed = Date.now() - startTime;
          const wobble = Math.sin(elapsed / 2000) * 25;
          setRotation([baseLon + wobble, baseLat]);
        } else {
          // Smoothly return exactly to the center of Chile when hovering
          setRotation((prev) => {
            const newLon = prev[0] + (baseLon - prev[0]) * 0.08;
            const newLat = prev[1] + (baseLat - prev[1]) * 0.08;
            return [newLon, newLat];
          });
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovering]);

  // When a feature is clicked or hovered (activeFeature), face Chile only for "TU MUNDO"
  useEffect(() => {
    if (activeFeature === 2) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, [activeFeature]);

  return (
    <div className="cyber-globe-wrapper">
      <div className="globe-container">
        {/* Glow effect behind globe */}
        <div className="globe-halo"></div>
        
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            rotate: [rotation[0], rotation[1], 0],
            scale: 240
          }}
          width={500}
          height={500}
          className="globe-svg"
        >
          {/* Sphere background/water */}
          <circle cx={250} cy={250} r={240} fill="#050a18" stroke="rgba(45, 91, 255, 0.3)" strokeWidth="1" />
          
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isChile = geo.properties.name === "Chile";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isChile ? "#00f2fe" : "rgba(45, 91, 255, 0.25)"}
                    stroke={isChile ? "#00f2fe" : "rgba(45, 91, 255, 0.4)"}
                    strokeWidth={isChile ? 2 : 0.4}
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

          {/* Pulse on Chile when active for "TU MUNDO" */}
          <AnimatePresence>
            {activeFeature === 2 && (
              <Marker coordinates={chileCoords}>
                <motion.circle
                  r={15}
                  fill="var(--accent)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <circle r={4} fill="var(--accent)" />
              </Marker>
            )}
          </AnimatePresence>
        </ComposableMap>

        {/* Tech scan line effect */}
        <div className="globe-scanline"></div>
      </div>
    </div>
  );
}
