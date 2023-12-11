import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import * as validators from '~/features/leaves/helpers/validators';
import * as z from 'zod';
import { TRPCError } from '@trpc/server';

export const leaveRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const leaves = await ctx.prisma.leaveItem.findMany({
      where: {
        userId: +ctx.session.user.user_id,
      },
      select: {
        id: true,
        reason: true,
        startLeaveDate: true,
        endLeaveDate: true,
        status: true,
        typeLeave: true,
        totalLeaveDays: true,
        managerStatus: true,
        departmentHeadStatus: true,
        hrStatus: true,
        // user: {
        //   select: {
        //     id: true,
        //     name: true,
        //     email: true,
        //   },
        // },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return leaves;
  }),
  byId: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const leave = await ctx.prisma.leaveItem.findUnique({
      where: { id: input },
      select: {
        id: true,
        startLeaveDate: true,
        endLeaveDate: true,
        totalLeaveDays: true,
        typeLeave: true,
        reason: true,
        createdAt:true,
        managerStatus:true,
      },
    });

    if (!leave) throw new TRPCError({ code: 'NOT_FOUND' });

    return leave;
  }),
  add: protectedProcedure
    .input(validators.add)
    .mutation(async ({ input, ctx }) => {
      const leave = await ctx.prisma.leaveItem.create({
        data : {
          startLeaveDate: input.startLeaveDate,
          endLeaveDate: input.endLeaveDate,
          totalLeaveDays: input.totalLeaveDays,
          typeLeave: input.typeLeave,
          reason: input.reason,
          assignUser : input.assignUser,
          leaveLocation : input.leaveLocation,
          leaveContactNumber : input.leaveContactNumber,
          userId: +ctx.session.user.user_id,
        }
        // data: {
        //   ...input,
        //   userId: +ctx.session.user.user_id,
        // },
      });

      if (input.uploadFiles.length > 0) {

      await ctx.prisma.leaveFileUpload.createMany({
        data: input.uploadFiles.map((file) => ({
          leaveId: leave.id,
          fileName:file,
        })),
      });
    }

      if (!leave) throw new TRPCError({ code: 'FORBIDDEN' });
    

      return leave;
    }),
    
  update: protectedProcedure
    .input(validators.update)
    .mutation(async ({ input, ctx }) => {
      const existingLeave = await ctx.prisma.leaveItem.findUnique({
        where: { id: input.id },
      });

      // ABAC => Attribute-Based Access Control
      if (existingLeave?.userId !== +ctx.session.user.user_id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const leave = await ctx.prisma.leaveItem.update({
        where: { id: input.id },
        data: input.data,
      });

      return leave;
    }),

  listItemsForUser: protectedProcedure
    .input(
      z.number()
    )
    .query(async ({ input, ctx }) => {
      const listItemsForUser = await ctx.prisma.$queryRaw`
        SELECT le.*,lt.leaveTypeDescription FROM LeaveItem le
        INNER JOIN personal ps 
        on ps.user_id = le.userId
        INNER JOIN LeaveType lt
        ON lt.id = le.typeLeave
        WHERE le.userId=${input} 
        ORDER BY le.createdAt DESC
      `;
    if (!listItemsForUser) throw new TRPCError({ code: 'NOT_FOUND' });
    return listItemsForUser;
  }),

  listItemsForManager: protectedProcedure
    .meta({
      roles: ['MANAGER']
    })
    .input(z.object({
      wardId: z.number(),
      dutyId: z.number(),
    }))
    .query(async ({ input, ctx }) => {
      const listItemsForManager = await ctx.prisma.$queryRaw`
        SELECT  le.*,CONCAT(ps.person_firstname,' ',ps.person_lastname) as fullname,
        lt.leaveTypeDescription FROM LeaveItem le
        INNER JOIN personal ps 
        on ps.user_id = le.userId
        INNER JOIN LeaveType lt
        on le.typeLeave = lt.id
        WHERE ps.office_id = ${input.wardId} ORDER BY le.createdAt DESC
      `;
    if (!listItemsForManager) throw new TRPCError({ code: 'NOT_FOUND' });
    return listItemsForManager;
  }),

  listItemsForDepartmentHead: protectedProcedure
    .meta({
      roles: ['DEPARTMENT_HEAD']
    })
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const listItemsForDepartmentHead = await ctx.prisma.$queryRaw`
        SELECT le.* FROM LeaveItem le
        INNER JOIN personal ps 
        on ps.user_id = le.userId
        WHERE ps.office_id = ${input} ORDER BY le.createdAt DESC
      `;
    if (!listItemsForDepartmentHead) throw new TRPCError({ code: 'NOT_FOUND' });
    return listItemsForDepartmentHead;
  })

});
