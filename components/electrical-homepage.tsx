import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  Clock3,
  House,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { BookingForm } from "@/components/booking-form";

const services = [
  {
    icon: <Zap aria-hidden="true" size={22} />,
    title: "Emergency repairs",
    text: "Fast help for power outages, tripped breakers, and electrical issues that can’t wait.",
  },
  {
    icon: <Building2 aria-hidden="true" size={22} />,
    title: "Panel upgrades",
    text: "Safer, smarter electrical panels designed for the way your home or business runs today.",
  },
  {
    icon: <House aria-hidden="true" size={22} />,
    title: "Home wiring",
    text: "From a new outlet to a full rewire, get careful workmanship from licensed pros.",
  },
  {
    icon: <Wrench aria-hidden="true" size={22} />,
    title: "Lighting & installs",
    text: "Brighten your space with dependable indoor, outdoor, and commercial lighting.",
  },
];

const benefits = [
  "Licensed, insured & background-checked electricians",
  "Clear estimates before any work begins",
  "Respectful, tidy service in your home or business",
  "Local Dallas team, available around the clock",
];

function SiteHeader() {
  return (
    <>
      <div className="utility-bar">
        <div className="utility-inner">
          <span className="utility-item">
            <MapPin aria-hidden="true" size={14} /> Gbagada Lagos, Nigeria
          </span>
          <span className="utility-item utility-hours">
            <Clock3 aria-hidden="true" size={14} /> Monday – Friday: 8:00 AM –
            6:00 PM
          </span>
          <a className="utility-phone" href="tel:+15551234567">
            <Phone aria-hidden="true" size={14} /> (+234) 708 2471 978
          </a>
        </div>
      </div>
      <header className="site-header">
        <Link
          aria-label="WattEdge Solutions home"
          className="brand"
          href="#top"
        >
          <span aria-hidden="true" className="brand-mark">
            <Zap fill="currentColor" size={23} strokeWidth={2.5} />
          </span>
          <span className="brand-name">
            WattEdge<span>Solutions</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          <a className="active" href="#top">
            Home
          </a>
          <a href="#services">Our services</a>
          <a href="#why-us">Why choose us</a>
          <a href="#service-area">Area we serve</a>
        </nav>
        <Link className="header-cta" href="#book">
          Request a quote <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <span>Menu</span>
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </summary>
          <nav aria-label="Mobile navigation">
            <a href="#top">Home</a>
            <a href="#services">Our services</a>
            <a href="#why-us">Why choose us</a>
            <a href="#service-area">Area we serve</a>
            <a href="#book">Request a quote</a>
          </nav>
        </details>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero" id="top">
      <Image
        alt="A licensed electrical line technician working safely from a bucket lift against a clear blue sky"
        className="hero-image"
        fill
        priority
        sizes="100vw"
        src="/electrician-hero.png"
      />
      <div aria-hidden="true" className="hero-shade" />
      <div className="hero-content page-container">
        <h1 id="hero-title">
          Reliable <span>Electrical</span> Services for Your Home &amp; Business
        </h1>
        <p className="hero-copy">
          Serving Nigeria with 24/7 emergency repairs, installations, and
          electrical upgrades — trusted by hundreds of homeowners and local
          businesses.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="#book">
            Request a free quote <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <a className="button button-outline" href="tel:+15551234567">
            <Phone aria-hidden="true" size={16} /> Call now: (+234) 708 2471 978
          </a>
        </div>
        <div className="hero-proof">
          <div aria-label="Trusted local customers" className="avatar-stack">
            <span>JM</span>
            <span>AL</span>
            <span>RT</span>
            <span>SK</span>
          </div>
          <div className="rating-block">
            <div aria-label="4.4 out of 5 stars" className="rating-stars">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star className="star-muted" />
            </div>
            <span>
              4.4 <b>Happy clients</b>
            </span>
          </div>
          <span className="proof-divider" />
          <span className="proof-note">
            <ShieldCheck aria-hidden="true" size={16} /> Licensed &amp; insured
          </span>
        </div>
      </div>
      <a
        aria-label="Scroll to our services"
        className="hero-scroll"
        href="#services"
      >
        <span /> Scroll to explore
      </a>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="trust-bar" id="service-area">
      <div className="trust-inner page-container">
        <div className="trust-stat">
          <BadgeCheck aria-hidden="true" size={24} />
          <span>
            <strong>Licensed &amp; insured</strong>
            <small>Work done the right way</small>
          </span>
        </div>
        <div className="trust-stat">
          <Clock3 aria-hidden="true" size={24} />
          <span>
            <strong>24/7 emergency help</strong>
            <small>Here when you need us</small>
          </span>
        </div>
        <div className="trust-stat">
          <MapPin aria-hidden="true" size={24} />
          <span>
            <strong>Lagos &amp; nearby</strong>
            <small>Local team, local service</small>
          </span>
        </div>
        <div className="trust-stat">
          <Star aria-hidden="true" size={24} />
          <span>
            <strong>4.4-star rated</strong>
            <small>Trusted by your neighbors</small>
          </span>
        </div>
      </div>
    </div>
  );
}

