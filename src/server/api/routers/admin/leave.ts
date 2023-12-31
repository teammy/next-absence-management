import * as z from 'zod';
import { createTRPCRouter, protectedProcedure } from '../../trpc';

export const adminLeaveRouter = createTRPCRouter({
  list: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .query(async ({ ctx }) => {
      const leaves = await ctx.prisma.leaveItem.findMany({
        select: {
          id: true,
          startLeaveDate: true,
          endLeaveDate: true,
          totalLeaveDays: true,
          typeLeave: true,
          reason: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return leaves;
    }),
  byId: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const leave = await ctx.prisma.leaveItem.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          startLeaveDate: true,
          endLeaveDate: true,
          totalLeaveDays: true,
          typeLeave: true,
          reason: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return leave;
    }),
  approve: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const leave = await ctx.prisma.leaveItem.update({
        where: {
          id: input,
        },
        data: {
          status: 'APPROVED',
        },
      });

      return leave;
    }),
  reject: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const leave = await ctx.prisma.leaveItem.update({
        where: {
          id: input,
        },
        data: {
          status: 'REJECTED',
        },
      });

      return leave;
    }),
});
