import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Center } from "../components/Center";
import { Sidebar } from "../components/Sidebar/Sidebar";
import useSpotify from "../lib/useSpotify";
import useLocalStorage from "../lib/useLocalStorage";
import Player from "../components/Player";
import { RecoilRoot } from 'recoil';
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [activePlaylistId, setActivePlaylistId] = useLocalStorage("activePlaylistId");
    const [currentSong, setCurrentSong] = useLocalStorage("currentSong");

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data: any) => {
                setPlaylists(data.body.items);

                const id = JSON.parse(localStorage.getItem("activePlaylistId"));
                if (id && router.pathname === "/") {
                    setActivePlaylistId(id);
                } else {
                    setActivePlaylistId(data.body.items[0].id);
                }
            })
        }
    }, [session]);

    useEffect(() => {
        if (router.pathname !== "/") {
            console.log("test");
        }
    }, [router])




    return (
        <RecoilRoot >
            <main className="grid h-screen grid-cols-1 grid-rows-1 md:grid-cols-[auto_1fr]">
                <Sidebar playlists={playlists} setActivePlaylistId={setActivePlaylistId} />
                <Center currentSong={currentSong} activePlaylistId={activePlaylistId} setCurrentSong={setCurrentSong} />
                <Player currentSong={currentSong} setCurrentSong={setCurrentSong} setActivePlaylistId={setActivePlaylistId} />
            </main>
        </RecoilRoot>
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