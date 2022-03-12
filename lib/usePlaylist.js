import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePlaylist = (spotifyApi) => {
    const router = useRouter();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [totalSongs, setTotalSongs] = useState(0);

    useEffect(() => {
        async function getPlaylist() {
            if (!router.query.id) return;

            const res = await spotifyApi.getPlaylist(router.query.id);
            const { tracks, ...playlist } = res.body;

            setPlaylist(playlist);
            setSongs(tracks.items.map((x) => x.track));
            setTotalSongs(tracks.total);
        }

        getPlaylist();
    }, [router]);

    function removeSong(songId) {
        setSongs(songs.filter((song) => song.id !== songId));
        setTotalSongs((totalSongs) => totalSongs - 1);
    }

    return [playlist, songs, totalSongs, removeSong];
};

export default usePlaylist;
