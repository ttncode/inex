import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials || !credentials?.email || !credentials?.password) return null;

    //     const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/auth/authorization`, credentials);
    //     if (!response) return null;

    //     return response.user;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_KEY as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // const password = token.accessToken;

      // const user = {
      //   username: session.user?.name,
      //   email: session.user?.email,
      //   password,
      //   avatar: session.user?.image,
      // };
      // await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/auth/register`, user);

      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
