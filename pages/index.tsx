import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Center } from "../components/Center";
import { Sidebar } from "../components/Sidebar/Sidebar";
import useSpotify from "../lib/useSpotify";
import useLocalStorage from "../lib/useLocalStorage";
import Player from "../components/Player";

export default function Home() {
    const spotifyApi = useSpotify();
    const [playlists, setPlaylists] = useState([]);
    const [activePlaylistId, setActivePlaylistId] = useLocalStorage("activePlaylistId");

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data: any) => {
                setPlaylists(data.body.items);

                const id = JSON.parse(localStorage.getItem("activePlaylistId"));
                if (id) {
                    setActivePlaylistId(id);
                } else {
                    setActivePlaylistId(data.body.items[0].id);
                }
            })
        }
    }, []);

    return (
        <main className="grid h-screen grid-cols-1 md:grid-cols-[auto_1fr]">
            <Sidebar playlists={playlists} setActivePlaylistId={setActivePlaylistId} spotifyApi={spotifyApi} />
            <Center activePlaylist={playlists.find(playlist => playlist.id === activePlaylistId)} spotifyApi={spotifyApi} />
            <Player />
        </main>
        // Players
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        }, // will be passed to the page component as props
    }
}