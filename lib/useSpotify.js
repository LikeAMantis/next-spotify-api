import spotifyApi from "./spotify";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";


const useSpotify = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signIn(); // Force sign in to hopefully resolve error
        }

        spotifyApi.setAccessToken(session?.user?.accessToken);
    }, [session]);
    return spotifyApi;
}

export default useSpotify;