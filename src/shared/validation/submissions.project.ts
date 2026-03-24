import { z } from 'zod';
import { projectIdentitySchema, projectNeedsSchema } from '@/shared/validation/submissions.common';

/** Project form payload from "Contact Us" modal. */
export const projectSubmissionSchema = projectIdentitySchema.extend({
  formType: z.literal('project'),
  needs: projectNeedsSchema.optional(),
});

export type ProjectSubmissionInput = z.infer<typeof projectSubmissionSchema>;
