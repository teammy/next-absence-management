import { type RouterOutput } from '~/server/api/root';
import type * as z from 'zod';
import { type addHoliday, type updateHoliday, type destroyHoliday } from './helpers/validators';

export type AdminLeaveItem = RouterOutput['admin']['leave']['list'][number];
export type HolidayDateItem = RouterOutput['admin']['settingHoliday']['listHoliday'][number];


export type AddHolidayInput = z.infer<typeof addHoliday>;
export type UpdateHolidayInput = z.infer<typeof updateHoliday>;
export type DestroyHolidayInput = z.infer<typeof destroyHoliday>;
