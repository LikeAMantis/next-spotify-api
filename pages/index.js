import { forwardRef, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout"
import Songs from "../components/Songs"
import useSpotify from "../lib/useSpotify"
import Header from "../components/Header";
import PlayPause from "../components/PlayPause";
import { useRecoilState } from "recoil";
import { playingPlaylistIdState } from "../atoms/playState";

const Home = forwardRef(({ setCurrentSong, currentSong, spotifyApi }, ref) => {
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null);
    const [playingPlaylistId, setPlayingPlaylistId] = useRecoilState(playingPlaylistIdState);

    useEffect(() => {
        async function getRecentTracks() {
            const res = await spotifyApi.getMyRecentlyPlayedTracks();
            setRecentlyPlayedTracks(res.body.items);
            // setCurrentSong(res.body.items[0].track);
        }
        getRecentTracks();
    }, [])

    async function handlePlayPause() {
        await spotifyApi.play({ uris: recentlyPlayedTracks.map(x => x.track.uri) });
        setTimeout(async () => {
            setPlayingPlaylistId("recentlyPlayedTracks");
            const res = await spotifyApi.getMyCurrentPlayingTrack();
            setCurrentSong(res?.body?.item);
        }, 300);
    }

    return (
        <div ref={ref} className="relative overflow-y-scroll background text-white">
            <Header className="max-h-0" type="Home" name="Your Recently Played Tracks" />
            {recentlyPlayedTracks && (
                <Songs
                    songs={recentlyPlayedTracks.map(x => x.track)}
                    spotifyApi={spotifyApi}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                    container={ref}
                    PlayPauseBtn={({ isSticky }) => (
                        <PlayPause
                            className={`inline-block text-active ml-12 transition-all duration-150 
                                ${isSticky ? "w-14 mt-2" : "w-24"}`}
                            spotifyApi={spotifyApi}
                            onClick={handlePlayPause}
                            isSticky={isSticky}
                            condition={"recentlyPlayedTracks" === playingPlaylistId}
                            playlistName={"Your Recently Played Tracks"}
                        />
                    )}
                />
            )}
        </div>
    )
})

Home.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}

export default Home