import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Camera,
  Check,
  ClipboardCheck,
  Droplets,
  Lightbulb,
  Mail,
  MapPin,
  PanelsTopLeft,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { ProjectVideoReel } from "@/components/project-video-reel";
import { ProjectPhotoSlideshow } from "@/components/project-photo-slideshow";
import { SocialMediaPopover } from "@/components/social-media-popover";

const phone1 = "07037669919";
const phone2 = "09055506016";
const wrap =
  "mx-auto w-[min(1180px,calc(100%_-_2rem))] sm:w-[min(1180px,calc(100%_-_4rem))]";
const services = [
  {
    icon: Zap,
    title: "Electrical installation",
    text: "Professional wiring and installation for homes, offices, commercial facilities, and industrial environments.",
  },
  {
    icon: Building2,
    title: "Industrial electrical services",
    text: "Installation, maintenance, fault diagnosis, and support for industrial equipment and production facilities.",
  },
  {
    icon: Wrench,
    title: "Maintenance & troubleshooting",
    text: "Inspection, fault detection, repairs, and preventive and corrective maintenance for safer, more reliable systems.",
  },
  {
    icon: Sun,
    title: "Solar inverter systems",
    text: "Supply, installation, configuration, and maintenance, including lithium and tubular battery solutions.",
  },
  {
    icon: PanelsTopLeft,
    title: "Solar panel installation",
    text: "Installation, connection, and configuration of panels and supporting components for efficient energy generation.",
  },
  {
    icon: Droplets,
    title: "Solar water pumping",
    text: "DC solar water pumps for farms, boreholes, irrigation, and other suitable water supply applications.",
  },
  {
    icon: Lightbulb,
    title: "Electrical equipment & materials",
    text: "Supply of electrical equipment, accessories, cables, circuit breakers, and related materials, subject to availability.",
  },
  {
    icon: ClipboardCheck,
    title: "Control panels & electrical systems",
    text: "Panel installation, wiring, inspection, troubleshooting, and maintenance support.",
  },
  {
    icon: Camera,
    title: "CCTV & security systems",
    text: "Suitable wired and wireless CCTV installations for homes, offices, churches, and commercial premises.",
  },
  {
    icon: BadgeCheck,
    title: "Electrical consultancy",
    text: "Project planning, system sizing, material estimation, and recommendations for electrical and renewable energy solutions.",
  },
];
const benefits = [
  "Registered and licensed electrical services company",
  "Experienced in electrical installation and maintenance",
  "Residential, commercial, and industrial capabilities",
  "Renewable energy solutions and professional workmanship",
  "Safety-focused, reliable, customer-focused service",
  "Flexible service coverage within and outside Lagos State",
];
const projects = [
  {
    image: "/projects/kitchen-lighting.jpeg",
    alt: "Kitchen fit-out with track lights and under-cabinet lighting",
    title: "Kitchen electrical fit-out",
    category: "Residential ‚· Lighting",
  },
  {
    image: "/projects/ambient-living-room-lighting.jpeg",
    alt: "Living room with recessed ceiling and accent lighting",
    title: "Living room lighting",
    category: "Residential ‚· Interior lighting",
  },
  {
    image: "/projects/electrical-control-installation.jpeg",
    alt: "Electrical control equipment connected with surface conduit",
    title: "Control equipment installation",
    category: "Electrical systems",
  },
  {
    image: "/projects/attic-conduit-installation.jpeg",
    alt: "Blue electrical conduits routed through a roof space",
    title: "Electrical conduit routing",
    category: "Residential ‚· Wiring",
  },
  {
    image: "/projects/illuminated-tv-feature-wall.jpeg",
    alt: "Blue accent lighting integrated into a living-room TV feature wall",
    title: "Feature wall lighting",
    category: "Residential ‚· LED lighting",
  },
  {
    image: "/projects/ceiling-lighting-installation.jpeg",
    alt: "Recessed and cove ceiling lights in a residential interior",
    title: "Ceiling lighting installation",
    category: "Residential ‚· Lighting",
  },
  {
    image: "/projects/residential-lighting-fit-out.jpeg",
    alt: "Interior fit-out with installed ceiling lights and chandelier",
    title: "Residential fit-out",
    category: "Residential ‚· Installation",
  },
  {
    image: "/projects/inverter-battery-installation.jpeg",
    alt: "Installed inverter units and battery storage system",
    title: "Inverter and battery system",
    category: "Renewable energy ‚· Backup power",
  },
  {
    image: "/projects/electrical-conduit-site-work.jpeg",
    alt: "Electrical conduit work in progress on a building site",
    title: "Conduit work in progress",
    category: "Building services ‚· Electrical",
  },
  {
    image: "/projects/building-electrical-project.jpeg",
    alt: "Building project site during electrical infrastructure works",
    title: "Building project works",
    category: "Building services ‚· Electrical",
  },
  {
    image: "/projects/distribution-board-installation.jpeg",
    alt: "Installed residential distribution board with circuit breakers",
    title: "Distribution board installation",
    category: "Electrical systems Safety",
  },
  {
    image: "/projects/habi5.jpeg",
    alt: "Installed residential distribution board with circuit breakers",
    title: "Distribution board installation",
    category: "Electrical systems ‚· Safety",
  },
];
const linkClass =
  "text-[10px] font-bold uppercase tracking-[.055em] text-slate-200 transition hover:text-habitech-green-bright";
