'use server'

import { db } from '@/lib/db'
import { serviceBookings } from '@/lib/db/schema'

export type BookingState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const services = new Set([
  'Electrical installation',
  'Industrial electrical services',
  'Electrical maintenance and troubleshooting',
  'Solar inverter system',
  'Solar panel installation',
  'Solar water pumping system',
  'Electrical equipment and materials',
  'Control panels and electrical systems',
  'CCTV and security system',
  'Electrical consultancy and project support',
  'Other electrical service',
])

const timeSlots = new Set([
  'Any available time',
  'Morning',
  'Afternoon',
  'Evening',
  'Emergency — call me now',
])

export async function submitBooking(
  _previousState: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const honeypot = String(formData.get('companyWebsite') ?? '').trim()
  if (honeypot) {
    return { status: 'success', message: 'Your request has been received.' }
  }

  const customerName = String(formData.get('customerName') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const service = String(formData.get('service') ?? '').trim()
  const details = String(formData.get('details') ?? '').trim()
  const rawDate = String(formData.get('preferredDate') ?? '').trim()
  const preferredTime = String(formData.get('preferredTime') ?? '').trim()

  if (customerName.length < 2 || customerName.length > 120) {
    return { status: 'error', message: 'Please enter your name (2–120 characters).' }
  }
  if (phone.length < 7 || phone.length > 40) {
    return { status: 'error', message: 'Please enter a valid phone number.' }
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }
  if (!services.has(service)) {
    return { status: 'error', message: 'Please choose an electrical service.' }
  }
  if (details.length > 2000) {
    return { status: 'error', message: 'Please keep project details under 2,000 characters.' }
  }
  if (preferredTime && !timeSlots.has(preferredTime)) {
    return { status: 'error', message: 'Please choose one of the listed time windows.' }
  }

  let preferredDate: string | null = null
  if (rawDate) {
    const parsedDate = new Date(`${rawDate}T00:00:00.000Z`)
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(rawDate) ||
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== rawDate
    ) {
      return { status: 'error', message: 'Please choose a valid preferred date.' }
    }
    preferredDate = rawDate
  }

  try {
    await db.insert(serviceBookings).values({
      customerName,
      phone,
      email,
      service,
      details: details || null,
      preferredDate,
      preferredTime: preferredTime || null,
    })

    return {
      status: 'success',
      message: 'Thanks — your request is in. Habitech Power Limited will contact you shortly to discuss your project.',
    }
  } catch {
    return {
      status: 'error',
      message: 'We couldn’t send your request just now. Please call us and we’ll help you directly.',
    }
  }
}
