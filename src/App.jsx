import { useState, useEffect, useRef } from 'react';
import CyberMap from './CyberMap';
import { Monitor, ShieldCheck, Zap, Settings, CheckCircle2, Mail, Sun, Moon, ChevronLeft, ChevronRight, Globe, Wrench, Eye, Users, Star } from 'lucide-react';
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

const StatsBanner = () => {
  return (
    <div className="stats-banner-wrapper">
      <div className="stats-banner">
        <div className="stat-item">
          <Eye size={36} className="stat-icon" />
          <div className="stat-value">2,004</div>
          <div className="stat-label">VISITAS</div>
        </div>
        <div className="stat-item">
          <Users size={36} className="stat-icon" />
          <div className="stat-value">300+</div>
          <div className="stat-label">CLIENTES FELICES</div>
        </div>
        <div className="stat-item">
          <Star size={36} className="stat-icon" />
          <div className="stat-value">7.0</div>
          <div className="stat-label">CALIFICACIÓN</div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');
  const [locationBlink, setLocationBlink] = useState(false);
  const carouselRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    let animationId;
    const scroll = () => {
      if (carouselRef.current && !isHovered.current) {
        carouselRef.current.scrollLeft += 1;
        
        // Loop back seamlessly if scrolled past the first set of items
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 500;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

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

        <StatsBanner />

        {/* Services Section */}
        <section className="plans-section">
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

            <div className="plan-card">
              <div className="plan-icon">
                <Globe size={40} />
              </div>
              <h3 className="plan-name">Desarrollo Web</h3>
              <p className="service-text">
                Diseño y desarrollo de páginas web modernas, optimizadas y adaptadas a tu negocio.<br/><br/>
                Creamos sitios informativos, catálogos o páginas de servicios con diseño profesional y enfoque en clientes.
              </p>
            </div>

          </div>
        </section>

        {/* Brands Carousel Section */}
        <section className="brands-section">
          <h2 className="section-title">Las marcas que trabajamos</h2>
          <div 
            className="brands-carousel-wrapper" 
            onMouseEnter={() => isHovered.current = true} 
            onMouseLeave={() => isHovered.current = false}
          >
            <button className="carousel-arrow left" onClick={() => scrollCarousel('left')} aria-label="Desplazar a la izquierda">
              <ChevronLeft size={28} />
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
            <button className="carousel-arrow right" onClick={() => scrollCarousel('right')} aria-label="Desplazar a la derecha">
              <ChevronRight size={28} />
            </button>
          </div>
        </section>

        {/* Features Text Section */}
        <section className="features-text-section">
          <motion.div 
            className="features-statement-container"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
            }}
          >
            <h2 className="features-statement">
              <span className="statement-highlight">TU PUNTO</span> en un solo lugar. 
              Servicio técnico, electrónica y redes. 
              Expertos en tecnología y conectividad.<br className="statement-break" />
              <span className="statement-highlight">REPARACIÓN</span> integral y segura. 
              Atención a domicilio.<br className="statement-break" />
              <span className="statement-highlight">SOLUCIONAMOS</span> de forma preventiva. 
              Diagnóstico de fallas.<br className="statement-break" />
              <span className="statement-highlight">TU MUNDO</span> digital, siempre operativo. 
              Venta de accesorios <span className="statement-highlight">AL ALCANCE DE TU BOLSILLO</span>. 
              Reciclado circular.
            </h2>
          </motion.div>
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
