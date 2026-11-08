'use client'
import { useActionState } from 'react'
import { adminLogin } from '@/app/actions/admin'

export default function AdminLoginPage() {
  const [message, action, pending] = useActionState(adminLogin, '')
  return <main className="grid min-h-screen place-items-center bg-[#f4f7f2] p-5"><form action={action} className="w-full max-w-sm border-[1px] border-black/30 bg-white p-7 shadow-lg"><p className="text-xs font-bold uppercase tracking-widest text-green-700">Habitech Power</p><h1 className="mt-2 text-2xl font-semibold">Admin sign in</h1><p className="mt-2 text-sm text-slate-600">Sign in to manage requests, services, and projects.</p><label className="mt-6 block text-sm font-medium">Admin password<input autoComplete="current-password" className="mt-2 min-h-11 w-full border-[1px] border-black/30 px-3" name="password" required type="password" /></label>{message && <p className="mt-3 text-sm text-red-700" role="alert">{message}</p>}<button className="mt-5 min-h-11 w-full bg-[#68b82b] font-semibold text-slate-950 disabled:opacity-60" disabled={pending}>{pending?'Signing in…':'Sign in'}</button></form></main>
}
