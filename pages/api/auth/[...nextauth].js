import NextAuth from "next-auth"
import SpotifiyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"



async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);


        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("Refreshed token is", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
        }
    } catch (error) {
        console.log("RefreshAccessTokenError", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifiyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        // signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;

            return session;
        }
    }
});