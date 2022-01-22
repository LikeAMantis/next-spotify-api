import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import Songs from "../components/Songs"
import useSpotify from "../lib/useSpotify"
import Header from "../components/Header";
import PlayPause from "../components/PlayPause";

export default function Home({ setCurrentSong, currentSong }) {
    const spotifyApi = useSpotify();
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null);

    useEffect(() => {
        async function getRecentTracks() {
            const res = await spotifyApi.getMyRecentlyPlayedTracks();
            setRecentlyPlayedTracks(res.body.items);
        }
        getRecentTracks();
    }, [])

    return (

        <div className="relative overflow-y-scroll background text-white">
            <Header type="Home" name="Your Recently Played Tracks" />
            <PlayPause className="inline-block w-24 text-active ml-12" spotifyApi={spotifyApi} onClick={async () => {
                await spotifyApi.play({ uris: recentlyPlayedTracks.map(x => x.track.uri) });
                setTimeout(async () => {
                    // setPlayingPlaylistId(router.query.id);
                    const res = await spotifyApi.getMyCurrentPlayingTrack();
                    setCurrentSong(res?.body?.item);
                }, 300);
            }}
            />
            {recentlyPlayedTracks && <Songs songs={recentlyPlayedTracks.map(x => x.track)} spotifyApi={spotifyApi} setCurrentSong={setCurrentSong} currentSong={currentSong} />}
        </div>
    )
}

Home.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}