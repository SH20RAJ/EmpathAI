import { pgTable, text, timestamp, uuid, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  conversations: many(conversations),
  moodEntries: many(moodEntries),
  preferences: many(userPreferences),
}));

export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const conversationRelations = relations(conversations, ({ one, many }) => ({
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id').references(() => conversations.id).notNull(),
  content: text('content').notNull(),
  role: text('role').notNull(), // 'user' or 'assistant'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const messageRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

export const moodEntries = pgTable('mood_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  moodScore: integer('mood_score').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const moodEntryRelations = relations(moodEntries, ({ one }) => ({
  user: one(users, {
    fields: [moodEntries.userId],
    references: [users.id],
  }),
}));

export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  theme: text('theme').default('light'),
  language: text('language').default('en'),
  notificationSettings: jsonb('notification_settings').default({}),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userPreferenceRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));
