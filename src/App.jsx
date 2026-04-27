import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import CyberGlobeFeatures from './CyberGlobeFeatures';
import CyberMap from './CyberMap';
import { Monitor, Zap, Mail, Sun, Moon, ChevronLeft, ChevronRight, Globe, Eye, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

const BRANDS_LIST = [
  { name: "Apple", link: "https://www.apple.com/cl/mac/" },
  { name: "ASUS", link: "https://www.asus.com/cl/" },
  { name: "MSI", link: "https://www.msi.com/index.php" },
  { name: "Lenovo", link: "https://www.lenovo.com/cl/es/" },
  { name: "HP", link: "https://www.hp.com/cl-es/home.html" },
  { name: "Dell", link: "https://www.dell.com/es-cl" },
  { name: "Acer", link: "https://www.acerstore.cl/" },
  { name: "Samsung", link: "https://www.samsung.com/cl/" },
  { name: "LG", link: "https://www.lg.com/cl/" },
  { name: "Intel", link: "https://www.intel.com/" },
  { name: "AMD", link: "https://www.amd.com/es" },
  { name: "eMachines", link: "https://www.emachines.com/" },
  { name: "NVIDIA", link: "https://www.nvidia.com/es-la/" },
  { name: "Kingston", link: "https://www.kingston.com/es" },
  { name: "Western Digital", link: "https://www.westerndigital.com/es-cl" },
  { name: "Casio", link: "https://www.casio.com/" },
  { name: "TP-Link", link: "https://www.tp-link.com/cl/" },
  { name: "Huawei", link: "https://consumer.huawei.com/cl/" },
  { name: "Ubiquiti", link: "https://www.ui.com/" },
  { name: "MikroTik", link: "https://mikrotik.com/" },
  { name: "Alienware", link: "https://www.dell.com/es-cl/gaming/alienware", iconDomain: "alienware.com" },
  { name: "Razer", link: "https://www.razer.com/" },
  { name: "Microsoft", link: "https://www.microsoft.com/es-cl" },
  { name: "Positivo", link: "https://www.positivotecnologia.com.br/" },
  { name: "Fujitsu", link: "https://www.fujitsu.com/" },
  { name: "Xiaomi", link: "https://www.mi.com/cl/" },
  { name: "Honor", link: "https://www.hihonor.com/cl/" },
  { name: "Dynabook", link: "https://dynabook.com/" },
  { name: "Panasonic", link: "https://www.panasonic.com/es/consumer/todos-los-productos-panasonic.html" },
  { name: "Sony", link: "https://www.sony.cl/" },
  { name: "VAIO", link: "https://www.vaio.com/" },
  { name: "Olidata", link: "https://olidata.com/" },
  { name: "Toshiba", link: "https://www.global.toshiba/jp/top.html" },
  { name: "Unix", link: "https://www.unix.org/" },
  { name: "Corsair", link: "https://www.corsair.com/" },
  { name: "Gigabyte", link: "https://www.gigabyte.com/" },
  { name: "macOS", link: "https://www.apple.com/macos/" },
  { name: "Google", link: "https://www.google.com/" },
  { name: "Adobe", link: "https://www.adobe.com/" },
  { name: "OKI", link: "https://www.oki.com/" },
  { name: "Zebra", link: "https://www.zebra.com/" },
  { name: "Kyocera", link: "https://www.kyocera.com/" },
  { name: "Ricoh", link: "https://www.ricoh.com/" },
  { name: "D-Link", link: "https://www.dlink.com/" },
  { name: "Linux", link: "https://www.linux.org/" },
  { name: "Fujitel", link: "https://www.rcl.cl/brand/19-fujitel", iconDomain: "fujitel.cl" },
  { name: "Master-G", link: "https://www.masterg.cl/" },
  { name: "Maxwell", link: "https://maxwell.com/" },
  { name: "Motorola", link: "https://www.motorola.cl/" },
  { name: "Epson", link: "https://epson.cl/" },
  { name: "ViewSonic", link: "https://www.viewsonic.com/" },
  { name: "Linkmade", link: "https://linkmade.cl/" },
  { name: "Philips", link: "https://www.philips.cl/" },
  { name: "IBM", link: "https://www.ibm.com/" },
  { name: "Windows", link: "https://www.microsoft.com/windows" },
  { name: "Qualcomm", link: "https://www.qualcomm.com/" },
  { name: "MediaTek", link: "https://www.mediatek.com/" },
  { name: "Micron", link: "https://www.micron.com/" }
];

const FEATURES_STATEMENT_LINES = [
  {
    segments: [
      { highlight: true, text: 'TU PUNTO REPARACIÓN' },
      {
        highlight: false,
        text: ' en un solo lugar. Servicio técnico, electrónica y redes. Expertos en tecnología y conectividad.',
      },
    ],
  },
  {
    segments: [
      { highlight: true, text: 'SOLUCIONAMOS' },
      { highlight: false, text: ' de forma preventiva y correctiva. Diagnóstico de fallas y reparación integral.' },
    ],
  },
  {
    segments: [
      { highlight: true, text: 'TU MUNDO' },
      { highlight: false, text: ' digital, siempre operativo. Soporte especializado para tu hogar o empresa.' },
    ],
  },
  {
    segments: [
      { highlight: true, text: 'AL ALCANCE DE TU BOLSILLO' },
      { highlight: false, text: 'La mejor tecnología a precios competitivos con enfoque en reciclado circular.' },
    ],
  },
];

const SYSTEMCD_WEB_URL = 'https://systemcd.cl/';
const TUESPACIOIMPECABLE_WEB_URL = 'https://tuespacioimpecable.cl/';
const NORAMBUENASERVICIOS_WEB_URL = 'https://norambuenaservicios.cl/';

const FOOTER_SERVICE_LINKS = [
  { label: 'Desarrollo Web', href: SYSTEMCD_WEB_URL },
  { label: 'Asesoramiento de limpieza', href: TUESPACIOIMPECABLE_WEB_URL },
  { label: 'Entretención y logística', href: NORAMBUENASERVICIOS_WEB_URL },
];

/** Evita `new URL` en cada render del carrusel de marcas */
const BRANDS_WITH_DOMAIN = BRANDS_LIST.map((b) => ({
  ...b,
  domain: b.iconDomain || new URL(b.link).hostname,
}));

const WORK_SLIDES = [
  { src: '/Images/puntorepair1.png', alt: 'Trabajo Punto Repair 1' },
  { src: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80', alt: 'PC Build' },
  { src: '/Images/puntorepair2.png', alt: 'Trabajo Punto Repair 2' },
  { src: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80', alt: 'Gaming Setup' },
  { src: '/Images/puntorepair3.png', alt: 'Trabajo Punto Repair 3' },
  { src: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80', alt: 'Technical Repair' },
];

const SocialIcons = memo(function SocialIcons({ size = 20, variant = 'default' }) {
  return (
  <div className={`social-links-container ${variant === 'nav' ? 'social-links-nav' : ''}`}>
    <a href="https://www.instagram.com/punto_repair/" target="_blank" rel="noopener noreferrer" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="Instagram">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    </a>
    <a href="https://www.facebook.com/profile.php?id=61562935890716" target="_blank" rel="noopener noreferrer" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="Facebook">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    </a>
    <a href="https://wa.me/56990872747" target="_blank" rel="noopener noreferrer" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="WhatsApp">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </a>
    <a href="https://www.tiktok.com/@punto_repair?lang=es" target="_blank" rel="noopener noreferrer" className={`social-icon-link ${variant === 'nav' ? 'social-icon-link-nav' : ''}`} title="TikTok">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
    </a>
  </div>
  );
});

const AnimatedTitle = memo(function AnimatedTitle() {
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
});

const StatsBanner = memo(function StatsBanner({ visits }) {
  return (
    <div className="stats-banner-wrapper">
      <div className="stats-banner">
        <div className="stat-item">
          <Eye size={36} className="stat-icon" />
          <div className="stat-value">{visits > 0 ? visits.toLocaleString() : '2,004'}</div>
          <div className="stat-label">VISITAS</div>
        </div>
        <div className="stat-item">
          <Users size={36} className="stat-icon" />
          <div className="stat-value">300+</div>
          <div className="stat-label">CLIENTES FELICES</div>
        </div>
        <div className="stat-item">
          <Star size={36} className="stat-icon" />
          <div className="stat-value">5.0</div>
          <div className="stat-label">CALIFICACIÓN</div>
        </div>
      </div>
    </div>
  );
});

function App() {
  const [theme, setTheme] = useState('light');
  const [locationBlink, setLocationBlink] = useState(false);
  const [visits, setVisits] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);
  const carouselRef = useRef(null);
  const isHovered = useRef(false);
  const hasCountedRef = useRef(false);

  useEffect(() => {
    // Prevent StrictMode double-counting (React 18+ runs effects twice in dev)
    if (hasCountedRef.current) return;
    hasCountedRef.current = true;

    const STORAGE_KEY = 'punto_repair_visits';
    const BASE_VISITS = 2004;

    // Read current count, increment +1, save, display
    const stored = localStorage.getItem(STORAGE_KEY);
    const newVisits = (stored ? parseInt(stored, 10) : BASE_VISITS) + 1;
    localStorage.setItem(STORAGE_KEY, newVisits.toString());
    setVisits(newVisits);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      if (document.visibilityState === 'visible' && carouselRef.current && !isHovered.current) {
        const el = carouselRef.current;
        el.scrollLeft += 4;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollCarousel = useCallback((direction) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -400 : 400,
      behavior: 'smooth',
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const goToLocation = useCallback(() => {
    const locationSection = document.getElementById('ubicacion');
    if (!locationSection) return;

    setLocationBlink(true);
    locationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => setLocationBlink(false), 1200);
  }, []);

  const handleBrandsMouseEnter = useCallback(() => {
    isHovered.current = true;
  }, []);
  const handleBrandsMouseLeave = useCallback(() => {
    isHovered.current = false;
  }, []);

  const setFeatureHover = useCallback((idx) => {
    setActiveFeature(idx);
  }, []);
  const clearFeatureHover = useCallback(() => {
    setActiveFeature(null);
  }, []);

  const brandsTrack = useMemo(
    () => (
      <>
        {BRANDS_WITH_DOMAIN.map((brand) => (
          <a key={brand.name} href={brand.link} className="brand-logo marquee-item" target="_blank" rel="noopener noreferrer">
            <img src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`} alt={`${brand.name} logo`} className="brand-icon" />
            {brand.name}
          </a>
        ))}
        {BRANDS_WITH_DOMAIN.map((brand) => (
          <a key={`${brand.name}-dup`} href={brand.link} className="brand-logo marquee-item" target="_blank" rel="noopener noreferrer">
            <img src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`} alt={`${brand.name} logo`} className="brand-icon" />
            {brand.name}
          </a>
        ))}
      </>
    ),
    []
  );

  const workSlidesDoubled = useMemo(() => [...WORK_SLIDES, ...WORK_SLIDES], []);

  return (
    <>
      <CyberMap onTargetClick={goToLocation} />
      
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
          <button className="btn-primary" onClick={() => scrollToSection('servicios')}>nuestros servicios  </button>
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
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToSection('contacto')}>contactar soporte </button>
              <a 
                href="https://drive.google.com/drive/folders/19kCj4W8wj2zNLXoXHGOdQ815pVt0ixXK?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                gestor de soluciones
              </a>
            </div>
          </div>
        </section>

        <StatsBanner visits={visits} />

        {/* Services Section */}
        <section id="servicios" className="plans-section">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="plans-grid">

            <div className="plan-card">
              <div className="plan-icon">
                <Monitor size={40} />
              </div>
              <h3 className="plan-name">Equipamiento</h3>
              <p className="service-text">
                Reparación, mantenimiento y optimización de computadores, notebooks y equipos tecnológicos.<br/><br/>
                Realizamos diagnóstico, cambio de componentes (SSD, RAM, placas) y cotizaciones según tus necesidades.
              </p>
            </div>

            <div className="plan-card">
              <div className="plan-icon">
                <Zap size={40} />
              </div>
              <h3 className="plan-name">Redes</h3>
              <p className="service-text">
                Instalación, configuración y optimización de redes de internet para hogares y empresas.<br/><br/>
                Trabajamos con routers, switches y cableado estructurado, asegurando una conexión estable, rápida y segura.
              </p>
            </div>

            <div className="plan-card">
              <div className="plan-icon">
                <Mail size={40} />
              </div>
              <h3 className="plan-name">Correos Corporativos</h3>
              <p className="service-text">
                Creamos y configuramos correos empresariales personalizados con tu dominio (ej: contacto@tuempresa.cl).<br/><br/>
                Buscamos la mejor solución para tu negocio, gestionando usuarios, seguridad y acceso desde cualquier dispositivo.
              </p>
            </div>

            <a
              href={SYSTEMCD_WEB_URL}
              className="plan-card plan-card-external"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Desarrollo Web — abrir systemcd.cl"
            >
              <div className="plan-icon">
                <Globe size={40} />
              </div>
              <h3 className="plan-name">Desarrollo Web</h3>
              <p className="service-text">
                Diseño y desarrollo de páginas web modernas, optimizadas y adaptadas a tu negocio.<br/><br/>
                Creamos sitios informativos, catálogos o páginas de servicios con diseño profesional y enfoque en clientes.<br/><br/>
                <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Visitar Sitio</button>
              </p>
            </a>

          </div>
        </section>

        {/* Brands Carousel Section */}
        <section className="brands-section">
          <h2 className="section-title">Las marcas que trabajamos</h2>
          <div className="brands-carousel-wrapper" onMouseEnter={handleBrandsMouseEnter} onMouseLeave={handleBrandsMouseLeave}>
            <button 
              className="carousel-arrow left" 
              onClick={() => scrollCarousel('left')} 
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="carousel-container brands-carousel" ref={carouselRef}>
              <div className="brands-track">
                {/* Brand Logos as clickable links */}
                {BRANDS_LIST.map((brand, i) => {
                  const domain = brand.iconDomain || new URL(brand.link).hostname;
                  return (
                    <a key={i} href={brand.link} className="brand-logo marquee-item" target="_blank" rel="noopener noreferrer">
                      <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={`${brand.name} logo`} className="brand-icon" />
                      {brand.name}
                    </a>
                  );
                })}
                {/* Duplicated for infinite loop */}
                {BRANDS_LIST.map((brand, i) => {
                  const domain = brand.iconDomain || new URL(brand.link).hostname;
                  return (
                    <a key={`dup-${i}`} href={brand.link} className="brand-logo marquee-item" target="_blank" rel="noopener noreferrer">
                      <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={`${brand.name} logo`} className="brand-icon" />
                      {brand.name}
                    </a>
                  );
                })}
              </div>
            </div>
            <button 
              className="carousel-arrow right" 
              onClick={() => scrollCarousel('right')} 
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* Features Text Section with 3D Globe */}
        <section className="features-text-section">
          <div className="features-layout-container">
            
            <div className="features-globe-grid">
              {/* Left Side Features */}
              <div className="features-column left">
                {FEATURES_STATEMENT_LINES.slice(0, 2).map((line, idx) => (
                  <motion.div 
                    key={idx} 
                    className="statement-phrase modern-card"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    onMouseEnter={() => setFeatureHover(idx)}
                    onMouseLeave={clearFeatureHover}
                  >
                    <div className="statement-phrase-body">
                      {line.segments.map((seg, sIdx) => (
                        <span key={sIdx} className={seg.highlight ? 'statement-highlight' : 'statement-detail'}>
                          {seg.text}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Central Globe */}
              <div className="globe-center-area">
                <h3 className="globe-center-title">Solucionamos tu mundo Punto Repair</h3>
                <CyberGlobeFeatures activeFeature={activeFeature} />
              </div>

              {/* Right Side Features */}
              <div className="features-column right">
                {FEATURES_STATEMENT_LINES.slice(2, 4).map((line, idx) => (
                  <motion.div 
                    key={idx + 2} 
                    className="statement-phrase modern-card"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (idx + 2) * 0.2 }}
                    onMouseEnter={() => setFeatureHover(idx + 2)}
                    onMouseLeave={clearFeatureHover}
                  >
                    <div className="statement-phrase-body">
                      {line.segments.map((seg, sIdx) => (
                        <span key={sIdx} className={seg.highlight ? 'statement-highlight' : 'statement-detail'}>
                          {seg.text}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Work Carousel */}
        <section className="work-section">
          <h2 className="section-title">Nuestro Trabajo</h2>
          <div className="carousel-container">
            <div className="carousel-track work-track">
              {workSlidesDoubled.map((slide, i) => (
                <div key={`${slide.src}-${i}`} className="carousel-item">
                  <img src={slide.src} alt={slide.alt} loading="lazy" decoding="async" />
                </div>
              ))}
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
      <footer id="contacto" className="footer-section">
        <h2 className="footer-title">Contáctanos</h2>
        <SocialIcons size={32} />

        <div className="email-contact" style={{ marginTop: '10px' }}>
          <Mail size={20} />
          <span>mcanales@puntorepair.cl</span>
        </div>
        <div className="footer-other-services">
          <h3 className="footer-other-title">Otros servicios</h3>
          <div className="footer-page-links">
            {FOOTER_SERVICE_LINKS.map((item) => (
              <a
                key={item.label}
                className="btn-primary footer-page-link"
                href={item.href}
                target={item.href !== '#' ? '_blank' : undefined}
                rel={item.href !== '#' ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
