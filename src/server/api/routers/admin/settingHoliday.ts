import { z } from "zod";
import { createTRPCRouter,protectedProcedure } from "../../trpc";
import * as validators from '~/features/setting/helpers/validators';
import { TRPCError } from '@trpc/server';

export const adminSettingHolidayRouter = createTRPCRouter({
  listHoliday: protectedProcedure
    .meta({ roles: ['ADMIN', 'HR'] })
    .query(async ({ ctx }) => {
      const holidaySetting = await ctx.prisma.holidayDate.findMany({
        select: {
          id: true,
          holidayDate: true,
          holidayName: true,
          holidayTypeId: true,
        }
      });
      return holidaySetting;
    }),
  addHoliday: protectedProcedure
    .meta({ roles: ['ADMIN', 'HR'] })
    .input(validators.addSettingHoliday)
    .mutation(async ({ ctx, input }) => {
      const holidaySetting = await ctx.prisma.holidayDate.create({
        data: {
          ...input,
        }
      });
      return holidaySetting;
    }),
  byId : protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const holidaySetting = await ctx.prisma.holidayDate.findUnique({
      where: { id: input },
      select: {
        id: true,
        holidayDate: true,
        holidayName: true,
        holidayTypeId: true,
      },
    });

    if (!holidaySetting) throw new TRPCError({ code: 'NOT_FOUND' });

    return holidaySetting;
  }),
  updateHoliday: protectedProcedure
  .meta({ roles: ['ADMIN', 'HR'] })
  .input(validators.updateSettingHoliday)
  .mutation(async ({ ctx, input }) => {
    const existingHoliday = await ctx.prisma.holidayDate.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!existingHoliday) throw new TRPCError({ code: 'NOT_FOUND' });

    const holidaySetting = await ctx.prisma.holidayDate.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      }
    });
    return holidaySetting;
  }),

  destroyHoliday: protectedProcedure
  .meta({ roles: ['ADMIN', 'HR'] })
  .input(validators.destroySettingHoliday)
  .mutation(async ({ ctx, input }) => {
    const existingHoliday = await ctx.prisma.holidayDate.findUnique({
      where: {
        id: input,
      },
    });

    if (!existingHoliday) throw new TRPCError({ code: 'NOT_FOUND' });

    const holidaySetting = await ctx.prisma.holidayDate.delete({
      where: {
        id: input,
      },
    });
    return holidaySetting;
  }),

  listHolidayType: protectedProcedure
    .meta({ roles: ['ADMIN', 'HR'] })
    .query(async ({ ctx }) => {
      const holidayType = await ctx.prisma.holidayType.findMany({
        select: {
          id: true,
          holidayType: true,
        }
      });
      return holidayType;
    }),
});