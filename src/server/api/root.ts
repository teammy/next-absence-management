import { createTRPCRouter } from '~/server/api/trpc';
import { articleRouter } from '~/server/api/routers/article';
import { leaveRouter } from '~/server/api/routers/leave';
import { authRouter } from '~/server/api/routers/auth';
import { adminLeaveRouter } from '~/server/api/routers/admin/leave';
import { announcementRouter } from '~/server/api/routers/announcement';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { adminSettingHolidayRouter } from '~/server/api/routers/admin/settingHoliday';
import { employeeRouter } from '~/server/api/routers/employee';
import { typeLeaveRouter } from '~/server/api/routers/setting/typeleave';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  article: articleRouter,
  leave: leaveRouter,
  announcement: announcementRouter,
  employee: employeeRouter,
  typeleave: typeLeaveRouter,
  admin: createTRPCRouter({
    leave: adminLeaveRouter,
    settingHoliday: adminSettingHolidayRouter,
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
