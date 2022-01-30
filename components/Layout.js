import { getSession, useSession } from "next-auth/react";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import useSpotify from "../lib/useSpotify";
import Player from "./Player";
import { RecoilRoot, useRecoilState } from 'recoil';
import { useRouter } from "next/router";
import Head from "next/head";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { sidebarIsOpenState } from "../atoms/playState";


export default function Layout({ children }) {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    // const [isMobile, setIsMobile] = useState(false);
    const ref = useRef();
    const router = useRouter();

    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         setIsMobile(window.innerWidth < 768);
    //         if (window.innerWidth > 768) { setSidebarIsOpen(false) };
    //     })
    // }, [])

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
                        <MenuOpenIcon className="absolute top-5 left-2 text-secondary hover:text-white z-20 cursor-pointer md:[display:none_!important] bg-black p-1 rounded-md bg-opacity-75 hover:bg-opacity-100" fontSize="large" onClick={() => setSidebarIsOpen(isOpen => !isOpen)} />
                        <Sidebar playlists={playlists} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                        {Children.map(children, child => cloneElement(child, { setCurrentSong, currentSong, ref, spotifyApi, className: sidebarIsOpen ? "hidden" : "block" }))}
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