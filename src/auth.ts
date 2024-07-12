import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@db/client";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        authorized: async ({auth}) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth;
        },
    },

});