export function ElectricalHomepage() {
  return (
    <main className="electrical-site">
      <SiteHeader />
      <Hero />
      <TrustBar />

      <section className="services-section section-pad" id="services">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h2>
                Powering your day,
                <br />
                <span>one job at a time.</span>
              </h2>
            </div>
            <p className="section-summary">
              From a flickering light to a full electrical upgrade, our Dallas
              electricians bring dependable work and straight answers to every
              visit.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className="service-card-top">
                  <span className="service-icon">{service.icon}</span>
                  <span className="service-number">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#book">
                  Book this service <ArrowRight aria-hidden="true" size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section section-pad" id="why-us">
        <div className="why-layout page-container">
          <div className="why-copy">
            <p className="eyebrow">THE WATTEDGE DIFFERENCE</p>
            <h2>
              Good people.
              <br />
              <span>Good work.</span>
              <br />
              No surprises.
            </h2>
            <p>
              We believe electrical service should feel straightforward. Our
              team shows up on time, explains the options, and treats your
              property like our own.
            </p>
            <Link className="text-link" href="#book">
              Meet your local electricians{" "}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="why-details">
            <div className="why-photo-wrap">
              <Image
                alt="Electrical technician preparing safe equipment for a service visit"
                className="why-photo"
                height={460}
                src="/electrician-hero.png"
                width={700}
              />
              <div className="photo-badge">
                <span>LOCAL &amp; RELIABLE</span>
                <strong>Dallas, TX</strong>
              </div>
            </div>
            <div className="benefit-list">
              {benefits.map((benefit) => (
                <div className="benefit-item" key={benefit}>
                  <span>
                    <Check aria-hidden="true" size={15} />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="booking-section section-pad" id="book">
        <div className="booking-layout page-container">
          <div className="booking-copy">
            <p className="eyebrow">LET’S GET YOU CONNECTED</p>
            <h2>
              Ready for a<br />
              <span>brighter day?</span>
            </h2>
            <p className="booking-lede">
              Tell us what you need and our friendly team will follow up to
              schedule a visit that works for you.
            </p>
            <a className="booking-callout" href="tel:+15551234567">
              <span className="call-icon">
                <Phone aria-hidden="true" size={20} />
              </span>
              <span>
                <small>Need help right now?</small>
                <strong>(555) 123-4567</strong>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="call-arrow"
                size={18}
              />
            </a>
            <div className="booking-note">
              <ShieldCheck aria-hidden="true" size={17} /> Free estimates. No
              obligation.
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main page-container">
          <Link
            aria-label="WattEdge Solutions home"
            className="brand footer-brand"
            href="#top"
          >
            <span aria-hidden="true" className="brand-mark">
              <Zap fill="currentColor" size={23} strokeWidth={2.5} />
            </span>
            <span className="brand-name">
              WattEdge<span>Solutions</span>
            </span>
          </Link>
          <p>
            Reliable electrical work for homes and businesses across Dallas.
          </p>
          <a href="tel:+15551234567">
            <Phone aria-hidden="true" size={15} /> (555) 123-4567
          </a>
        </div>
        <div className="footer-bottom page-container">
          <span>
            © {new Date().getFullYear()} WattEdge Solutions. All rights
            reserved.
          </span>
          <span>
            Licensed &amp; insured electrical service in Dallas, Texas.
          </span>
        </div>
      </footer>
    </main>
  );
}
