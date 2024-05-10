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
          name: user.name,
          jobTtlName: user.jobTtlName,
          golongan: user.golongan,
          superiorNIK: user.superiorNIK,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.nik = user.nik;
        token.name = user.name;
        token.jobTtlName = user.jobTtlName;
        token.golongan = user.golongan;
        token.superiorNIK = user.superiorNIK;
      }

      return token;
    },

    async session({ session, token }: any) {
      const keys = ["id", "nik", "name", "jobTtlName", "golongan", "superiorNIK"];

      for (const key of keys) {
        if (key in token) {
          session.user[key] = token[key];
        }
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
