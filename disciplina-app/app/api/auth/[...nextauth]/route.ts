import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Usuário",
          type: "username",
          placeholder: "Usuário",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const res = await fetch(`${process.env.API_URL}/api/user/login/`, {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const userData = await res.json();
        if (res.ok && userData) {
          const userSessionData = {
            id: userData.user.id,
            name: userData.user.username,
            email: userData.user.email,
            image: userData.session_key,
            emailVerified: null,
          } as AdapterUser;

          return userSessionData;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session }: { session: any }) {
      return {
        sessionId: session.user.image,
        expires: session.expires,
        user: {
          name: session.user.name,
          email: session.user.email,
        },
      } as Session;
    },
  },

  pages: {
    signIn: "../../../login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
