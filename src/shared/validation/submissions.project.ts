import { z } from 'zod';
import { projectIdentitySchema, projectMessageSchema } from '@/shared/validation/submissions.common';

/** Project form payload from "Contact Us" modal. */
export const projectSubmissionSchema = projectIdentitySchema.extend({
  message: projectMessageSchema.optional(),
});

export type ProjectSubmissionInput = z.infer<typeof projectSubmissionSchema>;
