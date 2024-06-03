import { toastErrorNotify } from "@/helpers/ToastNotify";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      strategy: "jwt",
      credentials: {},
      async authorize(credentials, req) {
        let res = null;

        try {
          const { data } = await axios.post(
            `https://pro.attensam.at/atina/AtinaUsers/login?username=${credentials.username}&password=${credentials.password}`
          );

          res = data;
        } catch (error) {
          console.log("ERRORRRRRRRR===>", error);
        }
        return res;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
