import millisToMinutesAndSeconds from "../lib/time"
import { PlayIcon } from "@heroicons/react/solid"


const Song = ({ order, song }) => {
    return (
        <div className="group not:bg-blue-700:hover relative song-container hover:bg-neutral-800 hover:text-white">
            <p className="group-hover:invisible visible text-right w-full pr-4">{order + 1}</p>
            <div className="flex space-x-4 items-center w-96">
                <img className="w-12" src={song.album.images[2]?.url} />
                <div>
                    <PlayIcon className="absolute hover:text-white text-gray-400 hidden group-hover:block left-10 w-7 -translate-y-1/2 top-1/2" />
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