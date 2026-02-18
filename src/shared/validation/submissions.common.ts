import { z } from 'zod';

const NAME_PATTERN = /^[\p{L}\p{M}' -]+$/u;

/** Person name: trimmed, 2-40 chars, letters/spaces/apostrophe/hyphen only. */
export const personNameSchema = z
  .string()
  .trim()
  .min(2, 'Must contain at least 2 characters')
  .max(40, 'Must contain at most 40 characters')
  .regex(NAME_PATTERN, 'Only letters, spaces, apostrophes and hyphens are allowed');

/** Optional message for project request. */
export const projectMessageSchema = z
  .string()
  .trim()
  .min(10, 'Must contain at least 10 characters')
  .max(1000, 'Must contain at most 1000 characters');

/** Shared identity fields for project form. */
export const projectIdentitySchema = z.object({
  firstName: personNameSchema,
  lastName: personNameSchema,
  email: z.string().trim().email('Must be a valid email').max(120, 'Email is too long'),
});
