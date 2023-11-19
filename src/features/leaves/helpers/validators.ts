import { z } from "zod"

export const add = z.object({
  startLeaveDate: z.string(),
  endLeaveDate: z.string(),
  totalLeaveDays: z.number().min(1),
  typeLeave: z.string().min(1),
  reason: z.string().min(1),
  // assignUser : z.number().min(1),
  leaveLocation : z.string().min(1),
  // leaveContact : z.string().min(1),
});

export const updateForm = add.partial();

export const update = z.object({
  id: z.number(),
  data: updateForm,
});