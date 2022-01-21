import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import Songs from "../components/Songs"
import useSpotify from "../lib/useSpotify"
import Header from "../components/Header";

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
            <Header type="Home" name="Your Recently Played Tracks"></Header>
            {recentlyPlayedTracks && <Songs songs={recentlyPlayedTracks} spotifyApi={spotifyApi} setCurrentSong={setCurrentSong} currentSong={currentSong} />}
        </div>
    )
}

Home.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}