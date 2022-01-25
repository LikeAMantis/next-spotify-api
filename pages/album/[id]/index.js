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
    const ref = useRef();


    useEffect(() => {
        async function getAlbum() {
            if (!router.query.id) return;

            const res = await spotifyApi.getAlbum(router.query.id);
            setAlbum(res.body);
        }

        getAlbum();
    }, [router]);

    async function handlePlayPause() {
        await spotifyApi.play({ context_uri: album.uri });
        setTimeout(async () => {
            setPlayingPlaylistId(router.query.id);
            const res = await spotifyApi.getMyCurrentPlayingTrack();
            setCurrentSong(res?.body?.item);
        }, 300);
    }


    return (
        <div ref={ref} className="relative overflow-y-scroll background text-white">
            {album && (
                <>
                    <Header
                        type={album.album_type === "single" ? (album.total_tracks > 1 ? "ep" : "single") : "album"}
                        name={album.name}
                        imgRef={album.images[0].url}
                        songNumber={album.total_tracks}
                    />
                    <Songs
                        songs={album.tracks.items.map(song => ({ ...song, album: { images: album.images } }))}
                        spotifyApi={spotifyApi}
                        setCurrentSong={setCurrentSong}
                        currentSong={currentSong}
                        uriType="album"
                        container={ref}
                        PlayPauseBtn={({ isSticky }) => (
                            <PlayPause
                                className={`inline-block text-active ml-12 transition-all duration-150 w-24 
                                    ${isSticky ? "w-14 mt-2" : "w-24"}`}
                                spotifyApi={spotifyApi}
                                condition={album.id === playingPlaylistId}
                                onClick={handlePlayPause}
                                isSticky={isSticky}
                                playlistName={album.name}
                            />
                        )}
                    />
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