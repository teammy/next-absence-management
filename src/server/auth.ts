import { type GetServerSidePropsContext } from 'next';
import bcrypt from 'bcryptjs';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '~/server/db';
import { type Role } from '@prisma/client';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      firstname: string;
      lastname: string;
      cid: string;
    } & DefaultSession['user'];
  }

  interface User {
    role_user: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role_user: Role;
  }
}

function isUpdateSessionData(
  session: unknown,
): session is Record<'name' | 'email' | 'image', string | undefined> {
  if (!session) return false;
  if (typeof session !== 'object') return false;

  return true;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && isUpdateSessionData(session)) {
        if (session.image) token.picture = session.image;
        if (session.name) token.name = session.name;
        if (session.email) token.email = session.email;
      }
      console.log('jwt on console',user);
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.role_user = user.role_user;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log('session', session);
      return {
        ...session,
        user: {
          // ...session.user,
          id: token.sub,
          // role_user: token.role_user,
          firstname: token.firstname,
          // lastname: token.lastname,
          name: token.name,
          // email: token.email,
          // image: token.picture,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        person_username: { label: 'person_username', type: 'text' },
        person_password: { label: 'person_password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.personal.findUnique({
          where: {
            person_username: credentials?.person_username,
          },
        });
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials?.email,
        //   },
        // });

        if (!user) return null;
        if (!credentials?.person_password) return null;
        if (!(await bcrypt.compare(credentials.person_password, user.person_password_hash))) {
          return null;
        }
        
        return { ...user,id:user.user_id.toString()};
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
