import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, Check, Clock3, House,
  MapPin, Phone, ShieldCheck, Star, Sun, Wrench, Zap, Camera, Droplets,
  PanelsTopLeft, Lightbulb, ClipboardCheck,
} from "lucide-react";
import { BookingForm } from "@/components/booking-form";

const phone1 = "07037669919";
const phone2 = "09055506016";
const services = [
  { icon: <Zap aria-hidden="true" size={22} />, title: "Electrical installation", text: "Professional wiring and installation for homes, offices, commercial facilities, and industrial environments." },
  { icon: <Building2 aria-hidden="true" size={22} />, title: "Industrial electrical services", text: "Installation, maintenance, fault diagnosis, and support for industrial equipment and production facilities." },
  { icon: <Wrench aria-hidden="true" size={22} />, title: "Maintenance & troubleshooting", text: "Inspection, fault detection, repairs, and preventive and corrective maintenance for safer, more reliable systems." },
  { icon: <Sun aria-hidden="true" size={22} />, title: "Solar inverter systems", text: "Supply, installation, configuration, and maintenance, including lithium and tubular battery solutions." },
  { icon: <PanelsTopLeft aria-hidden="true" size={22} />, title: "Solar panel installation", text: "Installation, connection, and configuration of panels and supporting components for efficient energy generation." },
  { icon: <Droplets aria-hidden="true" size={22} />, title: "Solar water pumping", text: "DC solar water pumps for farms, boreholes, irrigation, and other suitable water supply applications." },
  { icon: <Lightbulb aria-hidden="true" size={22} />, title: "Electrical equipment & materials", text: "Supply of electrical equipment, accessories, cables, circuit breakers, and related materials, subject to availability." },
  { icon: <ClipboardCheck aria-hidden="true" size={22} />, title: "Control panels & electrical systems", text: "Panel installation, wiring, inspection, troubleshooting, and maintenance support." },
  { icon: <Camera aria-hidden="true" size={22} />, title: "CCTV & security systems", text: "Suitable wired and wireless CCTV installations for homes, offices, churches, and commercial premises." },
  { icon: <BadgeCheck aria-hidden="true" size={22} />, title: "Electrical consultancy", text: "Project planning, system sizing, material estimation, and recommendations for electrical and renewable energy solutions." },
];

const benefits = [
  "Registered and licensed electrical services company",
  "Experienced in electrical installation and maintenance",
  "Residential, commercial, and industrial capabilities",
  "Renewable energy solutions and professional workmanship",
  "Safety-focused, reliable, customer-focused service",
  "Flexible service coverage within and outside Lagos State",
];

function SiteHeader() {
  return <>
    <div className="utility-bar"><div className="utility-inner">
      <span className="utility-item"><MapPin aria-hidden="true" size={14} /> Alapere, Ketu, Lagos State</span>
      <span className="utility-item utility-hours"><BadgeCheck aria-hidden="true" size={14} /> Registered company · RC 9546738</span>
      <a className="utility-phone" href={`tel:${phone1}`}><Phone aria-hidden="true" size={14} /> {phone1}</a>
    </div></div>
    <header className="site-header">
      <Link aria-label="Habitech Power Limited home" className="brand" href="#top">
        <Image alt="" aria-hidden="true" className="brand-logo" height={56} src="/habitech-logo.jpeg" width={56} />
        <span className="brand-name">Habitech<span>Power Limited</span></span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        <a className="active" href="#top">Home</a><a href="#services">Services</a><a href="#why-us">About us</a><a href="#service-area">Service areas</a>
      </nav>
      <Link className="header-cta" href="#book">Request a quote <ArrowUpRight aria-hidden="true" size={15} /></Link>
      <details className="mobile-menu"><summary aria-label="Open navigation"><span>Menu</span><span className="menu-lines" aria-hidden="true"><i /><i /></span></summary>
        <nav aria-label="Mobile navigation"><a href="#top">Home</a><a href="#services">Services</a><a href="#why-us">About us</a><a href="#service-area">Service areas</a><a href="#book">Request a quote</a></nav>
      </details>
    </header>
  </>;
}

function Hero() {
  return <section aria-labelledby="hero-title" className="hero" id="top">
    <Image alt="Electrical power infrastructure" className="hero-image" fill priority sizes="100vw" src="/electrician-hero.png" />
    <div aria-hidden="true" className="hero-shade" />
    <div className="hero-content page-container">
      <p className="eyebrow">HABITECH POWER LIMITED · RC 9546738</p>
      <h1 id="hero-title">Powering your world with <span>reliable electrical solutions.</span></h1>
      <p className="hero-copy">Safe, efficient, and durable electrical and renewable energy services for residential, commercial, and industrial clients across Lagos and Nigeria.</p>
      <div className="hero-actions"><Link className="button button-primary" href="#book">Request a quotation <ArrowRight aria-hidden="true" size={17} /></Link><a className="button button-outline" href={`tel:${phone1}`}><Phone aria-hidden="true" size={16} /> Call {phone1}</a></div>
      <div className="hero-proof"><span className="proof-note"><ShieldCheck aria-hidden="true" size={16} /> Registered &amp; licensed</span><span className="proof-divider" /><span className="proof-note"><MapPin aria-hidden="true" size={16} /> Lagos and projects nationwide</span></div>
    </div>
    <a aria-label="Scroll to our services" className="hero-scroll" href="#services"><span /> Explore our services</a>
  </section>;
}

