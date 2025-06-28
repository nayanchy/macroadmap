import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { User } from "./database/models/user.model";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { JWT } from "next-auth/jwt";
import { createUser } from "./lib/queries/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
              };
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : String(error)
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // if (user) {
      //   token.id = user.id;
      // } else if (token.email) {
      //   const dbUser = await User.findOne({ email: token.email });
      //   if (dbUser) {
      //     token.id = (dbUser._id as { toString: () => string }).toString();
      //   }
      // }

      if (user && user.email) {
        let dbUser = await User.findOne({ email: user.email });
        console.log("dbUser", dbUser);
        if (!dbUser) {
          dbUser = await createUser({
            name: user.name || "",
            email: user.email,
            password: "oauth",
          });
        }
        token.id = dbUser?._id.toString();
      } else if (token.email) {
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser?._id.toString();
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
