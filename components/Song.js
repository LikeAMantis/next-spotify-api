import millisToMinutesAndSeconds from "../lib/time"
import { PlayIcon } from "@heroicons/react/solid"
import { useSetRecoilState } from "recoil";
import { playingPlaylistIdState } from "../atoms/playState";
import { useRouter } from "next/router";
import Link from "next/link";


const Song = ({ order, song, setCurrentSong, isActive, spotifyApi, uriType, uris, showCover = true }) => {
    const setPlayingPlaylistId = useSetRecoilState(playingPlaylistIdState);
    const router = useRouter();

    async function play() {
        try {
            if (uriType) {
                await spotifyApi.play({ context_uri: `spotify:${uriType}:` + router.query.id, offset: { position: order } })
            } else if (uris) {
                await spotifyApi.play({ uris, offset: { position: order } })
            }
            setCurrentSong(song);
        }
        catch (e) {
            alert("No Active Device Found!");
        }


        if (!router.query.id) return;
        setPlayingPlaylistId(router.query.id);
    }

    return (
        <div
            className={"song-container group items-center not:bg-blue-700:hover relative hover:bg-neutral-800 hover:text-white" + (isActive ? " font-bold" : "")}
            onDoubleClick={play}
        >
            <p className="group-hover:invisible visible text-right w-full pr-4">{order + 1}</p>
            <div className="flex space-x-4 items-center">
                {showCover && <img className="w-12 cursor-pointer shadow-sm shadow-black" src={song.album?.images[2]?.url} />}
                <div>
                    <PlayIcon
                        className="absolute cursor-pointer hover:text-white hidden group-hover:block left-10 w-6 -translate-y-1/2 top-1/2"
                        onClick={play}
                    />
                    <p className={"text-white" + (isActive ? " text-active" : "")}>{song.name}</p>
                    <Link href={`/artist/${song?.artists[0]?.id}`}><p className="cursor-pointer">{song.artists.map(x => x.name).join(", ")}</p></Link>
                </div>
            </div>
            <Link href={`/album/${song.album.id}`}><p className="cursor-pointer">{song.album.name}</p></Link>
            <p className="justify-self-end">{millisToMinutesAndSeconds(song.duration_ms)}</p>
        </div>
    )
}

export default Song