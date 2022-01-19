import { useEffect, useRef, useState } from "react"
import Avatar from "./Avatar";
import Song from "./Song";
import useSpotify from "../lib/useSpotify";
import PlayPause from "../components/PlayPause";
import { useRecoilState } from "recoil";
import { playingPlaylistIdState } from "../atoms/playState";



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

export const Center = ({ activePlaylistId, setCurrentSong, currentSong }) => {
    const [playlist, setPlaylist] = useState(null);
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(colors[0]);
    const [playingPlaylistId, setPlayingPlaylistId] = useRecoilState(playingPlaylistIdState);
    const ref = useRef();

    useEffect(() => {
        async function getPlaylist() {

            const res = await spotifyApi.getPlaylist(activePlaylistId);
            setPlaylist(res.body);
        }
        if (activePlaylistId == null) return;

        getPlaylist();
        setColor(randomColor());
        ref.current.scrollTo(0, 0);
    }, [activePlaylistId]);



    function drawPlaylist() {
        if (!playlist) return;
        return (
            playlist.tracks.items.map((song, i) => (
                <Song key={song.track.id} order={i}
                    activePlaylistId={activePlaylistId}
                    song={song.track}
                    isActive={currentSong.id === song.track.id}
                    setCurrentSong={setCurrentSong}
                    spotifyApi={spotifyApi}
                />)
            )
        )
    }

    return (
        <div ref={ref} className="relative overflow-y-scroll bg-neutral-900 text-white">
            <Avatar />
            {playlist && (
                <>
                    <div className={`flex items-end h-[30vw] min-h-[300px] max-h-[480px] bg-gradient-to-b to-transparent ${color} p-12`}>
                        <img className="w-auto h-[90%] aspect-square object-cover drop-shadow-xxl" src={playlist.images[0].url} />
                        <div className="ml-5 space-y-2 lg:space-y-4">
                            <p>PLAYLIST</p>
                            <h1 className="text-4xl lg:text-6xl font-bold">{playlist.name}</h1>
                            <p className="text-xs">{playlist.tracks.items.total + (playlist.tracks.items.total === 1 ? " Song" : " Songs")}</p>
                        </div>
                    </div>
                    <PlayPause className="inline-block w-24 text-active ml-12" spotifyApi={spotifyApi} condition={playlist.id === playingPlaylistId} onClick={async () => {
                        await spotifyApi.play({ context_uri: playlist.uri });
                        setTimeout(async () => {
                            setPlayingPlaylistId(activePlaylist.id);
                            const res = await spotifyApi.getMyCurrentPlayingTrack();
                            setCurrentSong(res?.body?.item);
                        }, 300);
                    }}
                    />
                    <div className="text-secondary bg-inherit">
                        <div className="sticky z-10 top-0 bg-inherit song-container border-primary border-b-[1px] pb-1 mb-4 uppercase font-bold text-xs rounded-none">
                            <h3 className="w-full text-right pr-4">#</h3>
                            <h3>Title</h3>
                            <h3>Album</h3>
                            <h3 className="justify-self-end">Duration</h3>
                        </div>
                        <div>
                            {drawPlaylist()}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}