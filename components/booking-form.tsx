'use client'

import { useActionState } from 'react'
import { CalendarDays, CheckCircle2, Clock3, LoaderCircle, Send } from 'lucide-react'
import { submitBooking, type BookingState } from '@/app/actions/bookings'

const initialState: BookingState = { status: 'idle', message: '' }
const fieldClass = 'min-w-0 flex flex-col gap-1.5 text-[10px] font-bold text-[#3c4348]'
const controlClass = 'min-h-[42px] w-full border-[1px] border-black/30 bg-white px-3 py-2.5 text-[11px] font-normal text-[#202428] outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/30 placeholder:text-[#9aa1a5]'

export function BookingForm() {
  const [state, formAction, isPending] = useActionState(submitBooking, initialState)

  return (
    <form action={formAction} className="border-[1px] border-black/30 bg-white p-[22px] shadow-[0_18px_50px_rgba(21,29,36,.07)] sm:p-[31px]">
      <div className="mb-5">
        <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.16em] text-habitech-green-dark">Request a quotation</span>
        <h3 className="m-0 text-2xl font-semibold tracking-tight">Let’s discuss your project.</h3>
        <p className="mt-1.5 text-[11px] text-habitech-muted">Tell us what you need and we’ll follow up with details for a quotation.</p>
      </div>

      <div className="grid grid-cols-1 gap-x-3 gap-y-[15px] sm:grid-cols-2">
        <label className={fieldClass}><span>Full name</span><input autoComplete="name" className={controlClass} maxLength={120} name="customerName" placeholder="Your name" required /></label>
        <label className={fieldClass}><span>Phone number</span><input autoComplete="tel" className={controlClass} maxLength={40} name="phone" placeholder="0703 766 9919" required type="tel" /></label>
        <label className={`${fieldClass} sm:col-span-2`}><span>Email address</span><input autoComplete="email" className={controlClass} maxLength={254} name="email" placeholder="you@example.com" required type="email" /></label>
        <label className={`${fieldClass} sm:col-span-2`}><span>What can we help with?</span><select className={controlClass} defaultValue="" name="service" required><option disabled value="">Select a service</option><option>Electrical installation</option><option>Industrial electrical services</option><option>Electrical maintenance and troubleshooting</option><option>Solar inverter system</option><option>Solar panel installation</option><option>Solar water pumping system</option><option>Electrical equipment and materials</option><option>Control panels and electrical systems</option><option>CCTV and security system</option><option>Electrical consultancy and project support</option><option>Other electrical service</option></select></label>
        <label className={fieldClass}><span>Preferred date <span className="font-normal text-[#8b9296]">(optional)</span></span><span className="relative block"><CalendarDays aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-[#81888d]" size={17}/><input className={`${controlClass} pl-[34px]`} name="preferredDate" type="date" /></span></label>
        <label className={fieldClass}><span>Best time <span className="font-normal text-[#8b9296]">(optional)</span></span><span className="relative block"><Clock3 aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-[#81888d]" size={17}/><select className={`${controlClass} pl-[34px]`} defaultValue="" name="preferredTime"><option value="">Choose a time</option><option>Any available time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Emergency — call me now</option></select></span></label>
        <label className={`${fieldClass} sm:col-span-2`}><span>Project details <span className="font-normal text-[#8b9296]">(optional)</span></span><textarea className={`${controlClass} min-h-[83px] resize-y`} maxLength={2000} name="details" placeholder="Describe the work, location, equipment, and project requirements." rows={3} /></label>
      </div>

      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]"><label htmlFor="companyWebsite">Company website</label><input autoComplete="off" id="companyWebsite" name="companyWebsite" tabIndex={-1} /></div>
      {state.message ? <div aria-live="polite" className={`mt-4 flex items-start gap-2 border-[1px] border-black/30 px-3 py-2.5 text-[11px] leading-relaxed ${state.status === 'success' ? 'bg-[#f1faf4] text-[#245b36]' : 'bg-[#fff5f3] text-[#8b2c20]'}`} role={state.status === 'error' ? 'alert' : 'status'}>{state.status === 'success' && <CheckCircle2 aria-hidden="true" className="shrink-0" size={18}/>}<span>{state.message}</span></div> : null}
      <button className="mt-[18px] inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 border-[1px] border-black/30 bg-habitech-green-bright px-5 text-xs font-extrabold text-[#15191c] transition hover:bg-[#75d53c] disabled:cursor-not-allowed disabled:opacity-70" disabled={isPending || state.status === 'success'} type="submit">{isPending ? <LoaderCircle aria-hidden="true" className="animate-spin" size={18}/> : <Send aria-hidden="true" size={17}/>} {isPending ? 'Sending request…' : state.status === 'success' ? 'Request received' : 'Request a quotation'}</button>
      <p className="mt-3 text-center text-[9px] text-[#858d92]">Your information stays with our team. No spam, ever.</p>
    </form>
  )
}
