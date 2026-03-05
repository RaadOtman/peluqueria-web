import { useEffect, useRef, useState } from "react";
import "./styles.css";
import CalendlyBarberos from "./CalendlyBarberos";

import logo from "./assets/logo.png";

import hero1 from "./assets/hero1.jpg";
import hero2 from "./assets/hero2.jpg";
import hero3 from "./assets/hero3.jpg";

const WHATSAPP_NUMBER = "34600111222";
const WHATSAPP_TEXT = "Hola, quiero reservar una cita 🙂";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

const services = [
  { title: "Corte clásico", desc: "Estilo tradicional, limpio y elegante." },
  { title: "Fade (degradado)", desc: "Transiciones modernas y definidas (low, mid, high)." },
  { title: "Corte a tijera", desc: "Acabado natural y preciso para un look más personalizado." },
  { title: "Color", desc: "Aplicación de tintes para un cambio total o cobertura de canas." },
  { title: "Decoloración", desc: "Aclarado profesional para lograr tonos más claros o fantasía." },
  { title: "Mechas de gorro", desc: "Iluminaciones clásicas con efecto uniforme y definido." },
  { title: "Reflejos", desc: "Toques de luz sutiles para dar dimesión y movimiento al cabello." },
];

const prices = [
  { name: "Corte", price: "12€" },
  { name: "Corte + Barba", price: "15€" },
  { name: "Decoloración", price: "60€" },
  { name: "Tinte para canas", price: "desde 15€" },
];

/* Abierto / cerrado según horario real */
function isOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0 = domingo
  if (day === 0) return false;

  const minutes = now.getHours() * 60 + now.getMinutes();

  const morningOpen = 10 * 60 + 30;
  const morningClose = 14 * 60;
  const afternoonOpen = 17 * 60 + 30;
  const afternoonClose = 21 * 60;

  return (
    (minutes >= morningOpen && minutes < morningClose) ||
    (minutes >= afternoonOpen && minutes < afternoonClose)
  );
}

