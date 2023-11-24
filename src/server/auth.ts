import { type GetServerSidePropsContext } from 'next';
import bcrypt from 'bcryptjs';
import {
  getServerSession,
  type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '~/server/db';
import {  type Role } from '@prisma/client';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session {
    user: {
      user_id: number;
      role: Role;
      firstname: string;
      lastname: string;
      name: string;
      email: string;
      image: string;
      office_id : number;
    };
  }

  interface User {
    role_user: Role;
    user_id: number;
    person_firstname: string;
    person_lastname: string;
    person_email: string;
    office_id : number;
    duty_id: number;
    faction_id: number;
    depart_id: number;
    ward_id: number;
    // person_username: string;
    // person_photo?: string;
    // image: string;
  }

  
}

declare module 'next-auth/jwt' {
  interface JWT {
    office_id : number;
    role_user: Role;
    firstname: string;
    lastname: string;
    user_id: number;
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

      if (user) {
        token.user = user;
        token.user_id = user.user_id;
        token.firstname = user.person_firstname;
        token.lastname = user.person_lastname;
        token.email = user.person_email;
        token.name = user.name;
        token.role_user = user.role_user;
      }
      console.log('token on console', token);
      return token;
    },
    session: ({ session, token }) => {
      session.user.firstname = token.firstname; 
      session.user.lastname = token.lastname; 
      session.user.role = token.role_user; 
      session.user.user_id = token.user_id; 
      // session.user.email = token.email; 

      // console.log('token session', session.user.image);
      console.log('session on console', session);
      return {
        ...session,
        user: {
          user_id: token.sub,
          image: token.picture,
          email: token.email,
          role: token.role_user,
          firstname: token.firstname,
          lastname: token.lastname,
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
          select: {
            user_id: true,
            person_id: true,
            person_firstname: true,
            person_lastname: true,
            person_password_hash: true,
            person_email: true,
            role_user: true,
            person_photo: true,
          },
        });


        if (!user) return undefined;
        if (!credentials?.person_password) return null;
        if (!(await bcrypt.compare(credentials.person_password, user.person_password_hash))) {
          return null;
        }

        const userDepartment = await prisma.level.findMany({
          where: {
            person_id: user.person_id
          },
          select: {
            duty_id: true,
            faction_id: true,
            depart_id: true,
            ward_id: true,
          }
        });
        if (!userDepartment) return undefined;
        
        console.log("user",user); // After the first query
        console.log("User Department",userDepartment); // After the second query

        return { ...user,user_id:user.user_id,image:user.person_photo};
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
