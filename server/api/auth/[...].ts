// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials!;
        try {
          const user = { email: "test@test.com", password: "123123" };
          // Return null if user data could not be retrieved
          if (!user)
            throw createError({
              statusCode: 201,
              statusMessage: "Unauthorized",
            });
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch)
            throw createError({
              statusCode: 201,
              statusMessage: "Unauthorized",
            });

          return {
            ...user,
            password: undefined,
            resetPassword: undefined,
          };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };
      return session;
    },
  },
});
