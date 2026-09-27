import type { Conversation, Notification, Report, User } from "@/lib/types";

/**
 * Gegevens voor accounts, berichten en beheer. Leeg totdat authenticatie en
 * een database gekoppeld zijn (zie lib/repository.ts).
 */
export const conversations: Conversation[] = [];
export const users: User[] = [];
export const notifications: Notification[] = [];
export const reports: Report[] = [];
