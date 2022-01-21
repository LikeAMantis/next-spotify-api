import { useEffect, useRef, useState } from "react"
import Header from "../../../components/Header"
import Songs from "../../../components/Songs"
import useSpotify from "../../../lib/useSpotify"
import PlayPause from "../../../components/PlayPause"
import { useRecoilState } from "recoil"
import { playingPlaylistIdState } from "../../../atoms/playState"
import Layout from "../../../components/Layout"
import { useRouter } from "next/router"



const Playlist = ({ setCurrentSong, playlist, setPlaylist, currentSong }) => {
    const spotifyApi = useSpotify();
    const [playingPlaylistId, setPlayingPlaylistId] = useRecoilState(playingPlaylistIdState);
    const router = useRouter();

    useEffect(() => {
        async function getPlaylist() {
            if (!router.query.id) return;

            const res = await spotifyApi.getPlaylist(router.query.id);
            setPlaylist(res.body);
        }

        getPlaylist();
    }, [router]);


    return (
        <div className="relative overflow-y-scroll background text-white">
            {playlist && (
                <>
                    <Header
                        type={"PLAYLIST"}
                        name={playlist.name}
                        imgRef={playlist.images[0].url}
                        songNumber={playlist.tracks.items.total + (playlist.tracks.items.total === 1 ? " Song" : " Songs")}
                    />
                    <PlayPause className="inline-block w-24 text-active ml-12" spotifyApi={spotifyApi} condition={playlist.id === playingPlaylistId} onClick={async () => {
                        await spotifyApi.play({ context_uri: playlist.uri });
                        setTimeout(async () => {
                            setPlayingPlaylistId(router.query.id);
                            const res = await spotifyApi.getMyCurrentPlayingTrack();
                            setCurrentSong(res?.body?.item);
                        }, 300);
                    }}
                    />
                    <Songs songs={playlist.tracks.items} spotifyApi={spotifyApi} setCurrentSong={setCurrentSong} currentSong={currentSong} />
                </>
            )}
        </div>
    )
}


Playlist.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}

export default Playlist