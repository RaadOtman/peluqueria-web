import { PopupModal } from "react-calendly";
import { useState } from "react";

const BARBEROS = [
  {
    name: "Reservar con Ayoub Mansour",
    url: "https://calendly.com/admin-mansours/30min",
  },
  {
    name: "Yasim Farris",
    url: "https://calendly.com/barbero2/corte",
    disabled: true, // No disponible actualmente
  },
];

export default function CalendlyBarberos() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const openCalendly = (calendlyUrl) => {
    setUrl(calendlyUrl);
    setOpen(true);
  };

  return (
    <>
      <div className="barberSelect">
        {BARBEROS.map((b) =>
          b.disabled ? (
            <button key={b.name} className="btn barberDisabled" disabled>
              <span>{b.name}</span>
              <span className="barberDisabledLabel">No disponible actualmente</span>
            </button>
          ) : (
            <button
              key={b.name}
              className="btn btnPrimary"
              onClick={() => openCalendly(b.url)}
            >
              {b.name}
            </button>
          )
        )}
      </div>

      <PopupModal
        url={url}
        open={open}
        onModalClose={() => setOpen(false)}
        rootElement={document.getElementById("root")}
      />
    </>
  );
}