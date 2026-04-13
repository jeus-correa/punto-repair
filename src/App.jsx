import { useState } from 'react';
import CyberMap from './CyberMap';
import { Monitor, Cpu, ShieldCheck, Zap, HardDrive, Settings, CheckCircle2 } from 'lucide-react';
import './index.css';

function App() {
  return (
    <>
      <CyberMap />
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <Monitor size={28} color="#00f3ff" />
          Tech<span>Fix</span>
        </div>
        <ul className="nav-links">
          <li><a className="active">Inicio</a></li>
          <li><a>Servicios</a></li>
          <li><a>Planes</a></li>
          <li><a>Contacto</a></li>
        </ul>
        <button className="btn-primary">Agendar Diagnóstico</button>
      </nav>

      {/* Main Layout Overlay */}
      <main className="main-content">
        
        {/* Hero Section */}
        <section className="hero">
          <div className="badge">Especialistas en Hardware & Software</div>
          <h1>Soporte Técnico Especializado en Chile.</h1>
          <p>Potenciamos el rendimiento de tu equipo con diagnósticos precisos y reparaciones garantizadas. Soluciones profesionales para setups de alto rendimiento, workstations y equipos corporativos.</p>
          <div className="hero-actions">
            <button className="btn-primary solid">Ver Planes</button>
            <button className="btn-primary">Contactar Soporte</button>
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

      </main>
    </>
  );
}

export default App;
