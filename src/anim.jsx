import React, { useEffect, useRef, useState } from "react";
import { Scissors } from "lucide-react";

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Number that counts up when scrolled into view */
export function Count({ to, pad = 0, prefix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduce()) { setV(to); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{prefix}{to >= 1000 ? v.toLocaleString("en-IN") : String(v).padStart(pad, "0")}</span>;
}

/* Time slots that auto-select one after another inside the phone mockup */
const slots = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
export function PhoneSlots() {
  const [i, setI] = useState(1);
  useEffect(() => {
    if (reduce()) return;
    const t = setInterval(() => setI((x) => (x + 1) % slots.length), 1800);
    return () => clearInterval(t);
  }, []);
  return <div className="slot-grid">{slots.map((s, k) => <span key={s} className={k === i ? "selected" : ""}>{s}</span>)}</div>;
}

/* Rising golden dots behind the hero */
export function Particles() {
  const items = Array.from({ length: 16 }, (_, i) => ({
    l: (i * 37) % 100, s: 4 + ((i * 5) % 9), d: 7 + ((i * 3) % 8), dl: -(i * 1.3)
  }));
  return (
    <div className="particles" aria-hidden="true">
      {items.map((p, i) => <i key={i} style={{ left: p.l + "%", width: p.s, height: p.s, animationDuration: p.d + "s", animationDelay: p.dl + "s" }} />)}
    </div>
  );
}

/* Scrolling ticker of benefits */
const words = ["ऑनलाइन बुकिंग", "स्मार्ट स्लॉट मॅनेजमेंट", "WhatsApp रिमाइंडर", "ग्राहक हिस्ट्री", "दैनिक विक्री रिपोर्ट", "डबल बुकिंग टाळा"];
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((n) => row.map((w, i) => <span key={n + "-" + i}><Scissors size={15} /> {w}</span>))}
      </div>
    </div>
  );
}

/* Splash screen, scroll progress, reveal-on-scroll, tilt, spotlight, magnetic buttons */
export function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const off = [];
    const noMotion = reduce();

    // 1) Reveal on scroll
    const groups = [
      [".section-heading", "up"], [".how-copy>*:not(.steps)", "up"], [".step", "left"],
      [".feature-card", "up"], [".how-art", "zoom"], [".benefit-inner>*", "up"],
      [".faq-grid>div:first-child", "left"], [".faq-item", "up"], [".contact-copy>*", "left"],
      [".lead-form", "right"], [".banner-card", "zoom"], [".trust-strip>div", "up"], [".footer-main>*", "up"]
    ];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    groups.forEach(([sel, kind]) => document.querySelectorAll(sel).forEach((el, i) => {
      el.setAttribute("data-reveal", kind);
      el.style.setProperty("--d", (i % 4) * 100 + "ms");
      noMotion ? el.setAttribute("data-in", "") : io.observe(el);
    }));
    document.querySelectorAll(".screen-card").forEach((el, i) => {
      el.setAttribute("data-reveal", i % 2 ? "right" : "left");
      noMotion ? el.setAttribute("data-in", "") : io.observe(el);
    });
    off.push(() => io.disconnect());

    // 2) Scroll progress, navbar shrink, hero parallax
    const bar = document.querySelector(".topbar");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--sp", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
        root.style.setProperty("--sy", Math.min(window.scrollY, 900));
        bar?.classList.toggle("scrolled", window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    off.push(() => window.removeEventListener("scroll", onScroll));

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover && !noMotion) {
      // 3) 3D tilt (hero card + screenshot cards)
      const tilt = (host, target, max) => {
        const move = (e) => {
          const r = host.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          target.style.setProperty("--ry", (x * max).toFixed(2) + "deg");
          target.style.setProperty("--rx", (-y * max * 0.7).toFixed(2) + "deg");
        };
        const leave = () => { target.style.setProperty("--ry", "0deg"); target.style.setProperty("--rx", "0deg"); };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerleave", leave);
        off.push(() => { host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); });
      };
      const hv = document.querySelector(".hero-visual"), hc = document.querySelector(".hero-card");
      if (hv && hc) tilt(hv, hc, 16);
      document.querySelectorAll(".screen-card").forEach((c) => tilt(c, c, 8));

      // 4) Cursor spotlight on feature cards
      document.querySelectorAll(".feature-card").forEach((c) => {
        const move = (e) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--mx", e.clientX - r.left + "px");
          c.style.setProperty("--my", e.clientY - r.top + "px");
        };
        c.addEventListener("pointermove", move);
        off.push(() => c.removeEventListener("pointermove", move));
      });

      // 5) Magnetic buttons
      document.querySelectorAll(".btn, .floating-whatsapp").forEach((b) => {
        const move = (e) => {
          const r = b.getBoundingClientRect();
          b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`;
        };
        const leave = () => { b.style.translate = ""; };
        b.addEventListener("pointermove", move);
        b.addEventListener("pointerleave", leave);
        off.push(() => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); });
      });
    }
    return () => off.forEach((f) => f());
  }, []);

  return (
    <>
      <div className="scroll-bar" aria-hidden="true" />
      <div className="splash" aria-hidden="true">
        <div className="splash-mark"><Scissors size={46} /></div>
        <span>Barber<b>Pro</b></span>
      </div>
    </>
  );
}
