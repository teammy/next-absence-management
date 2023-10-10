import * as z from 'zod';

export const add = z.object({
  startLeaveDate: z.string().min(1),
  endLeaveDate: z.string().min(1),
  totalLeaveDays: z.string().min(1),
  typeLeave: z.string().min(1),
  reason: z.string().min(1),
});

export const updateForm = add.partial();

export const update = z.object({
  id: z.number(),
  data: updateForm,
});
