import { z } from "zod";
import { createTRPCRouter,protectedProcedure } from "../trpc";
import * as validators from '~/features/setting/helpers/validators';
import { TRPCError } from '@trpc/server';
import { tr } from "@faker-js/faker";

export const employeeRouter = createTRPCRouter({
  listEmployeeName: protectedProcedure
    .meta({ roles: ['ADMIN', 'HR'] })
    .query(async ({ ctx }) => {
      const listNameEmployee = await ctx.prisma.personal.findMany({
        select: {
          user_id: true,
          person_firstname: true,
          person_lastname: true,
        }
      });
      return listNameEmployee;
    }),
    byId: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
      const profileByid = await ctx.prisma.personal.findUnique({
        where: { user_id: input },
        select: {
          person_id: true,
          person_firstname: true,
          person_lastname: true,
          person_tel: true,
          person_email: true,
          // office_id: true,
        },
      });
  
      if (!profileByid) throw new TRPCError({ code: 'NOT_FOUND' });
      return profileByid;
    }),

    listEmployeePerDepartment: protectedProcedure
    .input(z.number())
    .query(async ({ input,ctx }) => {
      const listEmployeeByDepartment = await ctx.prisma.personal.findMany({
        where: {
          office_id: input,
        },
        select: {
          person_firstname: true,
          person_lastname: true,
          user_id: true,
        }
      });
      if(!listEmployeeByDepartment) throw new TRPCError({ code: 'NOT_FOUND' });
      
      return listEmployeeByDepartment;
    }),

});