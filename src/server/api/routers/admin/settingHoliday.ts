import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from '../../trpc';
import * as validators from '~/features/setting/helpers/validators';
import { TRPCError } from '@trpc/server';

export const adminSettingHolidayRouter = createTRPCRouter({
  listHoliday: protectedProcedure
    .meta({ roles: ['ADMIN', 'HR'] })
    .query(async ({ ctx }) => {
      const holidaySetting = await ctx.prisma.holidayDate.findMany({
        select: {
          holidayId: true,
          holidayDate: true,
          holidayName: true,
          holidayType: true,
        }
      });
      return holidaySetting;
    }),
  addHoliday: protectedProcedure
    .meta({ roles: ['ADMIN', 'HR'] })
    .input(validators.addHoliday)
    .mutation(async ({ ctx, input }) => {
      const holidaySetting = await ctx.prisma.holidayDate.create({
        data: {
          ...input,
        }
      });
      return holidaySetting;
    }),
  updateHoliday: protectedProcedure
  .meta({ roles: ['ADMIN', 'HR'] })
  .input(validators.updateHoliday)
  .mutation(async ({ ctx, input }) => {
    const existingHoliday = await ctx.prisma.holidayDate.findUnique({
      where: {
        holidayId: input.holidayId,
      },
    });

    if (!existingHoliday) throw new TRPCError({ code: 'NOT_FOUND' });

    const holidaySetting = await ctx.prisma.holidayDate.update({
      where: {
        holidayId: input.holidayId,
      },
      data: {
        ...input,
      }
    });
    return holidaySetting;
  }),

  destroyHoliday: protectedProcedure
  .meta({ roles: ['ADMIN', 'HR'] })
  .input(validators.destroyHoliday)
  .mutation(async ({ ctx, input }) => {
    const existingHoliday = await ctx.prisma.holidayDate.findUnique({
      where: {
        holidayId: input,
      },
    });

    if (!existingHoliday) throw new TRPCError({ code: 'NOT_FOUND' });

    const holidaySetting = await ctx.prisma.holidayDate.delete({
      where: {
        holidayId: input,
      },
    });
    return holidaySetting;
  }),
});