function TrustBar() {
  return <div className="trust-bar" id="service-area"><div className="trust-inner page-container">
    <div className="trust-stat"><BadgeCheck aria-hidden="true" size={24} /><span><strong>RC 9546738</strong><small>Registered company</small></span></div>
    <div className="trust-stat"><Zap aria-hidden="true" size={24} /><span><strong>Electrical &amp; solar</strong><small>Installation and support</small></span></div>
    <div className="trust-stat"><MapPin aria-hidden="true" size={24} /><span><strong>Lagos State</strong><small>Primary service area</small></span></div>
    <div className="trust-stat"><Building2 aria-hidden="true" size={24} /><span><strong>Across Nigeria</strong><small>Interstate projects welcome</small></span></div>
  </div></div>;
}

export function ElectricalHomepage() {
  return <main className="electrical-site">
    <SiteHeader /><Hero /><TrustBar />
    <section className="services-section section-pad" id="services"><div className="page-container">
      <div className="section-heading"><div><p className="eyebrow">WHAT WE DO</p><h2>Dependable power,<br /><span>built around your needs.</span></h2></div><p className="section-summary">From electrical installation and industrial maintenance to solar power and water pumping, we deliver solutions tailored to your project.</p></div>
      <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.title}><div className="service-card-top"><span className="service-icon">{service.icon}</span><span className="service-number">{String(index + 1).padStart(2, "0")}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#book">Request a quote <ArrowRight aria-hidden="true" size={15} /></a></article>)}</div>
    </div></section>

    <section className="why-section section-pad" id="why-us"><div className="why-layout page-container">
      <div className="why-copy"><p className="eyebrow">ABOUT HABITECH</p><h2>Practical expertise.<br /><span>Power you can rely on.</span></h2>
        <p>Habitech Power Limited is a registered and licensed electrical services company committed to safe, efficient, and durable solutions. Our experience spans electrical engineering, industrial systems, control panels, maintenance, and renewable energy installations.</p>
        <p>We serve clients within and outside Lagos State, with coverage shaped by each project’s requirements.</p>
        <Link className="text-link" href="#book">Talk to our team <ArrowRight aria-hidden="true" size={17} /></Link>
      </div>
      <div className="why-details"><div className="why-photo-wrap"><Image alt="Electrical service and power infrastructure" className="why-photo" height={460} src="/electrician-hero.png" width={700} /><div className="photo-badge"><span>OUR SERVICE BASE</span><strong>Alapere, Ketu, Lagos</strong></div></div>
        <div className="benefit-list">{benefits.map((benefit) => <div className="benefit-item" key={benefit}><span><Check aria-hidden="true" size={15} /></span>{benefit}</div>)}</div>
      </div>
    </div></section>

    <section className="services-section section-pad"><div className="page-container"><div className="section-heading"><div><p className="eyebrow">OUR COMMITMENT</p><h2>Powering progress<br /><span>with purpose.</span></h2></div></div>
      <div className="service-grid"><article className="service-card"><div className="service-card-top"><span className="service-icon"><Zap size={22} /></span></div><h3>Our mission</h3><p>To provide dependable, safe, and affordable electrical and renewable energy solutions that meet our customers’ needs.</p></article><article className="service-card"><div className="service-card-top"><span className="service-icon"><Star size={22} /></span></div><h3>Our vision</h3><p>To become a trusted electrical and renewable energy solutions provider, recognized for quality, reliability, and professional excellence.</p></article><article className="service-card"><div className="service-card-top"><span className="service-icon"><MapPin size={22} /></span></div><h3>Where we work</h3><p>Homes, businesses, industrial facilities, offices, farms, churches, and other institutions in Lagos and across Nigeria.</p></article><article className="service-card"><div className="service-card-top"><span className="service-icon"><BadgeCheck size={22} /></span></div><h3>Clear quotations</h3><p>Every price reflects the scope, materials, technical complexity, and location. You receive a detailed quotation before work begins.</p></article></div>
    </div></section>

    <section className="booking-section section-pad" id="book"><div className="booking-layout page-container">
      <div className="booking-copy"><p className="eyebrow">LET’S TALK ABOUT YOUR PROJECT</p><h2>Need a power<br /><span>solution?</span></h2>
        <p className="booking-lede">Request a quotation for electrical work, solar power, CCTV, or water pumping. We’ll review your requirements and provide a detailed quote before work commences.</p>
        <a className="booking-callout" href={`tel:${phone1}`}><span className="call-icon"><Phone aria-hidden="true" size={20} /></span><span><small>Call Habitech Power Limited</small><strong>{phone1}</strong></span><ArrowUpRight aria-hidden="true" className="call-arrow" size={18} /></a>
        <p><a href={`tel:${phone2}`}>{phone2}</a> · <a href="mailto:habitechpowerlimited@gmail.com">habitechpowerlimited@gmail.com</a></p>
        <a className="text-link" href={`https://wa.me/234${phone1.slice(1)}`} target="_blank" rel="noreferrer">Message us on WhatsApp <ArrowRight aria-hidden="true" size={17} /></a>
        <div className="booking-note"><MapPin aria-hidden="true" size={17} /> Alapere, Ketu, Lagos State, Nigeria</div>
      </div><BookingForm />
    </div></section>

    <footer className="site-footer"><div className="footer-main page-container">
      <Link aria-label="Habitech Power Limited home" className="brand footer-brand" href="#top"><Image alt="" aria-hidden="true" className="brand-logo" height={56} src="/habitech-logo.jpeg" width={56} /><span className="brand-name">Habitech<span>Power Limited</span></span></Link>
      <p>Powering Your World with Reliable Electrical Solutions.</p><a href={`tel:${phone1}`}><Phone aria-hidden="true" size={15} /> {phone1}</a>
    </div><div className="footer-bottom page-container"><span>© {new Date().getFullYear()} Habitech Power Limited · RC 9546738. All rights reserved.</span><span>Alapere, Ketu, Lagos State, Nigeria · Projects across Nigeria</span></div></footer>
  </main>;
}
