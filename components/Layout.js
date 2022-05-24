import { getSession, useSession } from "next-auth/react";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import useSpotify from "../lib/useSpotify";
import Player from "./Player";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import Head from "next/head";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { playlistsState } from "../atoms/playState";
import { motion } from "framer-motion";

export default function Layout({ children }) {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useRecoilState(playlistsState);
    const [currentSong, setCurrentSong] = useState(null);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const ref = useRef();
    const router = useRouter();

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
    }, [router]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session]);

    function addPlaylist(name) {
        setPlaylists([
            ...playlists,
            { id: Math.floor(Math.random() * 10000), name },
        ]);
    }

    return (
        <>
            {currentSong && (
                <Head>
                    <title>{`Spotify NEXT - ${currentSong.name}`}</title>
                </Head>
            )}
            {spotifyApi.getAccessToken() && (
                <div className="grid h-screen grid-cols-1 grid-rows-1 md:grid-cols-[auto_1fr]">
                    <MenuOpenIcon
                        className="text-secondary absolute top-5 left-2 z-20 cursor-pointer rounded-md bg-black bg-opacity-75 p-1 hover:bg-opacity-100 hover:text-white md:[display:none_!important]"
                        fontSize="large"
                        onClick={() => setSidebarIsOpen((isOpen) => !isOpen)}
                    />
                    <Sidebar
                        playlists={playlists}
                        addPlaylist={addPlaylist}
                        sidebarIsOpen={sidebarIsOpen}
                        setSidebarIsOpen={setSidebarIsOpen}
                    />
                    {true && (
                        <>
                            {Children.map(children, (child) => (
                                <motion.main
                                    ref={ref}
                                    key={router.query.id}
                                    className={`center`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {cloneElement(child, {
                                        setCurrentSong,
                                        currentSong,
                                        ref,
                                        spotifyApi,
                                    })}
                                </motion.main>
                            ))}
                        </>
                    )}
                    <Player
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        spotifyApi={spotifyApi}
                    />
                </div>
            )}
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        }, // will be passed to the page component as props
    };
}
