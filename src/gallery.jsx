import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Store, Smartphone, LayoutGrid } from "lucide-react";

const shots = [
  { src: "barber-store-dashboard", who: "barber", title: "स्टोअर डॅशबोर्ड", text: "आजची बुकिंग, पूर्ण सेवा आणि कमाई एका नजरेत.", alt: "BarberPro store dashboard with today's bookings and revenue" },
  { src: "barber-appointment-calendar", who: "barber", title: "अपॉइंटमेंट कॅलेंडर", text: "दिवसभरातील बुकिंग्स कॅलेंडरमध्ये पाहा.", alt: "BarberPro appointment calendar view" },
  { src: "barber-new-booking", who: "barber", title: "नवीन बुकिंग", text: "ग्राहक, सेवा आणि वेळ निवडून काही सेकंदात बुकिंग.", alt: "BarberPro new booking form" },
  { src: "barber-services-menu", who: "barber", title: "सेवा व किंमत मेन्यू", text: "तुमच्या सेवा, वेळ आणि किंमती स्वतः ठरवा.", alt: "BarberPro service menu and pricing" },
  { src: "customer-salon-home", who: "customer", title: "शॉप होम पेज", text: "सेवा मेन्यू आणि थेट 'Book Appointment' बटण.", alt: "Customer view of salon home with services menu" },
  { src: "customer-book-appointment", who: "customer", title: "सेवा, तारीख, वेळ निवडा", text: "ग्राहक स्वतः सोयीची वेळ निवडतात.", alt: "Customer booking screen with service, date and time slot selection" },
  { src: "customer-my-bookings", who: "customer", title: "माझ्या अपॉइंटमेंट्स", text: "मागील आणि आगामी बुकिंग्सची स्थिती पाहा.", alt: "Customer appointments history and status" }
];
const tabs = [["all", "सर्व", LayoutGrid], ["barber", "बार्बर पॅनल", Store], ["customer", "ग्राहक अॅप", Smartphone]];

export default function Gallery() {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(-1);
  const track = useRef(null);
  const list = shots.filter((s) => tab === "all" || s.who === tab);

  useEffect(() => { track.current?.scrollTo({ left: 0 }); }, [tab]);
  useEffect(() => {
    if (open < 0) return;
    const key = (e) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % list.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + list.length) % list.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open, list.length]);

  const slide = (d) => track.current?.scrollBy({ left: d * 280, behavior: "smooth" });

  return (
    <div className="gallery">
      <div className="gallery-tabs" role="tablist">
        {tabs.map(([id, label, Icon]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}><Icon size={16} /> {label}</button>
        ))}
      </div>
      <div className="gallery-stage">
        <button className="g-arrow left" aria-label="मागे" onClick={() => slide(-1)}><ChevronLeft /></button>
        <div className="gallery-track" ref={track} key={tab}>
          {list.map((s, i) => (
            <figure className="shot" key={s.src} style={{ "--i": i }}>
              <button className="shot-phone" onClick={() => setOpen(i)} aria-label={s.title + " मोठे पाहा"}>
                <span className={"shot-badge " + s.who}>{s.who === "barber" ? "बार्बर" : "ग्राहक"}</span>
                <img src={`/images/${s.src}.jpg`} alt={s.alt} loading="lazy" width="620" height="1386" />
              </button>
              <figcaption><h3>{s.title}</h3><p>{s.text}</p></figcaption>
            </figure>
          ))}
        </div>
        <button className="g-arrow right" aria-label="पुढे" onClick={() => slide(1)}><ChevronRight /></button>
      </div>

      {open >= 0 && list[open] && (
        <div className="lightbox" onClick={() => setOpen(-1)} role="dialog" aria-modal="true">
          <button className="lb-close" aria-label="बंद करा"><X /></button>
          <button className="g-arrow left" aria-label="मागे" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length); }}><ChevronLeft /></button>
          <img key={open} src={`/images/${list[open].src}.jpg`} alt={list[open].alt} onClick={(e) => e.stopPropagation()} />
          <button className="g-arrow right" aria-label="पुढे" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % list.length); }}><ChevronRight /></button>
          <p className="lb-cap">{list[open].title} · {open + 1}/{list.length}</p>
        </div>
      )}
    </div>
  );
}
