import { redirect } from "next/navigation";
import Image from "next/image";
import { desc } from "drizzle-orm";
import {
  ArrowLeft,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { updateBookingStatus, adminLogout } from "@/app/actions/admin";
import { isAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { serviceBookings } from "@/lib/db/schema";

const panel =
  "rounded-2xl border-[1px] border-black/30 bg-white p-5 shadow-[0_3px_16px_rgba(21,29,36,.035)]";

export default async function ServiceRequestsPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  let bookings: (typeof serviceBookings.$inferSelect)[] = [];
  let databaseError = "";
  try {
    bookings = await db
      .select()
      .from(serviceBookings)
      .orderBy(desc(serviceBookings.createdAt));
  } catch (error) {
    databaseError =
      error instanceof Error ? error.message : "Database connection failed";
  }
  const newCount = bookings.filter(
    (booking) => booking.status === "new"
  ).length;

  return (
    <main className="min-h-screen bg-[#f4f6f3] text-[#1c252d]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-[238px] shrink-0 flex-col border-r border-white/10 bg-[#17232d] px-4 py-5 text-white lg:flex">
          <a
            className="mb-10 flex items-center gap-3 px-2"
            href="/"
            aria-label="Habitech homepage"
          >
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-0.5">
              <Image alt="Habitech Power Limited logo" className="object-contain" fill priority sizes="44px" src="/habitech-logo.jpeg" />
            </span>
            <span>
              <b className="block text-sm">HABITECH</b>
              <small className="text-[10px] uppercase tracking-[.15em] text-white/55">
                Power Limited
              </small>
            </span>
          </a>
          <p className="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/40">
            Workspace
          </p>
          <nav className="mt-3 grid gap-1 text-sm">
            <a
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 hover:bg-white/[0.08]"
              href="/admin"
            >
              <LayoutDashboard size={17} />
              Overview
            </a>
            <a
              className="flex items-center gap-3 rounded-xl bg-[#58b51b] px-3 py-3 font-semibold text-[#14200f]"
              href="/admin/requests"
            >
              <ClipboardList size={17} />
              Service requests
              <span className="ml-auto rounded-full bg-black/10 px-2 py-0.5 text-xs">
                {newCount}
              </span>
            </a>
            <a
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 hover:bg-white/[0.08]"
              href="/admin#services"
            >
              <Settings2 size={17} />
              Services
            </a>
            <a
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 hover:bg-white/[0.08]"
              href="/admin#projects"
            >
              <FolderKanban size={17} />
              Projects
            </a>
          </nav>
          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#58b51b]/15 text-[#74d13a]">
              <ShieldCheck size={18} />
            </span>
            <p className="mb-1 mt-3 text-sm font-semibold">Admin workspace</p>
            <p className="m-0 text-xs leading-relaxed text-white/55">
              Customer enquiries and follow-up status.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex min-h-[72px] items-center justify-between border-b border-black/[0.07] bg-white/90 px-4 backdrop-blur-md sm:px-7 lg:px-9">
            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[.17em] text-[#438516]">
                Habitech Power Limited
              </p>
              <h1 className="m-0 mt-0.5 text-lg font-semibold sm:text-xl">
                Service requests
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <a
                className="flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold text-slate-600"
                href="/admin"
              >
                <ArrowLeft size={14} />
                Dashboard
              </a>
              <form action={adminLogout}>
                <button className="flex items-center gap-2 rounded-lg bg-[#17232d] px-3 py-2.5 text-xs font-semibold text-white">
                  <LogOut size={15} />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </div>
          </header>
          <nav
            aria-label="Admin navigation"
            className="flex gap-2 overflow-x-auto border-b border-black/[0.07] bg-white px-4 py-2 lg:hidden"
          >
            <a
              className="whitespace-nowrap rounded-lg px-3 py-2 text-xs text-slate-600"
              href="/admin"
            >
              Overview
            </a>
            <a
              className="whitespace-nowrap rounded-lg bg-[#eaf5e2] px-3 py-2 text-xs font-semibold text-[#438516]"
              href="/admin/requests"
            >
              Requests
            </a>
            <a
              className="whitespace-nowrap rounded-lg px-3 py-2 text-xs text-slate-600"
              href="/admin#services"
            >
              Services
            </a>
            <a
              className="whitespace-nowrap rounded-lg px-3 py-2 text-xs text-slate-600"
              href="/admin#projects"
            >
              Projects
            </a>
          </nav>
          <div className="mx-auto max-w-[1250px] space-y-5 px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="m-0 text-2xl font-semibold tracking-tight">
                  Customer enquiries
                </h2>
                <p className="mb-0 mt-1 text-sm text-slate-500">
                  Review each request and update its follow-up status.
                </p>
              </div>
              <span className="rounded-full bg-[#eaf5e2] px-3 py-2 text-xs font-semibold text-[#438516]">
                {bookings.length} total · {newCount} new
              </span>
            </div>
            {databaseError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                Database is unavailable: {databaseError}. Configure DATABASE_URL
                and ensure the database accepts connections.
              </div>
            )}
            {bookings.length === 0 ? (
              <div className={panel}>
                <p className="m-0 text-sm text-slate-500">
                  No service requests have been received yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 lg:grid-cols-3">
                {bookings.map((booking) => (
                  <article className={panel} key={booking.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf5e2] text-[#438516]">
                          <ClipboardList size={18} />
                        </span>
                        <div className="min-w-0">
                          <h3 className="m-0 text-sm font-semibold">
                            {booking.customerName}
                          </h3>
                          <p className="mb-0 mt-1 text-xs text-slate-500">
                            {booking.service} ·{" "}
                            {new Date(booking.createdAt).toLocaleString(
                              "en-NG",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                                timeZone: "Africa/Lagos",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <form
                        action={updateBookingStatus}
                        className="flex items-center gap-2"
                      >
                        <input name="id" type="hidden" value={booking.id} />
                        <label
                          className="sr-only"
                          htmlFor={`status-${booking.id}`}
                        >
                          Request status
                        </label>
                        <select
                          className="min-h-9 rounded-lg border border-black/20 bg-white px-2 text-xs"
                          defaultValue={booking.status}
                          id={`status-${booking.id}`}
                          name="status"
                        >
                          <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="min-h-9 rounded-lg bg-[#17232d] px-3 text-xs font-semibold text-white">
                          Save status
                        </button>
                      </form>
                    </div>
                    <div className="mt-4 grid gap-3 border-t border-black/15 pt-4 text-xs sm:grid-cols-2 xl:grid-cols-3">
                      <p className="m-0">
                        <span className="text-slate-500">Phone</span>
                        <a
                          className="mt-1 block font-medium text-[#315f19]"
                          href={`tel:${booking.phone}`}
                        >
                          {booking.phone}
                        </a>
                      </p>
                      <p className="m-0 min-w-0">
                        <span className="text-slate-500">Email</span>
                        <a
                          className="mt-1 block break-all font-medium text-[#315f19]"
                          href={`mailto:${booking.email}`}
                        >
                          {booking.email}
                        </a>
                      </p>
                      <p className="m-0">
                        <span className="text-slate-500">
                          Preferred schedule
                        </span>
                        <span className="mt-1 block font-medium">
                          {booking.preferredDate ?? "No date"} ·{" "}
                          {booking.preferredTime ?? "No time"}
                        </span>
                      </p>
                      <p className="m-0 sm:col-span-2 xl:col-span-3">
                        <span className="text-slate-500">Project details</span>
                        <span className="mt-1 block leading-relaxed">
                          {booking.details || "No additional details provided."}
                        </span>
                      </p>
                      <p className="m-0 break-all text-[10px] text-slate-400">
                        Request ID: {booking.id}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
