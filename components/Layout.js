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
import { AnimatePresence, motion } from "framer-motion";

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

    return (
        <>
            {currentSong && (
                <Head>
                    <title>{`Spotify NEXT - ${currentSong.name}`}</title>
                </Head>
            )}
            {spotifyApi.getAccessToken() && (
                <main className="grid h-screen grid-cols-1 grid-rows-1 md:grid-cols-[auto_1fr]">
                    <MenuOpenIcon
                        className="text-secondary absolute top-5 left-2 z-20 cursor-pointer rounded-md bg-black bg-opacity-75 p-1 hover:bg-opacity-100 hover:text-white md:[display:none_!important]"
                        fontSize="large"
                        onClick={() => setSidebarIsOpen((isOpen) => !isOpen)}
                    />
                    <Sidebar
                        playlists={playlists}
                        sidebarIsOpen={sidebarIsOpen}
                        setSidebarIsOpen={setSidebarIsOpen}
                    />

                    {Children.map(children, (child) => (
                        <motion.div
                            ref={ref}
                            key={router.query.id}
                            className={`center ${
                                sidebarIsOpen ? "hidden" : "block"
                            }`}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {cloneElement(child, {
                                setCurrentSong,
                                currentSong,
                                ref,
                                spotifyApi,
                            })}
                        </motion.div>
                    ))}

                    <Player
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        spotifyApi={spotifyApi}
                    />
                </main>
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
