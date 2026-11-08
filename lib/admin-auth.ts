import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'

const cookieName = 'habitech-admin'
const lifetime = 60 * 60 * 8

function signature(expires: string) {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured')
  return createHmac('sha256', secret).update(expires).digest('hex')
}

export async function isAdmin() {
  const secret = process.env.ADMIN_SESSION_SECRET
  const password = process.env.ADMIN_PASSWORD
  if (!secret || !password) return false
  const value = (await cookies()).get(cookieName)?.value ?? ''
  const [expires, supplied] = value.split('.')
  if (!expires || !supplied || Number(expires) < Date.now()) return false
  const expected = signature(expires)
  const a = Buffer.from(supplied)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function login(password: string) {
  const configured = process.env.ADMIN_PASSWORD
  if (!configured || !process.env.ADMIN_SESSION_SECRET) return false
  const a = Buffer.from(password)
  const b = Buffer.from(configured)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  const expires = String(Date.now() + lifetime * 1000)
  ;(await cookies()).set(cookieName, `${expires}.${signature(expires)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: lifetime,
  })
  return true
}

export async function logout() {
  (await cookies()).delete(cookieName)
}

export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Unauthorized')
}
