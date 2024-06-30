import NextAuth, { DefaultSession } from "next-auth";
import AuthConfig from "./utils/auth-options";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(AuthConfig);
