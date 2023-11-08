import { z } from "zod";

export const addSettingHoliday = z.object({
  holidayDate: z.string().min(1),
  holidayName: z.string().min(1),
  holidayTypeId: z.coerce.number().min(1),
});

export const updateFormHoliday = addSettingHoliday.partial();

export const updateSettingHoliday = z.object({
  id: z.number(),
  data: updateFormHoliday,
});

export const destroySettingHoliday = z.number();