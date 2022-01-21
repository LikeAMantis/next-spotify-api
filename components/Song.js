import millisToMinutesAndSeconds from "../lib/time"
import { PlayIcon } from "@heroicons/react/solid"
import { useSetRecoilState } from "recoil";
import { playingPlaylistIdState } from "../atoms/playState";
import { useRouter } from "next/router";

const Song = ({ order, song, setCurrentSong, isActive, spotifyApi }) => {
    const setPlayingPlaylistId = useSetRecoilState(playingPlaylistIdState);
    const router = useRouter();


    function play() {
        setCurrentSong(song);
        spotifyApi.play({ context_uri: "spotify:playlist:" + router.query.id, offset: { position: order } })

        if (!router.query.id) return;
        setPlayingPlaylistId(router.query.id);
    }

    return (
        <div
            className={"group items-center not:bg-blue-700:hover relative song-container hover:bg-neutral-800 hover:text-white" + (isActive ? " font-bold" : "")}
            onDoubleClick={play}
        >
            <p className="group-hover:invisible visible text-right w-full pr-4">{order + 1}</p>
            <div className="flex space-x-4 items-center">
                <img className="w-12 cursor-pointer" src={song.album.images[2]?.url} />
                <div>
                    <PlayIcon
                        className="absolute cursor-pointer hover:text-white hidden group-hover:block left-10 w-6 -translate-y-1/2 top-1/2"
                        onClick={play}
                    />
                    <p className={"text-white" + (isActive ? " text-active" : "")}>{song.name}</p>
                    <p className="">{song.artists.map(x => x.name).join(", ")}</p>
                </div>
            </div>
            <p className="cursor-pointer">{song.album.name}</p>
            <p className="justify-self-end">{millisToMinutesAndSeconds(song.duration_ms)}</p>
        </div>
    )
}

export default Song