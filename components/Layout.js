import { getSession, useSession } from "next-auth/react";
import { Children, cloneElement, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import useSpotify from "../lib/useSpotify";
import Player from "./Player";
import { RecoilRoot } from 'recoil';


export default function Layout({ children }) {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session]);


    return (
        <>
            {spotifyApi.getAccessToken() && (
                <RecoilRoot >
                    <main className="grid h-screen grid-cols-1 grid-rows-1 md:grid-cols-[auto_1fr]">
                        <Sidebar playlists={playlists} />
                        {Children.map(children, child => cloneElement(child, { setCurrentSong, currentSong }))}
                        <Player currentSong={currentSong} setCurrentSong={setCurrentSong} />
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