const sectionTitle =
  "text-4xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-5xl";

function SiteHeader() {
  return (
    <>
      <div className="relative z-[3] bg-[#101316] text-[11px] text-[#e6e7e8]">
        <div
          className={`${wrap} flex min-h-[37px] flex-wrap items-center justify-between gap-x-5 gap-y-2 py-2`}
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} className="text-habitech-green" />
            Alapere, Ketu, Lagos State
          </span>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <BadgeCheck size={14} className="text-habitech-green" />
            Registered company‚ RC 9546738
          </span>
          <a
            className="hidden items-center gap-2  sm:inline-flex"
            href="mailto:habitechpowerlimited@gmail.com"
          >
            <Mail size={14} className="text-habitech-green" />
            habitechpowerlimited@gmail.com
          </a>
          <a
            className="hidden items-center gap-2 font-bold tracking-wide text-habitech-green sm:inline-flex"
            href={`tel:${phone1}`}
          >
            <Phone size={14} />
            {phone1}
          </a>
        </div>
      </div>
      <header className="relative z-[3] flex min-h-[74px] items-center justify-between gap-4 bg-[#171c21] px-4 text-white sm:px-8 xl:px-[max(32px,calc((100vw-1180px)/2))]">
        <Link
          aria-label="Habitech Power Limited home"
          className="inline-flex flex-none items-center gap-2"
          href="#top"
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-16 w-16 object-contain sm:h-[73px] sm:w-[73px]"
            height={60}
            src="/habitech-logo.jpeg"
            width={60}
          />
          <span className="flex flex-col text-lg font-extrabold leading-none tracking-tight sm:text-xl">
            Habitech
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[.09em] text-slate-300 sm:text-xs">
              Power Limited
            </span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-[clamp(14px,2.2vw,30px)] lg:flex"
        >
          <a className={`${linkClass} text-habitech-green-bright`} href="#top">
            Home
          </a>
          <a className={linkClass} href="#services">
            Services
          </a>
          <a className={linkClass} href="#projects">
            Our work
          </a>
          <a className={linkClass} href="#why-us">
            About us
          </a>
          {/* <a className={linkClass} href="#service-area">
            Service areas
          </a> */}
          <SocialMediaPopover variant="nav" />
        </nav>
        <Link
          className="hidden min-h-[38px] items-center gap-2 bg-white px-4 text-[11px] font-bold text-[#1c2024] transition hover:bg-habitech-green-bright sm:inline-flex"
          href="#book"
        >
          Request a quote <ArrowUpRight size={15} />
        </Link>
        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-[11px] font-bold text-slate-100">
            Menu{" "}
            <span className="flex w-[18px] flex-col gap-1">
              <i className="h-0.5 w-full bg-habitech-green-bright" />
              <i className="h-0.5 w-full bg-habitech-green-bright" />
            </span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-10 z-10 flex w-52 flex-col bg-[#20272d] p-2 shadow-xl"
          >
            {[
              ["Home", "#top"],
              ["Services", "#services"],
              ["Our work", "#projects"],
              ["About us", "#why-us"],
              ["Service areas", "#service-area"],
              ["Request a quote", "#book"],
            ].map(([label, href]) => (
              <a
                className="p-3 text-xs text-slate-100 hover:bg-white/10 hover:text-habitech-green-bright"
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
            <SocialMediaPopover variant="mobile-nav" />
          </nav>
        </details>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[670px] items-end overflow-hidden bg-[#182838] text-white md:min-h-[min(690px,calc(100svh_-_112px))] md:items-center"
      id="top"
    >
      <Image
        alt="Electrical power infrastructure"
        className="-z-20 object-cover object-[65%_50%] md:object-[64%_43%]"
        fill
        priority
        sizes="100vw"
        src="/electrician-hero.png"
      />
      <div aria-hidden="true" className="hero-shade" />
      <div
        className={`${wrap} pb-[68px] pt-0 md:py-[80px] md:mb-0 mb-[4.6rem] md:pb-[88px]`}
      >
        <p className="mb-4 text-[10px] font-extrabold uppercase leading-tight tracking-[.16em] text-habitech-green-bright">
          HABITECH POWER LIMITED ‚RC 9546738
        </p>
        <h1 className="max-w-[650px] text-[2.5rem] font-bold leading-[1.1] tracking-[-.055em] md:text-[3.2rem]">
          Powering your world with{" "}
          <span className="text-habitech-green-bright">
            reliable electrical solutions.
          </span>
        </h1>
        <p className="mt-5 max-w-[480px] text-[13px] leading-relaxed text-slate-200 md:mt-6 md:text-[15px]">
          Safe, efficient, and durable electrical and renewable energy services
          for residential, commercial, and industrial clients across Lagos and
          Nigeria.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-[29px]">
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2.5 bg-habitech-green-bright px-4 text-[10px] font-extrabold text-[#15191c] transition hover:-translate-y-0.5 hover:bg-[#75d53c] sm:min-h-12 sm:px-[21px] sm:text-xs"
            href="#book"
          >
            Request a quotation <ArrowRight size={17} />
          </Link>
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2.5 shadow-md rounded-[10px] border-[1px] border-black/30 px-4 text-[10px] font-extrabold text-white transition hover:bg-habitech-green/10 sm:min-h-12 sm:px-[21px] sm:text-xs"
            href={`tel:${phone1}`}
          >
            <Phone size={16} className="text-habitech-green-bright" />
            Call {phone1}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3.5 text-[9px] text-slate-200 md:mt-[35px] md:text-[10px]">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-habitech-green-bright" />
            Registered &amp; licensed
          </span>
          <span className="hidden h-8 w-px bg-white/25 sm:block" />
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-habitech-green-bright" />
            Lagos and projects nationwide
          </span>
        </div>
      </div>
      {/* <SocialMediaPopover /> */}
    </section>
  );
}

function TrustBar() {
  const trust = [
    [BadgeCheck, "RC 9546738", "Registered company"],
    [Zap, "Electrical & solar", "Installation and support"],
    [MapPin, "Lagos State", "Primary service area"],
    [Building2, "Across Nigeria", "Interstate projects welcome"],
  ] as const;
  return (
    <div className="border-b-[1px] border-black/30 bg-white" id="service-area">
      <div
        className={`${wrap} grid grid-cols-2 gap-y-4 py-5 sm:min-h-[104px] sm:grid-cols-4 sm:items-center sm:gap-y-0 sm:py-0`}
      >
        {trust.map(([Icon, title, note], index) => (
          <div
            className={`flex min-h-10 items-center gap-2.5 px-2.5 sm:gap-3 sm:px-6 ${
              index === 0 ? "sm:pl-0" : ""
            } ${
              index === 3 ? "sm:pr-0" : "sm:border-r-[1px] sm:border-black/30"
            } ${
              index % 2 === 1
                ? "border-l-[1px] border-black/30 sm:border-l-0"
                : ""
            }`}
            key={title}
          >
            <Icon
              aria-hidden="true"
              className="shrink-0 text-habitech-green-dark"
              size={23}
              strokeWidth={1.7}
            />
            <span className="flex flex-col">
              <strong className="text-[10px] leading-snug sm:text-xs">
                {title}
              </strong>
              <small className="mt-0.5 text-[9px] text-habitech-muted sm:text-[10px]">
                {note}
              </small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  accent,
  summary,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  summary?: string;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <div>
        <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-habitech-green-dark">
          {eyebrow}
        </p>
        <h2 className={sectionTitle}>
          {title}
          <br />
          <span className="text-habitech-green">{accent}</span>
        </h2>
      </div>
      {summary && (
        <p className="mb-0.5 max-w-[390px] text-xs leading-relaxed text-habitech-muted sm:text-[13px]">
          {summary}
        </p>
      )}
    </div>
  );
}

function ServiceGrid({ commitments = false }: { commitments?: boolean }) {
  if (commitments) {
    const cards = [
      [
        Zap,
        "Our mission",
        "To provide dependable, safe, and affordable electrical and renewable energy solutions that meet our customers' needs.",
      ],
      [
        Star,
        "Our vision",
        "To become a trusted electrical and renewable energy solutions provider, recognized for quality, reliability, and professional excellence.",
      ],
      [
        MapPin,
        "Where we work",
        "Homes, businesses, industrial facilities, offices, farms, churches, and other institutions in Lagos and across Nigeria.",
      ],
      [
        BadgeCheck,
        "Clear quotations",
        "Every price reflects the scope, materials, technical complexity, and location. You receive a detailed quotation before work begins.",
      ],
    ] as const;
    return (
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-[15px]">
        {cards.map(([Icon, title, text]) => (
          <article
            className="flex min-h-[220px] flex-col items-start shadow-md rounded-[10px] border-[1px] border-black/30 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,22,28,.08)] sm:min-h-[236px] sm:px-[22px] sm:pt-6 sm:pb-[22px]"
            key={title}
          >
            <span className="grid h-[42px] w-[42px] place-items-center bg-[#eff8e8] text-habitech-green-dark">
              <Icon size={22} />
            </span>
            <h3 className="mt-4 mb-2 text-sm font-semibold tracking-tight sm:mt-5 sm:text-base">
              {title}
            </h3>
            <p className="mb-4 text-[10px] leading-relaxed text-habitech-muted sm:text-[11px]">
              {text}
            </p>
          </article>
        ))}
      </div>
    );
  }
  return (
    <div className="grid  grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-[15px]">
      {services.map(({ icon: Icon, title, text }, index) => (
        <article
          className="flex min-h-[226px] flex-col items-start shadow-md rounded-[10px] border-[1px] border-black/30 bg-white p-3 transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,22,28,.08)] sm:min-h-[236px] sm:px-[22px] sm:pt-6 sm:pb-[22px]"
          key={title}
        >
          <div className="flex w-full items-start justify-between">
            <span className="grid h-[42px] w-[42px] place-items-center bg-[#eff8e8] text-habitech-green-dark">
              <Icon size={22} />
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#aeb3b6]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 mb-2 text-[13px] font-semibold tracking-tight sm:mt-5 sm:text-base">
            {title}
          </h3>
          <p className="mb-4 text-[10px] leading-relaxed text-habitech-muted sm:text-[11px]">
            {text}
          </p>
          <a
            className="mt-auto inline-flex items-center gap-1.5 text-[9px] font-extrabold text-habitech-green-dark hover:text-habitech-green sm:text-[10px]"
            href="#book"
          >
            Request a quote <ArrowRight size={15} />
          </a>
        </article>
      ))}
    </div>
  );
}

export function ElectricalHomepage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[15px] leading-[1.55] text-habitech-ink [&_a]:no-underline">
      <SiteHeader />
      <Hero />
      <TrustBar />

      {/* what we do  */}
      <section className="bg-[#f8f8f6] py-[72px] sm:py-[100px]" id="services">
        <div className={wrap}>
          <SectionHeading
            eyebrow="WHAT WE DO"
            title="Dependable power,"
            accent="built around your needs."
            summary="From electrical installation and industrial maintenance to solar power and water pumping, we deliver solutions tailored to your project."
          />
          <ServiceGrid />
        </div>
      </section>

      <ProjectPhotoSlideshow />

      <section className="bg-white py-[72px] sm:py-[100px]" id="projects">
        <div className={wrap}>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-habitech-green-dark">
                SELECTED PROJECTS
              </p>
              <h2 className={sectionTitle}>
                Work we're proud of,
                <br />
                <span className="text-habitech-green">
                  built for everyday life.
                </span>
              </h2>
            </div>
            <p className="max-w-[390px] text-xs leading-relaxed text-habitech-muted sm:text-[13px]">
              A selection of the company’s electrical installations, lighting
              projects, and backup power systems.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                className="group overflow-hidden rounded-[10px] border-[1px] border-black/30 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,22,28,.1)]"
                key={project.image}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f3ef]">
                  <Image
                    alt={project.alt}
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={project.image}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[.12em] text-habitech-green-dark">
                    {project.category}
                  </p>
                  <h3 className="text-sm font-semibold tracking-tight sm:text-base">
                    {project.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
          <a
            className="mt-7 inline-flex items-center gap-2 text-[11px] font-extrabold text-habitech-green-dark"
            href="#book"
          >
            Discuss your project <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <ProjectVideoReel />
      <section
        className="bg-[#151b20] py-[72px] text-white sm:py-[100px]"
        id="why-us"
      >
        <div
          className={`${wrap} grid items-center gap-8 md:grid-cols-[.82fr_1.18fr] md:gap-[78px]`}
        >
          <div>
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#83cf4a]">
              ABOUT HABITECH
            </p>
            <h2 className="text-[clamp(38px,10vw,50px)] font-semibold leading-[1.04] tracking-[-.055em] md:text-[clamp(42px,5vw,63px)]">
              Practical expertise.
              <br />
              <span className="text-habitech-green-bright">
                Power you can rely on.
              </span>
            </h2>
            <p className="my-5 max-w-[390px] text-xs leading-[1.8] text-[#b7bec3] sm:text-[13px]">
              Habitech Power Limited is a registered and licensed electrical
              services company committed to safe, efficient, and durable
              solutions. Our experience spans electrical engineering, industrial
              systems, control panels, maintenance, and renewable energy
              installations.
            </p>
            <p className="mb-5 max-w-[390px] text-xs leading-[1.8] text-[#b7bec3] sm:text-[13px]">
              We serve clients within and outside Lagos State, with coverage
              shaped by each project's requirements.
            </p>
            <Link
              className="inline-flex items-center gap-2 text-[11px] font-extrabold text-habitech-green-bright"
              href="#book"
            >
              Talk to our team <ArrowRight size={17} />
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <div className="relative h-[240px] overflow-hidden bg-[#25303a] sm:h-[286px]">
              <Image
                alt="Electrical service and power infrastructure"
                className="h-full w-full object-cover object-[72%_42%]"
                height={460}
                src="/habi4.jpeg"
                width={700}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent pt-16">
                <div className="absolute bottom-4 right-4 flex flex-col bg-habitech-green-bright px-3 py-2.5 text-habitech-ink">
                  <span className="text-[8px] font-extrabold tracking-widest">
                    OUR SERVICE BASE
                  </span>
                  <strong className="text-[15px]">Alapere, Ketu, Lagos</strong>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5">
              {benefits.map((benefit) => (
                <div
                  className="flex items-center gap-2.5 text-[10px] leading-snug text-[#e4e7e8] sm:text-[11px]"
                  key={benefit}
                >
                  <span className="grid h-[21px] w-[21px] shrink-0 place-items-center rounded-full bg-habitech-green/15 text-habitech-green-bright">
                    <Check size={15} />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f8f6] py-[72px] sm:py-[100px]">
        <div className={wrap}>
          <SectionHeading
            eyebrow="OUR COMMITMENT"
            title="Powering progress"
            accent="with purpose."
          />
          <ServiceGrid commitments />
        </div>
      </section>
      <section className="bg-[#f7f8f8] py-[72px] sm:py-[100px]" id="book">
        <div
          className={`${wrap} grid items-start gap-8 md:grid-cols-[.72fr_1.28fr] md:gap-[68px]`}
        >
          <div className="md:pt-6">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-habitech-green-dark">
              LET'S TALK ABOUT YOUR PROJECT
            </p>
            <h2 className="text-[clamp(42px,5vw,62px)] font-semibold leading-[1.04] tracking-[-.055em]">
              Need a power
              <br />
              <span className="text-habitech-green-dark">solution?</span>
            </h2>
            <p className="my-5 max-w-[360px] text-xs leading-[1.75] text-habitech-muted sm:text-[13px]">
              Request a quotation for electrical work, solar power, CCTV, or
              water pumping. We'll review your requirements and provide a
              detailed quote before work commences.
            </p>
            <a
              className="flex max-w-[330px] items-center gap-3 shadow-md rounded-[10px] border-[1px] border-black/30 bg-white p-3.5"
              href={`tel:${phone1}`}
            >
              <span className="grid h-[39px] w-[39px] place-items-center bg-[#eff8e8] text-habitech-green-dark">
                <Phone size={20} />
              </span>
              <span className="flex flex-1 flex-col">
                <small className="text-[10px] text-habitech-muted">
                  Call Habitech Power Limited
                </small>
                <strong className="text-sm">{phone1}</strong>
              </span>
              <ArrowUpRight className="text-habitech-green-dark" size={18} />
            </a>
            <p className="mt-4 text-xs">
              <a className="text-habitech-ink" href={`tel:${phone2}`}>
                {phone2}
              </a>{" "}
              ‚·{" "}
              <a
                className="break-all text-habitech-ink"
                href="mailto:habitechpowerlimited@gmail.com"
              >
                habitechpowerlimited@gmail.com
              </a>
            </p>
            <a
              className="mt-3 inline-flex items-center gap-2 text-[11px] font-extrabold text-habitech-green-dark"
              href={`https://wa.me/234${phone1.slice(1)}`}
              target="_blank"
              rel="noreferrer"
            >
              Message us on WhatsApp <ArrowRight size={17} />
            </a>
            <div className="mt-5 flex items-center gap-2 text-[10px] text-[#596168]">
              <MapPin className="text-habitech-green-dark" size={17} />
              Alapere, Ketu, Lagos State, Nigeria
            </div>
          </div>
          <BookingForm />
        </div>
      </section>
      <footer className="bg-[#101518] text-white">
        <div
          className={`${wrap} flex min-h-[103px] flex-wrap items-center justify-between gap-4 py-6`}
        >
          <Link
            aria-label="Habitech Power Limited home"
            className="inline-flex items-center gap-2"
            href="#top"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-12 w-12 object-contain"
              height={56}
              src="/habitech-logo.jpeg"
              width={56}
            />
            <span className="flex flex-col text-sm font-extrabold">
              Habitech
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#9ca5aa]">
                Power Limited
              </span>
            </span>
          </Link>
          <p className="m-0 w-full text-[11px] text-[#aeb6bb] sm:order-none sm:w-auto">
            Powering Your World with Reliable Electrical Solutions.
          </p>
          <a
            aria-label="Follow Habitech Power Limited on TikTok"
            className="inline-flex items-center gap-2 text-xs font-bold text-habitech-green-bright transition hover:text-white"
            href="https://www.tiktok.com/@habitechpower"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.92-.02.08 1.53.63 2.8 1.64 3.7 1.1.95 2.5 1.39 3.92 1.52v4.27c-1.55-.05-3.1-.44-4.5-1.18-.61-.34-1.18-.73-1.74-1.14-.01 3.64.01 7.28-.02 10.91-.08 1.74-.66 3.48-1.71 4.87-1.66 2.31-4.55 3.82-7.42 3.57-1.62-.09-3.23-.65-4.52-1.63-2.15-1.62-3.47-4.3-3.43-6.99-.02-1.55.41-3.1 1.2-4.43 1.34-2.31 3.8-3.91 6.45-4.15 1.03-.1 2.07-.03 3.08.2.01 1.55-.04 3.1-.04 4.65-.69-.23-1.41-.42-2.14-.39-1.67.06-3.18 1.27-3.47 2.92-.2 1.3.28 2.68 1.34 3.49 1.05.82 2.6 1.02 3.83.51 1.32-.55 2.25-1.89 2.25-3.34.02-5.59-.01-11.18.02-16.77z" />
            </svg>
            TikTok
          </a>
          <a
            className="inline-flex items-center gap-2 text-xs font-bold text-habitech-green-bright"
            href={`tel:${phone1}`}
          >
            <Phone size={15} />
            {phone1}
          </a>
        </div>
        <div
          className={`${wrap} flex min-h-[47px] flex-col justify-center gap-0.5 border-t-[1px] border-black/30 py-2 text-[9px] text-[#879198] sm:flex-row sm:items-center sm:justify-between`}
        >
          <span>
            ‚© {new Date().getFullYear()} Habitech Power Limited ‚· RC 9546738.
            All rights reserved.
          </span>
          <span>
            Alapere, Ketu, Lagos State, Nigeria ‚· Projects across Nigeria
          </span>
        </div>
      </footer>
    </main>
  );
}
