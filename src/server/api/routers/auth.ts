import bcrypt from 'bcryptjs';
import { profile, register } from '~/features/auth/helpers/validators';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  register: publicProcedure.input(register).mutation(async ({ input, ctx }) => {
    const hashedPassword = await bcrypt.hash(input.person_password, 12);
    const user = await ctx.prisma.personal.create({
      data: {
        ...input,
        person_password_hash: hashedPassword,
      },
      select: {
        user_id: true,
        person_firstname: true,
        person_email: true,
        role_user: true,
      },
    });
    // const user = await ctx.prisma.user.create({
    //   data: {
    //     ...input,
    //     password: hashedPassword,
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     role: true,
    //     image: true,
    //   },
    // });

    return user;
  }),
  update: protectedProcedure
    .input(profile)
    .mutation(async ({ input: { person_password_hash, ...data }, ctx }) => {
      const id = +ctx.session.user.id;
      const profile = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...data,
          person_password: person_password,
          person_password_hash: person_password_hash ? await bcrypt.hash(person_password, 12) : undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
        },
      });

      return profile;
    }),
});
