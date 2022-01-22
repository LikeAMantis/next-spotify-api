import { useEffect, useRef, useState } from "react"
import Header from "../../../components/Header"
import Songs from "../../../components/Songs"
import useSpotify from "../../../lib/useSpotify"
import PlayPause from "../../../components/PlayPause"
import { useRecoilState } from "recoil"
import { playingPlaylistIdState } from "../../../atoms/playState"
import Layout from "../../../components/Layout"
import { useRouter } from "next/router"



const Album = ({ setCurrentSong, currentSong }) => {
    const spotifyApi = useSpotify();
    const [playingPlaylistId, setPlayingPlaylistId] = useRecoilState(playingPlaylistIdState);
    const router = useRouter();
    const [album, setAlbum] = useState(null);


    useEffect(() => {
        async function getAlbum() {
            if (!router.query.id) return;

            const res = await spotifyApi.getAlbum(router.query.id);
            setAlbum(res.body);
        }

        getAlbum();
    }, [router]);


    return (
        <div className="relative overflow-y-scroll background text-white">
            {album && (
                <>
                    <Header
                        type={album.album_type === "single" ? (album.total_tracks > 1 ? "ep" : "single") : "album"}
                        name={album.name}
                        imgRef={album.images[0].url}
                        songNumber={album.total_tracks}
                    />
                    <PlayPause className="inline-block w-24 text-active ml-12" spotifyApi={spotifyApi} condition={album.id === playingPlaylistId} onClick={async () => {
                        await spotifyApi.play({ context_uri: album.uri });
                        setTimeout(async () => {
                            setPlayingPlaylistId(router.query.id);
                            const res = await spotifyApi.getMyCurrentPlayingTrack();
                            setCurrentSong(res?.body?.item);
                        }, 300);
                    }}
                    />
                    <Songs songs={album.tracks.items} spotifyApi={spotifyApi} setCurrentSong={setCurrentSong} currentSong={currentSong} uriType="album" />
                </>
            )}
        </div>
    )
}


Album.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}

export default Album