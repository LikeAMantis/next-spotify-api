import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const usePlaylist = (spotifyApi) => {
    const router = useRouter();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const totalSongs = useRef(0);

    useEffect(() => {
        async function getPlaylist() {
            if (!router.query.id) return;

            const res = await spotifyApi.getPlaylist(router.query.id);
            const { tracks, ...playlist } = res.body;

            setPlaylist(playlist);
            setSongs(tracks.items.map((x) => x.track));
            totalSongs.current = tracks.total;
        }

        getPlaylist();
    }, [router]);

    function removeSong(songId) {
        // spotifyapi delete
        setSongs(songs.filter((song) => song.id !== songId));
    }

    // function addToPlaylist(songId) {
    //     // spotifyapi put
    // }

    return [playlist, songs, totalSongs.current, removeSong];
};

export default usePlaylist;
