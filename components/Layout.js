import { getSession, useSession } from "next-auth/react";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import useSpotify from "../lib/useSpotify";
import Player from "./Player";
import { RecoilRoot } from 'recoil';
import { useRouter } from "next/router";
import Head from "next/head";


export default function Layout({ children }) {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const ref = useRef();
    const router = useRouter();

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
    }, [router]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session]);


    return (
        <>
            {currentSong && (
                <Head>
                    <title>{`Spotify NEXT - ${currentSong.name}`}</title>
                </Head>
            )}
            {spotifyApi.getAccessToken() && (
                <RecoilRoot >
                    <main className="grid h-screen grid-cols-1 grid-rows-1 md:grid-cols-[auto_1fr]">
                        <Sidebar playlists={playlists} />
                        {Children.map(children, child => cloneElement(child, { setCurrentSong, currentSong, ref, spotifyApi }))}
                        <Player currentSong={currentSong} setCurrentSong={setCurrentSong} spotifyApi={spotifyApi} />
                    </main>
                </RecoilRoot>
            )}
        </>
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