import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const heroes = sqliteTable('heroes', {id:text('id').primaryKey(), owner:text('owner').notNull(), sheet:text('sheet').notNull(), createdAt:integer('created_at').notNull()}, t=>[index('idx_heroes_owner').on(t.owner)]);
