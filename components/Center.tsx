import { useEffect, useRef, useState } from "react"
import Avatar from "./Avatar";
import Song from "./Song";
import useSpotify from "../lib/useSpotify";


interface Props {
    activePlaylist: any,
    setCurrentSong: any,
}

const colors = [
    "from-red-500",
    "from-blue-500",
    "from-green-500",
    "from-orange-500",
    "from-teal-500",
    "from-purple-500",
    "from-pink-500",
];

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

export const Center = ({ activePlaylist, setCurrentSong }: Props) => {
    const spotifyApi = useSpotify();
    const [songs, setSongs] = useState([]);
    const [color, setColor] = useState(colors[0]);
    const ref = useRef();

    useEffect(() => {
        async function getSongs() {
            const res = await spotifyApi.getPlaylistTracks(activePlaylist.id);
            setSongs(res.body.items);
        }
        if (activePlaylist == null) return;
        getSongs();
        setColor(randomColor());
        ref?.current?.scrollTo(0, 0);
    }, [activePlaylist]);

    return (
        <div ref={ref} className="relative overflow-y-scroll no-scrollbar bg-neutral-900 text-white">
            <Avatar />
            <div className={`flex items-end h-[30vw] min-h-[300px] max-h-[480px] bg-gradient-to-b to-transparent ${color} p-12`}>
                <img className="w-auto h-[90%] aspect-square object-cover drop-shadow-xxl" src={activePlaylist?.images[0].url} />
                <div className="ml-5 space-y-2 lg:space-y-4">
                    <p>PLAYLIST</p>
                    <h1 className="text-4xl lg:text-6xl font-bold">{activePlaylist?.name}</h1>
                    <p className="text-xs">{activePlaylist?.tracks?.total + (activePlaylist?.tracks?.total === 1 ? " Song" : " Songs")}</p>
                </div>
            </div>
            <div className="text-gray-400">
                <div className="song-container border-gray-700 border-b-[1px] pb-1 mb-4 uppercase font-bold text-xs rounded-none">
                    <p className="w-full text-right pr-4">#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <p className="justify-self-end">Duration</p>
                </div>
                <div>
                    {songs.map((song, i) => <Song key={song.track.id} order={i} song={song.track} setCurrentSong={setCurrentSong} />)}
                </div>
            </div>
        </div>
    )
}