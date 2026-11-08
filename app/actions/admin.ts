'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { ensureAdminTables } from '@/lib/admin-data'
import { login, logout, requireAdmin } from '@/lib/admin-auth'

export async function adminLogin(_state: string, form: FormData) {
  const ok = await login(String(form.get('password') ?? ''))
  if (!ok) return 'Password was not accepted, or admin credentials are not configured.'
  redirect('/admin')
}

export async function adminLogout() { await logout(); redirect('/admin/login') }

export async function addService(form: FormData) {
  await requireAdmin(); await ensureAdminTables()
  const title=String(form.get('title')??'').trim(), description=String(form.get('description')??'').trim(), icon=String(form.get('icon')??'Zap')
  if(title.length<2||title.length>120||!description||description.length>1000||!['Zap','Building2','Wrench','Sun','PanelsTopLeft','Droplets','Lightbulb','ClipboardCheck','Camera','BadgeCheck'].includes(icon)) throw new Error('Invalid service details')
  await db.execute(sql`INSERT INTO site_services (title,description,icon) VALUES (${title},${description},${icon})`)
  revalidatePath('/'); revalidatePath('/admin')
}
export async function removeService(form: FormData) {
  await requireAdmin(); await ensureAdminTables()
  await db.execute(sql`DELETE FROM site_services WHERE id = ${String(form.get('id')??'')}`)
  revalidatePath('/'); revalidatePath('/admin')
}
export async function addProject(form: FormData) {
  await requireAdmin(); await ensureAdminTables()
  const title=String(form.get('title')??'').trim(), category=String(form.get('category')??'').trim(), image=String(form.get('image')??'').trim(), alt=String(form.get('alt')??'').trim()
  if(title.length<2||title.length>160||!category||category.length>120||!image||image.length>1500||!alt||alt.length>240) throw new Error('Invalid project details')
  if(!image.startsWith('/')&&!/^https:\/\//i.test(image)) throw new Error('Use a public-folder path or HTTPS image URL')
  await db.execute(sql`INSERT INTO site_projects (title,category,image_url,alt_text) VALUES (${title},${category},${image},${alt})`)
  revalidatePath('/'); revalidatePath('/admin')
}
export async function removeProject(form: FormData) {
  await requireAdmin(); await ensureAdminTables()
  await db.execute(sql`DELETE FROM site_projects WHERE id = ${String(form.get('id')??'')}`)
  revalidatePath('/'); revalidatePath('/admin')
}
export async function updateBookingStatus(form: FormData) {
  await requireAdmin()
  const status=String(form.get('status')??'')
  if(!['new','contacted','completed'].includes(status)) throw new Error('Invalid request status')
  await db.update((await import('@/lib/db/schema')).serviceBookings).set({status}).where(sql`id = ${String(form.get('id')??'')}`)
  revalidatePath('/admin')
}
