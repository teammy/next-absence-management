import * as z from 'zod';

export const login = z.object({
  person_username: z.string().min(5,{ message: "กรุณาระบุชื่อผู้ใช้งาน" }),
  person_password: z.string().min(8,{ message: "กรุณาใส่รหัสผ่านมากกว่า 8 ตัว" }),
});

export const register = login.merge(
  z.object({
    person_id: z.string().min(13,{ message: "กรุณาระบุเลขบัตรประชาชน 13 หลัก" }).max(13),
    person_email: z.string().email({ message: "กรุณาระบุอีเมล" }),
    person_firstname: z.string().min(1,{ message: "กรุณาระบุชื่อ" }).max(20),
    person_lastname: z.string().min(1,{ message: "กรุณาระบุนามสกุล" }).max(20),
    person_tel: z.string().min(10,{ message: "กรุณาระบุเบอร์โทรศัพท์มือถือ" }).max(10),
  }),
);

export const profile = register
  .pick({ person_firstname: true, person_username: true })
  .merge(
    z.object({
      image: z.string(),
      person_password_hash: z.preprocess(
        (v) => (v === '' ? undefined : v),
        z.string().min(8).optional(),
      ),
    }),
  )
  .partial();
