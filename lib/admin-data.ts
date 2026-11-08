import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

let ready: Promise<void> | undefined

export function ensureAdminTables() {
  if (!ready) ready = (async () => {
    await db.execute(sql`CREATE TABLE IF NOT EXISTS site_services (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title varchar(120) NOT NULL UNIQUE, description text NOT NULL, icon varchar(32) NOT NULL DEFAULT 'Zap', created_at timestamptz NOT NULL DEFAULT now())`)
    await db.execute(sql`CREATE TABLE IF NOT EXISTS site_projects (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title varchar(160) NOT NULL, category varchar(120) NOT NULL, image_url text NOT NULL, alt_text varchar(240) NOT NULL, created_at timestamptz NOT NULL DEFAULT now())`)
    await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS site_projects_image_url_unique ON site_projects (image_url)`)
    await db.execute(sql`INSERT INTO site_services (title,description,icon) VALUES
      ('Electrical installation','Professional wiring and installation for homes, offices, commercial facilities, and industrial environments.','Zap'),
      ('Industrial electrical services','Installation, maintenance, fault diagnosis, and support for industrial equipment and production facilities.','Building2'),
      ('Maintenance & troubleshooting','Inspection, fault detection, repairs, and preventive and corrective maintenance for safer, more reliable systems.','Wrench'),
      ('Solar inverter systems','Supply, installation, configuration, and maintenance, including lithium and tubular battery solutions.','Sun'),
      ('Solar panel installation','Installation, connection, and configuration of panels and supporting components for efficient energy generation.','PanelsTopLeft'),
      ('Solar water pumping','DC solar water pumps for farms, boreholes, irrigation, and other suitable water supply applications.','Droplets'),
      ('Electrical equipment & materials','Supply of electrical equipment, accessories, cables, circuit breakers, and related materials, subject to availability.','Lightbulb'),
      ('Control panels & electrical systems','Panel installation, wiring, inspection, troubleshooting, and maintenance support.','ClipboardCheck'),
      ('CCTV & security systems','Suitable wired and wireless CCTV installations for homes, offices, churches, and commercial premises.','Camera'),
      ('Electrical consultancy','Project planning, system sizing, material estimation, and recommendations for electrical and renewable energy solutions.','BadgeCheck')
      ON CONFLICT (title) DO NOTHING`)
    await db.execute(sql`INSERT INTO site_projects (title,category,image_url,alt_text) VALUES
      ('Kitchen electrical fit-out','Residential · Lighting','/projects/kitchen-lighting.jpeg','Kitchen fit-out with track lights and under-cabinet lighting'),
      ('Living room lighting','Residential · Interior lighting','/projects/ambient-living-room-lighting.jpeg','Living room with recessed ceiling and accent lighting'),
      ('Electrical conduit routing','Residential · Wiring','/projects/attic-conduit-installation.jpeg','Blue electrical conduits routed through a roof space'),
      ('Feature wall lighting','Residential · LED lighting','/projects/illuminated-tv-feature-wall.jpeg','Blue accent lighting integrated into a living-room TV feature wall'),
      ('Ceiling lighting installation','Residential · Lighting','/projects/ceiling-lighting-installation.jpeg','Recessed and cove ceiling lights in a residential interior'),
      ('Residential fit-out','Residential · Installation','/projects/residential-lighting-fit-out.jpeg','Interior fit-out with installed ceiling lights and chandelier'),
      ('Inverter and battery system','Renewable energy · Backup power','/projects/inverter-battery-installation.jpeg','Installed inverter units and battery storage system'),
      ('Distribution board installation','Electrical systems · Safety','/WhatsApp Image 2026-11-01 at 7.11.23 AM (1).jpeg','Installed residential distribution board with circuit breakers'),
      ('Distribution board installation','Electrical systems · Safety','/projects/habi5.jpeg','Installed residential distribution board with circuit breakers')
      ON CONFLICT (image_url) DO NOTHING`)
  })().catch((error) => { ready = undefined; throw error })
  return ready
}

export async function getSiteContent() {
  await ensureAdminTables()
  const [services, projects] = await Promise.all([
    db.execute(sql`SELECT id, title, description, icon FROM site_services ORDER BY created_at, title`),
    db.execute(sql`SELECT id, title, category, image_url AS image, alt_text AS alt FROM site_projects ORDER BY created_at DESC`),
  ])
  return { services: services.rows as {id:string;title:string;description:string;icon:string}[], projects: projects.rows as {id:string;title:string;category:string;image:string;alt:string}[] }
}
