import { useState, useEffect } from 'react';
import CyberMap from './CyberMap';
import { Monitor, ShieldCheck, Zap, Settings, CheckCircle2, Mail, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

const SocialIcons = ({ size = 20, variant = 'default' }) => (
  <div className={`social-links-container ${variant === 'nav' ? 'social-links-nav' : ''}`}>
    <a href="#" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="Instagram">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    </a>
    <a href="#" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="Facebook">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    </a>
    <a href="#" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="WhatsApp">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </a>
    <a href="#" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="TikTok">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
    </a>
  </div>
);

const AnimatedTitle = () => {
  return (
    <div className="simple-title-container">
      <motion.h1 
        className="simple-main-title"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Punto Repair
      </motion.h1>
      <motion.p 
        className="simple-subtitle"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Resolviendo lo imposible, al instante.
      </motion.p>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');
  const [locationBlink, setLocationBlink] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const goToLocation = () => {
    const locationSection = document.getElementById('ubicacion');
    if (!locationSection) return;

    setLocationBlink(true);
    locationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => setLocationBlink(false), 1200);
  };

  return (
    <>
      <CyberMap onTargetClick={goToLocation} />
      <button
        type="button"
        className="background-map-point"
        onClick={goToLocation}
        aria-label="Ir a donde nos ubicamos"
      />
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <Monitor size={28} color="var(--accent)" />
          Punto<span>Repair</span>
        </div>
        <div className="nav-right">
          <SocialIcons size={18} variant="nav" />
          <button className="theme-toggle" onClick={toggleTheme} title="Cambiar Tema">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <button className="btn-primary">Habla con nosotros</button>
        </div>
      </nav>

      {/* Main Layout Overlay */}
      <main className="main-content">
        
        <section className="hero split-layout">
          <div className="hero-left">
            <AnimatedTitle />
            <motion.div 
              className="badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Especialistas en Hardware & Software
            </motion.div>
            <motion.p 
              className="slogan large"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Excelencia y Rapidez en Soporte Técnico.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button className="btn-primary">Contactar Soporte</button>
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="plans-section">
          <h2 className="section-title">Planes de Mantenimiento</h2>
          <div className="plans-grid">

            {/* Plan 1 */}
            <div className="plan-card">
              <div className="plan-icon">
                <Settings size={40} />
              </div>
              <h3 className="plan-name">Básico</h3>
              <div className="plan-price">$24.990<span>/servicio</span></div>
              <ul className="plan-features">
                <li><CheckCircle2 size={18} className="feature-check" /> Formateo e instalación de SO</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Limpieza de virus y malware</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Respaldo hasta 50GB</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Instalación de drivers</li>
              </ul>
              <button className="btn-primary">Elegir Plan</button>
            </div>

            {/* Plan 2 */}
            <div className="plan-card popular">
              <div className="popular-badge">Más Elegido</div>
              <div className="plan-icon">
                <Zap size={40} />
              </div>
              <h3 className="plan-name">Gamer / Pro</h3>
              <div className="plan-price">$45.990<span>/servicio</span></div>
              <ul className="plan-features">
                <li><CheckCircle2 size={18} className="feature-check" /> Mantenimiento térmico (Pasta CPU/GPU)</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Optimización de BIOS / Undervolt</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Gestión de cables (Cable management)</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Instalación de hardware nuevo</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Soporte remoto 30 días</li>
              </ul>
              <button className="btn-primary solid">Elegir Plan</button>
            </div>

            {/* Plan 3 */}
            <div className="plan-card">
              <div className="plan-icon">
                <ShieldCheck size={40} />
              </div>
              <h3 className="plan-name">Corporativo</h3>
              <div className="plan-price">$89.900<span>/mensual</span></div>
              <ul className="plan-features">
                <li><CheckCircle2 size={18} className="feature-check" /> Mantenimiento preventivo mensual</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Visitas presenciales ilimitadas</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Seguridad de red y firewall</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Recuperación avanzada de datos</li>
                <li><CheckCircle2 size={18} className="feature-check" /> Auditoriás de software corporativo</li>
              </ul>
              <button className="btn-primary">Elegir Plan</button>
            </div>

          </div>
        </section>

        {/* Brands Carousel Section */}
        <section className="brands-section">
          <h2 className="section-title">Las marcas que trabajamos</h2>
          <div className="carousel-container brands-carousel">
            <div className="carousel-track brands-track">
              {/* Brand Logos as clickable links */}
              {[
                { name: "Apple", link: "#" },
                { name: "ASUS", link: "#" },
                { name: "MSI", link: "#" },
                { name: "Lenovo", link: "#" },
                { name: "HP", link: "#" },
                { name: "Dell", link: "#" },
                { name: "Acer", link: "#" },
                { name: "Samsung", link: "#" }
              ].map((brand, i) => (
                <a key={i} href={brand.link} className="brand-logo marquee-item" target="_blank" rel="noopener noreferrer">
                  {brand.name}
                </a>
              ))}
              {/* Duplicated for infinite loop */}
              {[
                { name: "Apple", link: "#" },
                { name: "ASUS", link: "#" },
                { name: "MSI", link: "#" },
                { name: "Lenovo", link: "#" },
                { name: "HP", link: "#" },
                { name: "Dell", link: "#" },
                { name: "Acer", link: "#" },
                { name: "Samsung", link: "#" }
              ].map((brand, i) => (
                <a key={`dup-${i}`} href={brand.link} className="brand-logo marquee-item" target="_blank" rel="noopener noreferrer">
                  {brand.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Our Work Carousel */}
        <section className="work-section">
          <h2 className="section-title">Nuestro Trabajo</h2>
          <div className="carousel-container">
            <div className="carousel-track work-track">
              {/* Default placeholders, user will replace with their own images later */}
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80" alt="PC Build 1" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80" alt="PC Build 2" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1624704705307-b088bd396bb3?auto=format&fit=crop&w=600&q=80" alt="Hardware Repair" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1568283626989-13824bc8ef6e?auto=format&fit=crop&w=600&q=80" alt="GPU Repair" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80" alt="Motherboard Fix" />
              </div>
              {/* Duplicated images for infinite marquee effect */}
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80" alt="PC Build 1" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80" alt="PC Build 2" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1624704705307-b088bd396bb3?auto=format&fit=crop&w=600&q=80" alt="Hardware Repair" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1568283626989-13824bc8ef6e?auto=format&fit=crop&w=600&q=80" alt="GPU Repair" />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80" alt="Motherboard Fix" />
              </div>
            </div>
          </div>
        </section>

        <section id="ubicacion" className={`location-section ${locationBlink ? 'location-section-blink' : ''}`}>
          <h2 className="section-title">Donde nos ubicamos</h2>
          <p className="location-subtitle">Atencion presencial en Curico y soporte para toda la region.</p>
          <div className="location-map-wrapper">
            <iframe
              title="Ubicacion Punto Repair"
              src="https://www.google.com/maps?q=Curic%C3%B3%2C%20Chile&z=14&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

      </main>

      {/* Footer / Contact */}
      <footer className="footer-section">
        <h2 className="footer-title">Contáctanos</h2>
        <SocialIcons size={32} />
        <div className="email-contact">
          <Mail size={20} />
          <span>contacto@puntorepair.cl</span>
        </div>
      </footer>
    </>
  );
}

export default App;
