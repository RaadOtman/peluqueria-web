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
  {
    num: "01",
    title: "Corte clásico",
    desc: "Estilo tradicional, limpio y elegante. Perfecto para un look atemporal y cuidado.",
    featured: true,
  },
  {
    num: "02",
    title: "Fade (degradado)",
    desc: "Transiciones modernas y bien definidas. Low, mid o high fade según tu estilo.",
  },
  {
    num: "03",
    title: "Corte a tijera",
    desc: "Acabado natural y preciso para un look más personalizado y sofisticado.",
  },
  {
    num: "04",
    title: "Color",
    desc: "Aplicación profesional de tintes para un cambio total o cobertura de canas perfecta.",
  },
  {
    num: "05",
    title: "Decoloración",
    desc: "Aclarado profesional para tonos más claros o colores fantasía con total seguridad.",
  },
  {
    num: "06",
    title: "Mechas de gorro",
    desc: "Iluminaciones clásicas con efecto uniforme y natural para un resultado brillante.",
  },
  {
    num: "07",
    title: "Reflejos",
    desc: "Toques de luz sutiles para dar dimensión y movimiento a tu cabello.",
  },
];

const prices = [
  { name: "Corte",           price: "12€" },
  { name: "Corte + Barba",   price: "15€", popular: true },
  { name: "Decoloración",    price: "60€" },
  { name: "Tinte para canas", price: "desde 15€" },
];

const stats = [
  { value: "+500", label: "Clientes satisfechos" },
  { value: "7+",   label: "Años de experiencia"  },
  { value: "100%", label: "Atención personalizada" },
  { value: "5 ★",  label: "Valoración media"      },
];

/* ── Abierto / cerrado según horario real ── */
function isOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0 = domingo
  if (day === 0) return false;

  const minutes = now.getHours() * 60 + now.getMinutes();

  const morningOpen    = 10 * 60 + 30;
  const morningClose   = 14 * 60;
  const afternoonOpen  = 17 * 60 + 30;
  const afternoonClose = 21 * 60;

  return (
    (minutes >= morningOpen  && minutes < morningClose) ||
    (minutes >= afternoonOpen && minutes < afternoonClose)
  );
}

