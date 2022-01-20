import { useEffect, useRef, useState } from "react"
import Avatar from "../../../components/Avatar"
import Song from "../../../components/Song";
import useSpotify from "../../../lib/useSpotify";
import PlayPause from "../../../components/PlayPause";
import { useRecoilState } from "recoil";
import { playingPlaylistIdState } from "../../../atoms/playState";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

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

const Playlist = ({ setCurrentSong, currentSong }) => {
    const [playlist, setPlaylist] = useState(null);
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(colors[0]);
    const [playingPlaylistId, setPlayingPlaylistId] = useRecoilState(playingPlaylistIdState);
    const router = useRouter();

    useEffect(() => {
        async function getPlaylist() {
            if (!router.query.id) return;

            const res = await spotifyApi.getPlaylist(router.query.id);
            setPlaylist(res.body);
        }

        getPlaylist();
        setColor(randomColor());
    }, [router]);



    function drawPlaylist() {
        return (
            playlist.tracks.items.map((song, i) => (
                <Song key={song.track.id} order={i}
                    song={song.track}
                    isActive={currentSong?.id === song.track.id}
                    setCurrentSong={setCurrentSong}
                    spotifyApi={spotifyApi}
                />)
            )
        )
    }

    return (
        <div className="relative overflow-y-scroll background text-white">
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
                            setPlayingPlaylistId(router.query.id);
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


Playlist.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}

export default Playlist