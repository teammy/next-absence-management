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

const MAX_FILE_SIZE = 3 * 1_000 * 1_000;
const MAX_TOTAL_SIZE = 30 * 1_000 * 1_000;

export const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  '.pdf',
  'image/heic',
  'image/heif',
];

export const image = z
  .custom<File | null>((image) => image instanceof File, 'Avatar is required.')
  .refine(
    (image) => image && image.size <= MAX_FILE_SIZE,
    'Max file size is 3 MB',
  )
  .refine(
    (image) => image && ACCEPTED_FILE_TYPES.includes(image.type),
    '.jpg, .jpeg, .png, .pdf,.heic,.heif files are accepted.',
  )
  .nullable();