export default function App() {
  const heroRef = useRef(null);

  // Slider
  const heroImages = [hero1, hero2, hero3];
  const [slide, setSlide] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const openNow = isOpenNow();

  /* Parallax sutil */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY * 0.08;
      el.style.setProperty("--parallaxY", `${y}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Autoplay */
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroImages.length);
    }, 6500); // cambia cada 6.5s

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevSlide = () => {
    setSlide((s) => (s - 1 + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => {
    setSlide((s) => (s + 1) % heroImages.length);
  };

  return (
    <div className="page">
      {/* WhatsApp flotante */}
      <a className="waFloat" href={whatsappLink} target="_blank" rel="noreferrer">
        <span className="waIcon">💬</span>
        <span className="waText">WhatsApp</span>
      </a>

      {/* NAV */}
      <header className="nav">
        <div className="container navContent">
          <div className="logoWrap">
            <img src={logo} alt="El Mansour’s Barber Shop" className="logoImg" />
          </div>

          <nav className="navLinks">
            <a href="#servicios">Servicios</a>
            <a href="#sobre">Sobre nosotros</a>
            <a href="#precios">Precios</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <a className="btn btnPrimary" href="#reservar">
            Reservar cita
          </a>
        </div>
      </header>

      {/* HERO / RESERVA */}
      <section
        id="reservar"
        ref={heroRef}
        className={`heroBanner ${heroLoaded ? "isLoaded" : ""}`}
      >
        {/* Fondo con 3 imágenes (crossfade) */}
        <div className="heroBgWrap" aria-hidden="true">
          {heroImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              className={`heroBg ${idx === slide ? "isActive" : ""}`}
              alt=""
              onLoad={() => setHeroLoaded(true)}
            />
          ))}
        </div>

        {/* Flechas */}
        <button
          className="heroArrow heroArrowLeft"
          type="button"
          aria-label="Foto anterior"
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          className="heroArrow heroArrowRight"
          type="button"
          aria-label="Foto siguiente"
          onClick={nextSlide}
        >
          ›
        </button>

        <div className="heroOverlay" />

        <div className="container heroInner">
          <div className="heroLeft reveal">
            <p className="pill">El Mansour’s · Barber Shop</p>

            <h1>
              Más que un corte, <br />
              <span className="accent">una experiencia</span>
            </h1>

            <p className="sub">
              Barbería profesional en Motril (Granada). Reserva tu cita online.
            </p>

            <div className="heroButtons">
              {openNow ? (
                <CalendlyBarberos />
              ) : (
                <a className="btn btnPrimary" href={whatsappLink} target="_blank" rel="noreferrer">
                  Cerrado ahora · WhatsApp
                </a>
              )}

              <a className="btn btnGhost" href="#servicios">
                Ver servicios
              </a>
            </div>

            <div className="heroBadges">
              <div className="badge">
                <p className="miniTitle">Horario</p>
                <p>10:30–14:00 · 17:30–21:00</p>
              </div>
              <div className="badge">
                <p className="miniTitle">Ubicación</p>
                <p>Motril · Granada</p>
              </div>
              <div className="badge">
                <p className="miniTitle">Estado</p>
                <p>{openNow ? "Abierto ahora" : "Cerrado ahora"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      {/* SERVICIOS */}
<section id="servicios" className="section">
  <div className="container">
    <div className="sectionHead reveal">
      <h2>Servicios</h2>
      <p>Servicios profesionales para cuidar tu imagen.</p>
    </div>

    <div className="grid">
      {services.map((s) => (
        <div className="card reveal" key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>

          {/* Línea decorativa */}
          <div className="cardDivider" />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* SOBRE NOSOTROS */}
      <section id="sobre" className="section dark">
        <div className="container about">
          <div className="aboutImg reveal">
            <img src={hero1} alt="Nuestra barbería" />
          </div>

          <div className="reveal">
            <h2>Sobre nosotros</h2>
            <p className="muted">
              En El Mansour’s cuidamos cada detalle para que salgas con el mejor estilo posible.
              Profesionalidad, cercanía y calidad.
            </p>

            <ul className="aboutList">
              <li>✔ Asesoramiento personalizado</li>
              <li>✔ Ambiente cómodo y moderno</li>
              <li>✔ Reserva online rápida</li>
            </ul>

            <div className="aboutCtas">
              <a className="btn btnPrimary" href="#reservar">
                Reservar cita
              </a>
              <a className="btn btnGhost" href={whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="section">
        <div className="container">
          <div className="sectionHead reveal">
            <h2>Precios</h2>
            <p>Precios claros y sin sorpresas.</p>
          </div>

          <div className="table reveal">
            {prices.map((p) => (
              <div className="row" key={p.name}>
                <span>{p.name}</span>
                <span>{p.price}</span>
              </div>
            ))}
          </div>

          <div className="sectionCtas">
            <a className="btn btnPrimary" href="#reservar">
              Reservar cita
            </a>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section dark">
        <div className="container contactCard reveal">
          <div>
            <p className="miniTitle">Dirección</p>
            <p>El Mansour's Barber Shop · Motril (Granada)</p>
          </div>

          <div>
            <p className="miniTitle">Teléfono</p>
            <p>+34 643 575 719</p>
          </div>

          <div className="contactCtas">
            <a className="btn btnPrimary" href="#reservar">
              Reservar cita
            </a>
            <a className="btn btnGhost" href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="btn btnGhost" href="tel:+34643575719">
              Llamar
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER CON MAPA */}
      <footer className="footer">
        <div className="container footerGrid">
          <div className="footerInfo">
            <div className="logoWrap footerLogo">
              <img src={logo} alt="El Mansour’s Barber Shop" className="logoImg" />
            </div>

            <p className="footerText">Barbería profesional en Motril (Granada).</p>
            <p className="footerText">⏰ 10:30–14:00 · 17:30–21:00</p>
          </div>

          <div className="footerMap">
            <iframe
              title="Ubicación El Mansour’s Barber Shop"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.141097382193!2d-3.5226393879206133!3d36.74318417079464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7190bd79889949%3A0x2b1e5236cbc70932!2sEl%20Mansour&#39;s%20Barber%20Shop!5e0!3m2!1ses!2ses!4v1770895921407!5m2!1ses!2ses"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="footerBottom">
          © {new Date().getFullYear()} El Mansour’s Barber Shop · Motril
        </div>
      </footer>
    </div>
  );
}