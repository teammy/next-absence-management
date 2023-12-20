import * as z from "zod";
import { createTRPCRouter,protectedProcedure } from "../../trpc";
import * as validators from "~/features/setting/helpers/validators";
import { TRPCError } from "@trpc/server";

export const typeLeaveRouter = createTRPCRouter({
  list : protectedProcedure
    // .meta({roles : ['ADMIN','HR',]})
    .query(async ({ctx}) => {
      const typeLeave = await ctx.prisma.leaveType.findMany({
        select : {
          id : true,
          leaveTypeDescription : true,
          maxAllowPerYear : true,
        },
       
      });
      return typeLeave;
    }),
  
  add: protectedProcedure
    .input(validators.addTypeLeaveFormSetting)
    .mutation(async ({ input, ctx }) => {
      const typeLeave = await ctx.prisma.leaveType.create({
        data: {
          leaveTypeDescription: input.leaveTypeDescription,
          maxAllowPerYear: input.maxAllowPerYear,
        },
      });

      if(!typeLeave) throw new TRPCError({code : "FORBIDDEN"});

      return typeLeave;
    }),

  update: protectedProcedure
    .input(validators.updateTypeLeaveSetting)
    .mutation(async ({ input, ctx }) => {

      const existingTypeLeave = await ctx.prisma.leaveType.findUnique({
        where: {
          id: input.id,
        },
      });

      if(existingTypeLeave?.id !== input.id) throw new TRPCError({code : "FORBIDDEN"});

      const typeLeave = await ctx.prisma.leaveType.update({
        where: {
          id: input.id,
        },
        data: {
          leaveTypeDescription: input.data.leaveTypeDescription,
          maxAllowPerYear: input.data.maxAllowPerYear,
        },
      });

      if(!typeLeave) throw new TRPCError({code : "FORBIDDEN"});

      return typeLeave;
    }),
  
  destroy: protectedProcedure
  .input(z.number())
  .mutation(async ({ input,ctx }) => {
    const typeLeave = await ctx.prisma.leaveType.findUnique({
      where: {
        id: input
      }
    });

    if(!typeLeave) throw new TRPCError({ code:'NOT_FOUND'})

    const destroyTypeLeave = await ctx.prisma.leaveType.delete({
      where: {
        id:input,
      },
    });
    return destroyTypeLeave
  })
});