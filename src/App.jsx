import React, { useState } from "react";
import {
  Scissors, CalendarDays, Clock3, BellRing, Users, TrendingUp, MessageCircle,
  CheckCircle2, ArrowRight, Menu, X, Smartphone, ShieldCheck, Star, BarChart3,
  MapPin, Phone, Mail, ChevronDown, Sparkles
} from "lucide-react";
import { siteConfig, digits } from "./config";
import Gallery from "./gallery.jsx";
import { Count, PhoneSlots, Particles, Marquee, ScrollFX } from "./anim.jsx";

const features = [
  { icon: CalendarDays, title: "ऑनलाइन अपॉइंटमेंट बुकिंग", text: "ग्राहक त्यांच्या सोयीने तारीख आणि उपलब्ध वेळ निवडू शकतात." },
  { icon: Clock3, title: "स्मार्ट स्लॉट मॅनेजमेंट", text: "उपलब्ध वेळा दाखवा आणि डबल बुकिंग टाळा." },
  { icon: Users, title: "ग्राहकांची संपूर्ण माहिती", text: "ग्राहकांची भेटी, आवडत्या सेवा आणि मागील हिस्ट्री एका ठिकाणी." },
  { icon: BellRing, title: "WhatsApp रिमाइंडर", text: "बुकिंग कन्फर्मेशन आणि अपॉइंटमेंट रिमाइंडर पाठवा." },
  { icon: BarChart3, title: "दैनिक विक्री रिपोर्ट", text: "आजची बुकिंग, पूर्ण झालेल्या सेवा आणि कमाई पाहा." },
  { icon: TrendingUp, title: "व्यवसाय वाढवा", text: "ग्राहकांचा अनुभव सुधारा आणि पुन्हा येणारे ग्राहक वाढवा." }
];

