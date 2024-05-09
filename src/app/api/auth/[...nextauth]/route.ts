import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { getDataByField } from "@/lib/firebase/services";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        userPrincipalName: {},
      },
      async authorize(credentials) {
        //
        const response = await getDataByField("employees", "userPrincipalName", credentials?.userPrincipalName || "");
        const user: any = response[0];

        return {
          id: user.id,
          nik: user.nik,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.nik = user.nik;
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("nik" in token) {
        session.user.nik = token.nik;
      }

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      session.token = accessToken;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
