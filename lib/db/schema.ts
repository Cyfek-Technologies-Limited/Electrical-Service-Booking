import { pgTable, text, timestamp, uuid, varchar, date } from 'drizzle-orm/pg-core'

export const serviceBookings = pgTable('service_bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerName: varchar('customer_name', { length: 120 }).notNull(),
  phone: varchar('phone', { length: 40 }).notNull(),
  email: varchar('email', { length: 254 }).notNull(),
  service: varchar('service', { length: 100 }).notNull(),
  details: text('details'),
  preferredDate: date('preferred_date', { mode: 'string' }),
  preferredTime: varchar('preferred_time', { length: 40 }),
  status: varchar('status', { length: 24 }).notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
