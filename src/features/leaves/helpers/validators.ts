import { z } from "zod"

export const add = z.object({
  startLeaveDate: z.string(),
  endLeaveDate: z.string(),
  totalLeaveDays: z.number().min(1),
  typeLeave: z.string().min(1),
  reason: z.string().min(1),
  assignUser : z.number().min(1),
  leaveLocation : z.string().min(1),
  leaveContactNumber : z.string().min(1),
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
  .custom<File | null>((fileFromField) => fileFromField instanceof File, 'Avatar is required.')
  .refine(
    (fileFromField) => fileFromField && fileFromField.size <= MAX_FILE_SIZE,
    'Max file size is 3 MB',
  )
  .refine(
    (fileFromField) => fileFromField && ACCEPTED_FILE_TYPES.includes(fileFromField.type),
    '.jpg, .jpeg, .png, .pdf,.heic,.heif files are accepted.',
  )
  .nullable();
