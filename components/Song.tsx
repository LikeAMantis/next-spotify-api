import millisToMinutesAndSeconds from "../lib/time"
import { PlayIcon } from "@heroicons/react/solid"
import useSpotify from "../lib/useSpotify";


const Song = ({ order, song, setCurrentSong }) => {
    const spotifyApi = useSpotify();

    return (
        <div
            className="group items-center not:bg-blue-700:hover relative song-container hover:bg-neutral-800 hover:text-white"
            onClick={() => {
                setCurrentSong(song);
                console.log(song);
                spotifyApi.play({ uris: [song.uri] })
            }
            }
        >
            <p className="group-hover:invisible visible text-right w-full pr-4">{order + 1}</p>
            <div className="flex space-x-4 items-center">
                <img className="w-12" src={song.album.images[2]?.url} />
                <div>
                    <PlayIcon
                        className="absolute hover:text-white hidden group-hover:block left-10 w-6 -translate-y-1/2 top-1/2"
                    />
                    <p className="text-white">{song.name}</p>
                    <p>{song.artists.map(x => x.name).join(", ")}</p>
                </div>
            </div>
            <p>{song.album.name}</p>
            <p className="justify-self-end">{millisToMinutesAndSeconds(song.duration_ms)}</p>
        </div>
    )
}

export default Song