export default function App() {
  const heroRef    = useRef(null);
  const heroImages = [hero1, hero2, hero3];

  const [slide,      setSlide]      = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  const openNow = isOpenNow();

  /* Parallax suave en el hero */
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

  /* Autoplay del slider */
  useEffect(() => {
    const id = setInterval(
      () => setSlide((s) => (s + 1) % heroImages.length),
      6500
    );
    return () => clearInterval(id);
  }, []);

  /* Animaciones al hacer scroll:
     Cuando un elemento .reveal entra en pantalla,
     le añadimos la clase .revealed para que se vea. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // solo anima una vez
          }
        });
      },
      { threshold: 0.10, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const prevSlide = () =>
    setSlide((s) => (s - 1 + heroImages.length) % heroImages.length);
  const nextSlide = () =>
    setSlide((s) => (s + 1) % heroImages.length);

  return (
    <div className="page">

      {/* ── WHATSAPP FLOTANTE ───────────────────── */}
      <a className="waFloat" href={whatsappLink} target="_blank" rel="noreferrer">
        <span className="waIcon">💬</span>
        <span className="waText">WhatsApp</span>
      </a>

      {/* ── NAVBAR ──────────────────────────────── */}
      <header className="nav">
        <div className="container navContent">
          <div className="logoWrap">
            <img src={logo} alt="El Mansour's Barber Shop" className="logoImg" />
          </div>

          <nav className={`navLinks${menuOpen ? " navLinksOpen" : ""}`}>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#sobre"     onClick={() => setMenuOpen(false)}>Sobre nosotros</a>
            <a href="#precios"   onClick={() => setMenuOpen(false)}>Precios</a>
            <a href="#contacto"  onClick={() => setMenuOpen(false)}>Contacto</a>
          </nav>

          <div className="navRight">
            <a className="btn btnPrimary navCta" href="#reservar">
              Reservar cita
            </a>
            <button
              className={`hamburger${menuOpen ? " isOpen" : ""}`}
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────── */}
      <section
        id="reservar"
        ref={heroRef}
        className={`heroBanner ${heroLoaded ? "isLoaded" : ""}`}
      >
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

        <button className="heroArrow heroArrowLeft"  type="button" aria-label="Foto anterior"  onClick={prevSlide}>‹</button>
        <button className="heroArrow heroArrowRight" type="button" aria-label="Foto siguiente" onClick={nextSlide}>›</button>

        <div className="heroOverlay" />

        <div className="container heroInner">
          <div className="heroLeft reveal">

            {/* Badge estado + pill de marca */}
            <div className="heroStatusRow">
              <span className={`statusBadge ${openNow ? "statusOpen" : "statusClosed"}`}>
                <span className="statusDot" />
                {openNow ? "Abierto ahora" : "Cerrado ahora"}
              </span>
              <span className="pill">El Mansour's · Barber Shop</span>
            </div>

            <h1>
              Más que un corte,<br />
              <span className="accent">una experiencia</span>
            </h1>

            <p className="sub">
              Barbería premium en Motril (Granada). Expertos en cortes
              modernos, fades y coloración. Tu imagen, nuestra pasión.
            </p>

            <div className="heroButtons">
              {openNow ? (
                <CalendlyBarberos />
              ) : (
                <a className="btn btnPrimary" href={whatsappLink} target="_blank" rel="noreferrer">
                  Reservar por WhatsApp
                </a>
              )}
              <a className="btn btnGhost" href="#servicios">
                Ver servicios ↓
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
                <p className="miniTitle">Reservas</p>
                <p>Online o WhatsApp</p>
              </div>
            </div>

          </div>
        </div>

        {/* Dots del slider */}
        <div className="heroDots">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`heroDot${idx === slide ? " isActive" : ""}`}
              onClick={() => setSlide(idx)}
              aria-label={`Foto ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      </section>

      {/* ── STATS / CONFIANZA ───────────────────── */}
      <section className="statsSection">
        <div className="container">
          <div className="statsGrid">
            {stats.map((s) => (
              <div className="statItem reveal" key={s.label}>
                <p className="statValue">{s.value}</p>
                <p className="statLabel">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ───────────────────────────── */}
      <section id="servicios" className="section">
        <div className="container">
          <div className="sectionHead reveal">
            <p className="sectionEyebrow">Lo que hacemos</p>
            <h2>Nuestros servicios</h2>
            <p>Profesionalidad y estilo en cada servicio. Escoge el tuyo.</p>
          </div>

          <div className="servicesGrid">
            {services.map((s) => (
              <div
                key={s.title}
                className={`serviceCard reveal${s.featured ? " serviceCardFeatured" : ""}`}
              >
                {s.featured && (
                  <span className="serviceBadge">Recomendado</span>
                )}
                <span className="serviceNum">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="cardDivider" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ─────────────────────────────── */}
      <section className="section dark">
        <div className="container">
          <div className="sectionHead reveal">
            <p className="sectionEyebrow">Nuestro trabajo</p>
            <h2>Galería</h2>
            <p>Cada corte es único. Así trabajamos en El Mansour's.</p>
          </div>
          <div className="galleryGrid">
            <div className="galleryItem galleryItemLarge reveal">
              <img src={hero1} alt="Barbería El Mansour's" />
              <div className="galleryOverlay">
                <span>El Mansour's</span>
              </div>
            </div>
            <div className="galleryItem reveal">
              <img src={hero2} alt="Corte profesional" />
              <div className="galleryOverlay">
                <span>Cortes modernos</span>
              </div>
            </div>
            <div className="galleryItem reveal">
              <img src={hero3} alt="Estilo y precisión" />
              <div className="galleryOverlay">
                <span>Precisión y estilo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ──────────────────────── */}
      <section id="sobre" className="section">
        <div className="container about">
          <div className="aboutImg reveal">
            <img src={hero1} alt="Nuestra barbería" />
          </div>

          <div className="reveal">
            <p className="sectionEyebrow">Quiénes somos</p>
            <h2>Sobre nosotros</h2>
            <div className="goldLine" />
            <p className="muted">
              En El Mansour's cuidamos cada detalle para que salgas con el mejor estilo posible.
              Más de 7 años transformando looks en Motril con profesionalidad,
              cercanía y pasión por el buen trabajo.
            </p>

            <ul className="aboutList">
              <li>✔ Asesoramiento personalizado en cada visita</li>
              <li>✔ Ambiente cómodo, moderno y acogedor</li>
              <li>✔ Reserva online rápida sin esperas</li>
              <li>✔ Productos profesionales de primera calidad</li>
            </ul>

            <div className="aboutCtas">
              <a className="btn btnPrimary" href="#reservar">Reservar cita</a>
              <a className="btn btnGhost" href={whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRECIOS ─────────────────────────────── */}
      <section id="precios" className="section dark">
        <div className="container">
          <div className="sectionHead reveal">
            <p className="sectionEyebrow">Tarifas</p>
            <h2>Precios</h2>
            <p>Calidad premium a precios justos. Sin sorpresas.</p>
          </div>

          <div className="priceTable reveal">
            {prices.map((p) => (
              <div
                key={p.name}
                className={`priceRow${p.popular ? " priceRowPopular" : ""}`}
              >
                <div className="priceRowLeft">
                  <span className="priceName">{p.name}</span>
                  {p.popular && (
                    <span className="popularBadge">Más popular</span>
                  )}
                </div>
                <span className="priceAmount">{p.price}</span>
              </div>
            ))}
          </div>

          <div className="sectionCtas">
            <a className="btn btnPrimary" href="#reservar">
              Reservar cita
            </a>
            <a className="btn btnGhost" href={whatsappLink} target="_blank" rel="noreferrer">
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA — RESERVA POTENTE ────────────────── */}
      <section className="ctaSection">
        <div className="container ctaInner reveal">
          <p className="ctaEyebrow">Sin esperas · Sin complicaciones</p>
          <h2 className="ctaTitle">
            Reserva tu cita en<br />
            <span className="accent">menos de 1 minuto</span>
          </h2>
          <p className="ctaSub">
            Elige barbero, día y hora desde tu móvil. Rápido, fácil y sin llamadas.
          </p>
          <div className="ctaButtons">
            {openNow ? (
              <CalendlyBarberos />
            ) : (
              <a className="btn btnPrimary ctaBtn" href={whatsappLink} target="_blank" rel="noreferrer">
                💬 Reservar por WhatsApp
              </a>
            )}
            <a className="btn btnGhost ctaBtn" href="tel:+34643575719">
              📞 Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ────────────────────────────── */}
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
          <div>
            <p className="miniTitle">Horario</p>
            <p>Lun–Sáb · 10:30–14:00 y 17:30–21:00</p>
          </div>
          <div className="contactCtas">
            <a className="btn btnPrimary" href="#reservar">Reservar cita</a>
            <a className="btn btnGhost" href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="btn btnGhost" href="tel:+34643575719">Llamar</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="footer">
        <div className="container footerGrid">

          <div className="footerInfo">
            <div className="logoWrap footerLogo">
              <img src={logo} alt="El Mansour's Barber Shop" className="logoImg" />
            </div>
            <p className="footerText">Barbería premium en Motril (Granada).</p>
            <p className="footerText">Cortes modernos, fades y coloración profesional.</p>
            <div className="footerContact">
              <p className="footerText">📞 +34 643 575 719</p>
              <p className="footerText">⏰ 10:30–14:00 · 17:30–21:00</p>
              <p className="footerText">📍 Motril, Granada</p>
            </div>
          </div>

          <div className="footerLinks">
            <p className="footerLinksTitle">Navegación</p>
            <a href="#servicios">Servicios</a>
            <a href="#sobre">Sobre nosotros</a>
            <a href="#precios">Precios</a>
            <a href="#contacto">Contacto</a>
            <a href="#reservar" className="footerCta">Reservar cita →</a>
          </div>

          <div className="footerMap">
            <iframe
              title="Ubicación El Mansour's Barber Shop"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.141097382193!2d-3.5226393879206133!3d36.74318417079464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7190bd79889949%3A0x2b1e5236cbc70932!2sEl%20Mansour&#39;s%20Barber%20Shop!5e0!3m2!1ses!2ses!4v1770895921407!5m2!1ses!2ses"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

        </div>

        <div className="footerBottom">
          <span>© {new Date().getFullYear()} El Mansour's Barber Shop · Motril</span>
          <span className="footerBottomSub">Hecho con ❤️ en Granada</span>
        </div>
      </footer>

      {/* ── BARRA CTA FIJA EN MÓVIL ─────────────── */}
      {/* Solo visible en pantallas ≤ 980px (ver styles.css) */}
      <div className="mobileCta">
        <a className="btn btnPrimary mobileCta__btn" href="#reservar">
          Reservar cita
        </a>
        <a
          className="btn mobileCta__wa"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          💬 WhatsApp
        </a>
      </div>

    </div>
  );
}
