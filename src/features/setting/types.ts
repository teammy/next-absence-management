import { type RouterOutput } from '~/server/api/root';
import type * as z from 'zod';
import { type addSettingHoliday, type updateSettingHoliday, type destroySettingHoliday } from './helpers/validators';

export type HolidayDateItem = RouterOutput['admin']['settingHoliday']['listHoliday'][number];
export type HolidayDateDetails = RouterOutput['admin']['settingHoliday']['byId'];

export type AddSettingHolidayInput = z.infer<typeof addSettingHoliday>;
export type UpdateSettingHolidayInput = z.infer<typeof updateSettingHoliday>;
export type DestroySettingHolidayInput = z.infer<typeof destroySettingHoliday>;
