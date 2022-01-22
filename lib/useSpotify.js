import SpotifyWebApi from "spotify-web-api-node";
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});



const useSpotify = () => {
    const { data: session } = useSession();
    console.log("use Spotify");

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signIn(); // Force sign in to hopefully resolve error
        }

        spotifyApi.setAccessToken(session?.user?.accessToken);
    }, [session]);
    return spotifyApi;
}

export default useSpotify;