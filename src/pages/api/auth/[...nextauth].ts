import { query as q } from 'faunadb';
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
  secret: process.env.FAUNADB_KEY,
  debug: true,
  callbacks: {
    async signIn({user, account, profile}) {
      console.log('user =>', user);
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(
              q.Match(q.Index("user_by_email"), q.Casefold(user.email))
            )
          )
        );
        console.log('deu certo')
        return true;
      } catch (error) {
        console.log("error faunadb", error);
        return false;
      }
    },
  },
});
