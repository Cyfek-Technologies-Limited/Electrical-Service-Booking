import { redirect } from 'next/navigation'
import { desc, sql } from 'drizzle-orm'
import { Activity, ArrowUpRight, BriefcaseBusiness, ClipboardList, FolderKanban, LayoutDashboard, LogOut, Plus, Settings2, ShieldCheck, Zap } from 'lucide-react'
import { db } from '@/lib/db'
import { serviceBookings } from '@/lib/db/schema'
import { ensureAdminTables } from '@/lib/admin-data'
import { isAdmin } from '@/lib/admin-auth'
import { addProject, addService, adminLogout, removeProject, removeService } from '@/app/actions/admin'

const field = 'min-h-10 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-[#58b51b] focus:ring-2 focus:ring-[#58b51b]/15'
const panel = 'rounded-2xl border-[1px] border-black/30 bg-white p-5 shadow-[0_3px_16px_rgba(21,29,36,.035)]'

export default async function AdminPage() {
  if (!(await isAdmin())) redirect('/admin/login')
  let services: any[] = []; let projects: any[] = []; let bookings: any[] = []; let databaseError = ''
  try {
    await ensureAdminTables()
    const [s, p, b] = await Promise.all([
      db.execute(sql`SELECT id,title,description,icon FROM site_services ORDER BY created_at DESC`),
      db.execute(sql`SELECT id,title,category,image_url,alt_text FROM site_projects ORDER BY created_at DESC`),
      db.select().from(serviceBookings).orderBy(desc(serviceBookings.createdAt)),
    ])
    services = s.rows; projects = p.rows; bookings = b
  } catch (error) { databaseError = error instanceof Error ? error.message : 'Database connection failed' }

  const newCount = bookings.filter((booking) => booking.status === 'new').length
  const contactedCount = bookings.filter((booking) => booking.status === 'contacted').length
  const completedCount = bookings.filter((booking) => booking.status === 'completed').length
  const requestCounts = bookings.reduce((counts: Record<string, number>, booking) => {
    counts[booking.service] = (counts[booking.service] ?? 0) + 1
    return counts
  }, {})
  const popularServices = Object.entries(requestCounts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const maxCount = Math.max(1, ...popularServices.map(([, count]) => count as number))

  return <main className="min-h-screen bg-[#f4f6f3] text-[#1c252d]">
    <div className="mx-auto flex min-h-screen max-w-[1600px]">
      <aside className="hidden w-[238px] shrink-0 flex-col border-r border-black/[0.07] bg-[#17232d] px-4 py-5 text-white lg:flex">
        <a className="mb-10 flex items-center gap-3 px-2" href="/" aria-label="Habitech homepage"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#58b51b] text-[#17232d]"><Zap size={22} fill="currentColor"/></span><span><b className="block text-sm">HABITECH</b><small className="text-[10px] uppercase tracking-[.15em] text-white/55">Power Limited</small></span></a>
        <p className="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/40">Workspace</p>
        <nav className="mt-3 grid gap-1 text-sm">
          <a className="flex items-center gap-3 rounded-xl bg-[#58b51b] px-3 py-3 font-semibold text-[#14200f]" href="#overview"><LayoutDashboard size={17}/>Overview</a>
          <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 transition hover:bg-white/[0.08] hover:text-white" href="/admin/requests"><ClipboardList size={17}/>Service requests<span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-xs">{newCount}</span></a>
          <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 transition hover:bg-white/[0.08] hover:text-white" href="#services"><Settings2 size={17}/>Services</a>
          <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 transition hover:bg-white/[0.08] hover:text-white" href="#projects"><FolderKanban size={17}/>Projects</a>
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.05] p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#58b51b]/15 text-[#74d13a]"><ShieldCheck size={18}/></span><p className="mb-1 mt-3 text-sm font-semibold">Admin workspace</p><p className="m-0 text-xs leading-relaxed text-white/55">Your website content and customer enquiries in one place.</p></div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex min-h-[72px] items-center justify-between border-b border-black/[0.07] bg-white/90 px-4 backdrop-blur-md sm:px-7 lg:px-9">
          <div><p className="m-0 text-[10px] font-bold uppercase tracking-[.17em] text-[#438516]">Habitech Power Limited</p><h1 className="m-0 mt-0.5 text-lg font-semibold sm:text-xl">Dashboard overview</h1></div>
          <div className="flex items-center gap-2 sm:gap-4"><a className="hidden items-center gap-1.5 rounded-lg border border-black/10 px-3 py-2 text-xs font-semibold text-slate-600 sm:flex" href="/">View website <ArrowUpRight size={14}/></a><form action={adminLogout}><button className="flex items-center gap-2 rounded-lg bg-[#17232d] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#273944]"><LogOut size={15}/><span className="hidden sm:inline">Sign out</span></button></form></div>
        </header>
        <nav aria-label="Dashboard sections" className="flex gap-2 overflow-x-auto border-b border-black/[0.07] bg-white px-4 py-2 lg:hidden"><a className="whitespace-nowrap rounded-lg bg-[#eaf5e2] px-3 py-2 text-xs font-semibold text-[#438516]" href="#overview">Overview</a><a className="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-slate-600" href="/admin/requests">Requests</a><a className="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-slate-600" href="#services">Services</a><a className="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-slate-600" href="#projects">Projects</a></nav>

        <div className="mx-auto max-w-[1250px] space-y-6 px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
          {databaseError && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">Database is unavailable: {databaseError}. Configure DATABASE_URL and ensure the database accepts connections.</div>}
          <section className="flex flex-wrap items-end justify-between gap-4" id="overview"><div><h2 className="m-0 text-2xl font-semibold tracking-tight sm:text-[28px]">Good to see you</h2><p className="mb-0 mt-1 text-sm text-slate-500">Hereâ€™s whatâ€™s happening with your website today.</p></div><p className="m-0 rounded-full border border-black/[0.08] bg-white px-3 py-2 text-xs text-slate-500">{new Date().toLocaleDateString('en-NG',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Lagos'})}</p></section>

          <section aria-label="Dashboard summary" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[[ClipboardList,'Total requests',bookings.length,'All customer enquiries','bg-[#eaf5e2] text-[#438516]'],[Activity,'Needs follow-up',newCount,'New requests','bg-[#fff5dd] text-[#a97808]'],[BriefcaseBusiness,'Services',services.length,'Published on your site','bg-[#e8f0fa] text-[#426b9d]'],[FolderKanban,'Projects',projects.length,'Shown in your portfolio','bg-[#f1eafa] text-[#8054a4]']].map(([Icon,title,value,note,tint]:any)=><article className={`${panel} p-4 sm:p-5`} key={title}><div className="flex items-start justify-between gap-2"><span className={`grid h-10 w-10 place-items-center rounded-xl ${tint}`}><Icon size={19}/></span><span className="rounded-full bg-[#f3f7f1] px-2 py-1 text-[10px] font-semibold text-[#438516]">Live</span></div><p className="mb-0 mt-4 text-xs font-medium text-slate-500">{title}</p><div className="mt-0.5 flex items-end justify-between"><strong className="text-2xl font-semibold">{value}</strong><span className="text-right text-[10px] text-slate-400">{note}</span></div></article>)}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
            <article className={panel}><div className="mb-5 flex items-start justify-between"><div><h2 className="m-0 text-base font-semibold">Request activity</h2><p className="mb-0 mt-1 text-xs text-slate-500">Customer requests by service</p></div><span className="rounded-lg bg-[#f5f7f5] p-2 text-slate-500"><Activity size={17}/></span></div>
              {popularServices.length ? <div className="space-y-4">{popularServices.map(([name,count],index)=><div className="grid grid-cols-[minmax(90px,1fr)_3fr_28px] items-center gap-3" key={name}><span className="truncate text-xs text-slate-600" title={name}>{name}</span><div className="h-2 overflow-hidden rounded-full bg-[#eff2ed]"><div className={`h-full rounded-full ${index===0?'bg-[#58b51b]':index%2?'bg-[#17232d]':'bg-[#8bcf59]'}`} style={{width:`${Math.max(7,((count as number)/maxCount)*100)}%`}}/></div><b className="text-right text-xs">{count}</b></div>)}</div> : <div className="grid min-h-36 place-items-center rounded-xl bg-[#f8faf7] text-center text-sm text-slate-500">Requests by service will appear here.</div>}
              <div className="mt-6 grid grid-cols-3 divide-x divide-black/[0.08] rounded-xl bg-[#f8faf7] py-3 text-center"><div><b className="block text-lg">{newCount}</b><span className="text-[10px] text-slate-500">New</span></div><div><b className="block text-lg">{contactedCount}</b><span className="text-[10px] text-slate-500">Contacted</span></div><div><b className="block text-lg">{completedCount}</b><span className="text-[10px] text-slate-500">Completed</span></div></div>
            </article>
            <article className={panel}><div className="mb-5 flex items-start justify-between"><div><h2 className="m-0 text-base font-semibold">Latest requests</h2><p className="mb-0 mt-1 text-xs text-slate-500">Recent customer enquiries</p></div><a className="text-xs font-semibold text-[#438516]" href="/admin/requests">See all</a></div>
              {bookings.length ? <div className="space-y-1">{bookings.slice(0,4).map((booking:any)=><div className="flex items-center gap-3 border-t border-black/[0.06] py-3 first:border-0" key={booking.id}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf5e2] text-xs font-bold text-[#438516]">{booking.customerName.slice(0,1).toUpperCase()}</span><div className="min-w-0 flex-1"><p className="m-0 truncate text-xs font-semibold">{booking.customerName}</p><p className="m-0 mt-0.5 truncate text-[10px] text-slate-500">{booking.service}</p></div><span className={`rounded-full px-2 py-1 text-[9px] font-semibold ${booking.status==='new'?'bg-[#fff5dd] text-[#9a7009]':booking.status==='completed'?'bg-[#eaf5e2] text-[#438516]':'bg-[#e8f0fa] text-[#426b9d]'}`}>{booking.status}</span></div>)}</div> : <div className="grid min-h-36 place-items-center rounded-xl bg-[#f8faf7] text-center text-sm text-slate-500">Your first customer request will show here.</div>}
              <div className="mt-3 rounded-xl bg-[#f4f8f1] px-3 py-2.5 text-[11px] text-slate-600">Requests from the public booking form appear automatically.</div>
            </article>
          </section>


          <section className="grid items-start gap-5 xl:grid-cols-2">
            <div id="services" className="scroll-mt-24"><div className="mb-4"><h2 className="m-0 text-lg font-semibold">Website services</h2><p className="mb-0 mt-1 text-xs text-slate-500">Manage the services visitors can request.</p></div><form action={addService} className={`${panel} mb-3 grid gap-3`}><h3 className="m-0 flex items-center gap-2 text-sm font-semibold"><Plus size={16} className="text-[#438516]"/>Add a service</h3><input className={field} maxLength={120} name="title" placeholder="Service name" required/><textarea className={`${field} min-h-20 py-2`} maxLength={1000} name="description" placeholder="Short description displayed on the site" required/><select className={field} name="icon"><option>Zap</option><option>Building2</option><option>Wrench</option><option>Sun</option><option>PanelsTopLeft</option><option>Droplets</option><option>Lightbulb</option><option>ClipboardCheck</option><option>Camera</option><option>BadgeCheck</option></select><button className="min-h-10 rounded-lg bg-[#58b51b] px-4 text-sm font-semibold text-[#17232d] transition hover:bg-[#6ac52a]">Add service</button></form><div className="grid gap-2">{services.map((service:any)=><article className={`${panel} flex items-start justify-between gap-3 p-4`} key={service.id}><div><h3 className="m-0 text-sm font-semibold">{service.title}</h3><p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">{service.description}</p></div><form action={removeService}><input name="id" type="hidden" value={service.id}/><button className="rounded-lg border border-red-200 px-3 py-2 text-[11px] font-semibold text-red-700 hover:bg-red-50">Remove</button></form></article>)}</div></div>
            <div id="projects" className="scroll-mt-24"><div className="mb-4"><h2 className="m-0 text-lg font-semibold">Website projects</h2><p className="mb-0 mt-1 text-xs text-slate-500">Manage the projects in your public portfolio.</p></div><form action={addProject} className={`${panel} mb-3 grid gap-3`}><h3 className="m-0 flex items-center gap-2 text-sm font-semibold"><Plus size={16} className="text-[#438516]"/>Add a project</h3><input className={field} maxLength={160} name="title" placeholder="Project title" required/><input className={field} maxLength={120} name="category" placeholder="Category" required/><input className={field} name="image" placeholder="Public image path or HTTPS image URL" required/><input className={field} maxLength={240} name="alt" placeholder="Image description for accessibility" required/><p className="m-0 text-[11px] leading-relaxed text-slate-500">Use a path to an image in public, such as /projects/photo.jpg, or an HTTPS image URL.</p><button className="min-h-10 rounded-lg bg-[#58b51b] px-4 text-sm font-semibold text-[#17232d] transition hover:bg-[#6ac52a]">Add project</button></form><div className="grid gap-2">{projects.map((project:any)=><article className={`${panel} flex items-start justify-between gap-3 p-4`} key={project.id}><div className="min-w-0"><h3 className="m-0 text-sm font-semibold">{project.title}</h3><p className="mb-0 mt-1 text-xs text-slate-500">{project.category}</p><p className="mb-0 mt-1 break-all text-[10px] text-slate-400">{project.image_url}</p></div><form action={removeProject}><input name="id" type="hidden" value={project.id}/><button className="rounded-lg border border-red-200 px-3 py-2 text-[11px] font-semibold text-red-700 hover:bg-red-50">Remove</button></form></article>)}</div></div>
          </section>
          <footer className="border-t border-black/[0.07] py-4 text-center text-[10px] text-slate-400">Habitech Power Limited Â· Admin dashboard</footer>
        </div>
      </div>
    </div>
  </main>
}