const faqs = [
  ["BarberPro कोणासाठी आहे?", "BarberPro हे स्थानिक बार्बर शॉप, सलून आणि हेअर कटिंग व्यवसायांसाठी तयार केलेले बुकिंग व व्यवस्थापन प्लॅटफॉर्म आहे."],
  ["ग्राहक ऑनलाइन अपॉइंटमेंट बुक करू शकतात का?", "होय. ग्राहक तुमच्या शॉपची बुकिंग लिंक उघडून सेवा, तारीख आणि उपलब्ध स्लॉट निवडू शकतात."],
  ["मला ग्राहकांची जुनी हिस्ट्री पाहता येईल का?", "होय. ग्राहकांची प्रोफाइल, मागील भेटी आणि सेवा हिस्ट्री शॉप डॅशबोर्डमधून पाहता येते."],
  ["WhatsApp वर मेसेज जातात का?", "WhatsApp Business API कॉन्फिगर केल्यानंतर बुकिंग कन्फर्मेशन आणि रिमाइंडर पाठवता येतात. त्यासाठी अधिकृत API सेटअप आणि ग्राहकांची संमती आवश्यक आहे."]
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", shop: "", mobile: "", city: "" });

  const goTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const contactWhatsApp = (message = siteConfig.whatsappDefaultMessage) => {
    if (!siteConfig.whatsappNumber) {
      goTo("contact");
      return;
    }
    const number = digits(siteConfig.whatsappNumber);
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const submitLead = (e) => {
    e.preventDefault();
    const message = [siteConfig.demoRequestIntro, `नाव: ${form.name}`, `शॉप: ${form.shop}`, `मोबाईल: ${form.mobile}`, `शहर: ${form.city}`].join("\n");
    if (!siteConfig.whatsappNumber) {
      alert("WhatsApp नंबर सेट केलेला नाही. कृपया src/contact.json मध्ये whatsappNumber भरा.");
      return;
    }
    window.open(`https://wa.me/${digits(siteConfig.whatsappNumber)}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <ScrollFX />
      <Marquee />
      <header className="topbar">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="BarberPro Home"><span className="brand-mark"><Scissors size={25}/></span><span>Barber<span>Pro</span></span></a>
          <nav className={mobileOpen ? "nav-links open" : "nav-links"} aria-label="मुख्य नेव्हिगेशन">
            <a href="#features" onClick={() => setMobileOpen(false)}>फायदे</a>
            <a href="#how" onClick={() => setMobileOpen(false)}>कसे काम करते?</a>
            <a href="#screens" onClick={() => setMobileOpen(false)}>अॅप पाहा</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>प्रश्न</a>
            <button className="btn btn-small" onClick={() => goTo("contact")}>डेमो मागवा <ArrowRight size={16}/></button>
          </nav>
          <button className="mobile-toggle" aria-label="मेन्यू उघडा" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow glow-one"></div><div className="hero-glow glow-two"></div><Particles />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={15}/> आधुनिक बार्बर शॉपसाठी स्मार्ट सोल्यूशन</div>
              <h1>तुमच्या सलूनचा<br/><span>स्मार्ट साथीदार!</span></h1>
              <p className="hero-lead">लांब रांगा आणि फोनवरील बुकिंगचा गोंधळ सोडा. तुमच्या बार्बर शॉपचे बुकिंग, ग्राहक आणि रोजचा व्यवसाय सांभाळा एकाच ठिकाणी.</p>
              <div className="hero-actions">
                <button className="btn" onClick={() => goTo("contact")}>मोफत डेमो मागवा <ArrowRight size={18}/></button>
                <button className="btn btn-outline" onClick={() => goTo("screens")}>अॅपची झलक पाहा</button>
              </div>
              <div className="hero-points"><span><CheckCircle2/> वापरण्यास सोपे</span><span><CheckCircle2/> मोबाईलवर उपलब्ध</span><span><CheckCircle2/> स्थानिक शॉपसाठी</span></div>
            </div>
            <div className="hero-visual">
              <div className="visual-orbit orbit-a"></div><div className="visual-orbit orbit-b"></div>
              <div className="hero-card">
                <div className="mock-top"><span className="mock-dot"></span><b>BarberPro</b><span className="mock-live">● Live</span></div>
                <div className="mock-title">आजचा व्यवसाय <span>आज</span></div>
                <div className="mock-stats"><div><small>आजची बुकिंग</small><b><Count to={12} /></b><em><CalendarDays size={15}/></em></div><div><small>पूर्ण सेवा</small><b><Count to={7} pad={2} /></b><em className="green"><CheckCircle2 size={15}/></em></div></div>
                <div className="mock-revenue"><span>आजची कमाई</span><strong><Count to={2000} prefix="₹ " /></strong><div className="revenue-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
                <div className="mock-appointment"><div><b>पुढील अपॉइंटमेंट</b><small>10:30 AM · Haircut</small></div><span className="avatar">R</span></div>
                <div className="mock-bottom"><span>⌂ डॅशबोर्ड</span><span>▦ बुकिंग</span><span>♙ ग्राहक</span></div>
              </div>
              <div className="float-chip chip-one"><span className="chip-icon"><BellRing size={17}/></span><span><b>बुकिंग रिमाइंडर</b><small>वेळेवर सूचना</small></span></div>
              <div className="float-chip chip-two"><span className="chip-icon green-bg"><CheckCircle2 size={18}/></span><span><b>बुकिंग कन्फर्म!</b><small>ग्राहक समाधानी</small></span></div>
              <div className="hero-scissors"><Scissors size={72}/></div>
            </div>
          </div>
          <div className="container trust-strip"><div><b>01</b><span>ऑनलाइन बुकिंग</span></div><div><b>02</b><span>ग्राहक व्यवस्थापन</span></div><div><b>03</b><span>WhatsApp अपडेट्स</span></div><div><b>04</b><span>विक्री रिपोर्ट</span></div></div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <div className="section-heading"><span className="section-kicker">तुमच्या व्यवसायासाठी</span><h2>बार्बर शॉप चालवणे आता <span>अधिक सोपे</span></h2><p>रोजच्या कामातील वेळ वाचवा. ग्राहकांना सोयीस्कर बुकिंग द्या आणि व्यवसायावर लक्ष केंद्रित करा.</p></div>
            <div className="feature-grid">{features.map(({icon: Icon, title, text}, i) => <article className="feature-card" key={title}><div className={`feature-icon tone-${i+1}`}><Icon size={23}/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="section how-section" id="how">
          <div className="container how-grid">
            <div className="how-copy"><span className="section-kicker">फक्त ३ सोप्या स्टेप्स</span><h2>बुकिंगपासून बिलापर्यंत,<br/><span>सगळे एका ठिकाणी.</span></h2><p>तुमचे शॉप सेट करा, सेवा आणि वेळा जोडा आणि ग्राहकांना तुमची बुकिंग लिंक शेअर करा.</p>
              <div className="steps"><div className="step"><b>1</b><div><h3>तुमचे शॉप तयार करा</h3><p>शॉपचे नाव, वेळा आणि सेवा सेट करा.</p></div></div><div className="step"><b>2</b><div><h3>बुकिंग लिंक शेअर करा</h3><p>WhatsApp किंवा QR कोडद्वारे ग्राहकांना जोडा.</p></div></div><div className="step"><b>3</b><div><h3>बुकिंग आणि व्यवसाय सांभाळा</h3><p>अपॉइंटमेंट, ग्राहक आणि विक्री रिपोर्ट पाहा.</p></div></div></div>
            </div>
            <div className="how-art"><div className="circle-bg"></div><div className="phone-frame"><div className="phone-notch"></div><div className="phone-brand"><Scissors size={19}/> BarberPro</div><div className="phone-label">सेवा निवडा</div><div className="service-row active"><span>✂</span><b>Haircut</b><strong>₹200</strong></div><div className="service-row"><span>◉</span><b>Beard Trim</b><strong>₹100</strong></div><div className="phone-label">उपलब्ध वेळ निवडा</div><PhoneSlots /><div className="phone-confirm">अपॉइंटमेंट बुक करा <ArrowRight size={15}/></div></div><div className="how-sticker"><CalendarDays/><b>तुमच्या सोयीची वेळ<br/>निवडा आणि बुक करा!</b></div></div>
          </div>
        </section>

        <section className="section screenshots" id="screens">
          <div className="container">
            <div className="section-heading"><span className="section-kicker">एक नजर टाका</span><h2>तुमचे शॉप, <span>तुमच्या हातात</span></h2><p>बार्बर पॅनल आणि ग्राहक अॅपचे प्रत्यक्ष स्क्रीनशॉट्स. मोठे पाहण्यासाठी क्लिक करा.</p></div>
            <Gallery />
            </div>
        </section>

        <section className="banner-section" aria-label="BarberPro जाहिरात">
          <div className="container">
            <button className="banner-card" onClick={() => goTo("contact")} aria-label="BarberPro – आजच बुक करा">
              <img src="/images/barberpro-banner.jpg" alt="BarberPro – आता केस कापण्यासाठी लांब रांगेत उभे राहू नका! स्मार्ट बुकिंग, स्मार्ट अनुभव" loading="lazy" width="1600" height="900"/>
            </button>
          </div>
        </section>

        <section className="benefit-band"><div className="container benefit-inner"><div><span className="section-kicker light">तुमचा वेळ वाचवा</span><h2>ग्राहकांना द्या सोपा अनुभव.<br/>व्यवसायाला द्या नवी दिशा.</h2></div><button className="btn btn-light" onClick={() => goTo("contact")}>आजच डेमो मागवा <ArrowRight size={18}/></button></div></section>

        <section className="section faq-section" id="faq"><div className="container faq-grid"><div><span className="section-kicker">मदत आणि माहिती</span><h2>तुमच्या मनातील<br/><span>काही प्रश्न?</span></h2><p>BarberPro सुरू करण्यापूर्वी अधिक माहिती हवी आहे? आम्हाला विचारा.</p><button className="text-link" onClick={() => goTo("contact")}>आमच्याशी संपर्क करा <ArrowRight size={17}/></button></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${openFaq===i?"active":""}`} key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}><span>{q}</span><ChevronDown size={19}/></button><div className="faq-body"><div><p>{a}</p></div></div></div>)}</div></div></section>

        <section className="contact-section" id="contact"><div className="container contact-grid"><div className="contact-copy"><span className="section-kicker light">आजच सुरुवात करा</span><h2>तुमच्या बार्बर शॉपसाठी<br/><span>BarberPro वापरून पाहा!</span></h2><p>डेमो किंवा प्लॅनची माहिती मिळवण्यासाठी खाली माहिती भरा. आमची टीम तुमच्याशी संपर्क करेल.</p><div className="contact-points"><span><ShieldCheck/> सोपे सेटअप</span><span><MessageCircle/> WhatsApp संपर्क</span><span><Star/> स्थानिक व्यवसायांसाठी</span></div>
          <ul className="contact-details">
            {siteConfig.ownerName && <li><Users/><span><small>संपर्क व्यक्ती</small><b>{siteConfig.ownerName}</b></span></li>}
            {siteConfig.whatsappNumber && <li><MessageCircle/><span><small>WhatsApp</small><a href={`https://wa.me/${digits(siteConfig.whatsappNumber)}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`} target="_blank" rel="noopener noreferrer">{siteConfig.phoneDisplay || "+" + digits(siteConfig.whatsappNumber)}</a></span></li>}
            {siteConfig.phoneNumber && <li><Phone/><span><small>फोन</small><a href={`tel:+${digits(siteConfig.phoneNumber)}`}>{siteConfig.phoneDisplay || "+" + digits(siteConfig.phoneNumber)}</a></span></li>}
            {siteConfig.email && <li><Mail/><span><small>ईमेल</small><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></span></li>}
            {(siteConfig.address || siteConfig.city) && <li><MapPin/><span><small>{siteConfig.shopName}</small><b>{siteConfig.address || siteConfig.city}</b></span></li>}
            {siteConfig.workingHours && <li><Clock3/><span><small>वेळ</small><b>{siteConfig.workingHours}</b></span></li>}
          </ul></div>
          <form className="lead-form" onSubmit={submitLead}><h3>मोफत डेमो मागवा</h3><p>तुमची माहिती भरा</p><label>तुमचे नाव<input required minLength="2" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="उदा. राहुल पाटील"/></label><label>बार्बर शॉपचे नाव<input required value={form.shop} onChange={e=>setForm({...form,shop:e.target.value})} placeholder="तुमच्या शॉपचे नाव"/></label><label>मोबाईल नंबर<input required inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength="10" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,"").slice(0,10)})} placeholder="10 अंकी मोबाईल नंबर"/></label><label>शहर<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="उदा. अमरावती"/></label><button className="btn form-submit" type="submit">डेमोसाठी विनंती पाठवा <ArrowRight size={17}/></button><small>तुमची माहिती फक्त संपर्कासाठी वापरली जाईल.</small></form>
        </div></section>
      </main>

      <footer className="footer"><div className="container footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Scissors size={23}/></span><span>Barber<span>Pro</span></span></a><p>स्मार्ट बुकिंग. स्मार्ट अनुभव.</p><div className="footer-links"><a href="#features">फायदे</a><a href="#screens">अॅप पाहा</a><a href="#faq">प्रश्न</a><a href="#contact">संपर्क</a></div></div><div className="container copyright">© {new Date().getFullYear()} {siteConfig.shopName}. सर्व हक्क राखीव.</div></footer>
      <button className="floating-whatsapp" aria-label="WhatsApp वर संपर्क करा" onClick={() => contactWhatsApp()}><MessageCircle size={23}/><span>WhatsApp</span></button>
    </>
  );
}

export default App;