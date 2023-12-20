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

// setting typeLeave
export const addTypeLeaveFormSetting = z.object({
  leaveTypeDescription: z.string().min(1,{message:"** กรุณาระบุประเภทการลา"}),
  maxAllowPerYear: z.number().min(1,{message:"** กรุณาระบุจำนวนวันลาต่อปี"}),
});
export const updateTypeLeaveFormSetting = addTypeLeaveFormSetting.partial();
export const updateTypeLeaveSetting = z.object({
  id: z.number(),
  data: updateTypeLeaveFormSetting,
});
