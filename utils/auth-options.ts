import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "./firebase";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";

export default {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          auth,
          credentials.email as string,
          credentials.password as string
        );

        if (!userCredential) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();

        const claims = idTokenResult.claims;

        const data = {
          _id: user?.uid || "",
          email: user?.email,
          name: claims?.role || "",
        };

        return data;
      },
    }),
  ],
};
