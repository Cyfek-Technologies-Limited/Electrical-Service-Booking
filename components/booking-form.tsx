'use client'

import { useActionState } from 'react'
import { CalendarDays, CheckCircle2, Clock3, LoaderCircle, Send } from 'lucide-react'
import { submitBooking, type BookingState } from '@/app/actions/bookings'

const initialState: BookingState = { status: 'idle', message: '' }

export function BookingForm() {
  const [state, formAction, isPending] = useActionState(submitBooking, initialState)

  return (
    <form action={formAction} className="booking-form">
      <div className="form-intro">
        <span className="eyebrow">REQUEST A QUOTATION</span>
        <h3>Let’s get it sorted.</h3>
        <p>Tell us a little about the job. We’ll be in touch to confirm the details.</p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Full name</span>
          <input autoComplete="name" maxLength={120} name="customerName" placeholder="Your name" required />
        </label>
        <label className="field">
          <span>Phone number</span>
          <input autoComplete="tel" maxLength={40} name="phone" placeholder="0703 766 9919" required type="tel" />
        </label>
        <label className="field field-full">
          <span>Email address</span>
          <input autoComplete="email" maxLength={254} name="email" placeholder="you@example.com" required type="email" />
        </label>
        <label className="field field-full">
          <span>What can we help with?</span>
          <select defaultValue="" name="service" required>
            <option disabled value="">Select a service</option>
            <option>Electrical installation</option>
            <option>Industrial electrical services</option>
            <option>Electrical maintenance and troubleshooting</option>
            <option>Solar inverter system</option>
            <option>Solar panel installation</option>
            <option>Solar water pumping system</option>
            <option>Electrical equipment and materials</option>
            <option>Control panels and electrical systems</option>
            <option>CCTV and security system</option>
            <option>Electrical consultancy and project support</option>
            <option>Other electrical service</option>
          </select>
        </label>
        <label className="field">
          <span>Preferred date <span className="optional">(optional)</span></span>
          <span className="input-with-icon">
            <CalendarDays aria-hidden="true" size={17} />
            <input name="preferredDate" type="date" />
          </span>
        </label>
        <label className="field">
          <span>Best time <span className="optional">(optional)</span></span>
          <span className="input-with-icon">
            <Clock3 aria-hidden="true" size={17} />
            <select defaultValue="" name="preferredTime">
              <option value="">Choose a time</option>
              <option>Any available time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Emergency — call me now</option>
            </select>
          </span>
        </label>
        <label className="field field-full">
          <span>Project details <span className="optional">(optional)</span></span>
          <textarea maxLength={2000} name="details" placeholder="What’s going on? Include any details that will help us prepare." rows={3} />
        </label>
      </div>

      <div aria-hidden="true" className="honeypot-field">
        <label htmlFor="companyWebsite">Company website</label>
        <input autoComplete="off" id="companyWebsite" name="companyWebsite" tabIndex={-1} />
      </div>

      {state.message ? (
        <div aria-live="polite" className={`form-feedback ${state.status}`} role={state.status === 'error' ? 'alert' : 'status'}>
          {state.status === 'success' && <CheckCircle2 aria-hidden="true" size={18} />}
          <span>{state.message}</span>
        </div>
      ) : null}

      <button className="button button-primary form-submit" disabled={isPending || state.status === 'success'} type="submit">
        {isPending ? <LoaderCircle aria-hidden="true" className="spin" size={18} /> : <Send aria-hidden="true" size={17} />}
        {isPending ? 'Sending request…' : state.status === 'success' ? 'Request received' : 'Request a quotation'}
      </button>
      <p className="form-privacy">Your information stays with our team. No spam, ever.</p>
    </form>
  )
}
