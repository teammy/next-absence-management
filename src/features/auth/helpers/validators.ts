import * as z from 'zod';

export const login = z.object({
  email: z.string().email({ message: "กรุณาใส่อีเมลให้ถูกต้อง" }),
  password: z.string().min(8,{ message: "กรุณาใส่รหัสผ่านมากกว่า 8 ตัว" }),
});

export const register = login.merge(
  z.object({
    name: z.string().min(1,{ message: "กรุณาใส่ชื่อ-สกุล" }).max(20),
  }),
);

export const profile = register
  .pick({ name: true, email: true })
  .merge(
    z.object({
      image: z.string(),
      password: z.preprocess(
        (v) => (v === '' ? undefined : v),
        z.string().min(8).optional(),
      ),
    }),
  )
  .partial();
