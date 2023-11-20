import * as z from 'zod';

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
