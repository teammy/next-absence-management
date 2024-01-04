import { z } from "zod"

export const add = z.object({
  startLeaveDate: z.string().min(1,{message:"** กรุณาระบุวันที่เริ่มต้นการลา"}),
  endLeaveDate: z.string().min(1,{message:"** กรุณาระบุวันที่สิ้นสุดการลา"}),
  totalLeaveDays: z.number(),
  typeLeave: z.string().min(1,{message:"** กรุณาเลือกประเภทการลา"}),
  reason: z.string().min(1,{message:"** กรุณาระบุเหตุผลการลา"}),
  assignUser : z.string().min(1,{message:"** กรุณาเลือกผู้รับผิดชอบ"}),
  leaveLocation : z.string().min(1,{message:"** กรุณาระบุสถานที่ติดต่อระหว่างการลา"}),
  leaveContactNumber : z.string().min(1,{message:"** กรุณาระบุเบอร์โทรศัพท์ติดต่อระหว่างการลา"}),
  uploadFiles: z.array(z.string())
});

export const addTest = z.object({
  startDate: z
  .date()
  .nullable()
  .refine((date) => date !==null, { message: 'กรุณาระบุวันที่เริ่มต้นการลา' }),
  // endLeaveDate: z.string().min(1,{message:"** กรุณาระบุวันที่สิ้นสุดการลา"}),
  // totalLeaveDays: z.number(),
  typeLeave: z.coerce.number().min(1,{message:"** กรุณาเลือกประเภทการลา"}),
  // reason: z.string().min(1,{message:"** กรุณาระบุเหตุผลการลา"}),
  // assignUser : z.string().min(1,{message:"** กรุณาเลือกผู้รับผิดชอบ"}),
  // leaveLocation : z.string().min(1,{message:"** กรุณาระบุสถานที่ติดต่อระหว่างการลา"}),
  // leaveContactNumber : z.string().min(1,{message:"** กรุณาระบุเบอร์โทรศัพท์ติดต่อระหว่างการลา"}),
  // uploadFiles: z.array(z.string())
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
