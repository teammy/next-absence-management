import { type RouterOutput } from "~/server/api/root";
import type * as z from "zod";
import {
  type addSettingHoliday,
  type updateSettingHoliday,
  type destroySettingHoliday,
  type addTypeLeaveFormSetting,
  type updateTypeLeave,
} from "./helpers/validators";

export type HolidayDateItem =
  RouterOutput["admin"]["settingHoliday"]["listHoliday"][number];
export type HolidayDateDetails =
  RouterOutput["admin"]["settingHoliday"]["byId"];

export type AddSettingHolidayInput = z.infer<typeof addSettingHoliday>;
export type UpdateSettingHolidayInput = z.infer<typeof updateSettingHoliday>;
export type DestroySettingHolidayInput = z.infer<typeof destroySettingHoliday>;

export type TypeLeaveDetails = RouterOutput["typeleave"]["byId"];
export type AddTypeLeaveSettingInput = z.infer<typeof addTypeLeaveFormSetting>;
export type UpdateTypeLeaveSettingInput = z.infer<typeof updateTypeLeave>;
