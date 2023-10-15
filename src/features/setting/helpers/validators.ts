import { z } from "zod";

export const addHoliday = z.object({
  
  holidayDate: z.string().min(1),
  holidayName: z.string().min(1),
  holidayType: z.string().min(1),
});

export const updateFormHoliday = addHoliday.partial();

export const updateHoliday = z.object({
  holidayId: z.number(),
  data: updateFormHoliday,
});

export const destroyHoliday = z.number();