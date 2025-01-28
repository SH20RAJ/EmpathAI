import { mysqlTable, text, timestamp, varchar, int, json } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const conversations = mysqlTable('conversations', {
  id: varchar('id', { length: 255 }).primaryKey(),
  title: varchar('title', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const conversationRelations = relations(conversations, ({ many }) => ({
  messages: many(messages),
}));

export const messages = mysqlTable('messages', {
  id: varchar('id', { length: 255 }).primaryKey(),
  conversationId: varchar('conversation_id', { length: 255 }).references(() => conversations.id).notNull(),
  content: text('content').notNull(),
  role: varchar('role', { length: 50 }).notNull(), // 'user' or 'assistant'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const messageRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

export const moodEntries = mysqlTable('mood_entries', {
  id: varchar('id', { length: 255 }).primaryKey(),
  moodScore: int('mood_score').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const resources = mysqlTable('resources', {
  id: varchar('id', { length: 255 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  tags: json('tags').notNull(),
  readTime: varchar('read_time', { length: 20 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
