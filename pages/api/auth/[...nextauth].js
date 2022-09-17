import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyOptions } from '../../../config';

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: spotifyOptions.client_id,
      clientSecret: spotifyOptions.client_secret,
      authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
    })
  ],
  callbacks: {
    async jwt({ token, account }) {

      if (account) token.accessToken = account.access_token

      return token
    },
    async session({ session, token, user }) {

      session.accessToken = token.accessToken
      
      return session
    }
  }
})