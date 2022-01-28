import { PlayIcon, PauseIcon } from "@heroicons/react/solid"
import { useRecoilState } from "recoil";
import { isPlayState } from "../atoms/playState";


const PlayPause = ({ className, spotifyApi, onClick, playlistName, isSticky, condition = true }) => {
    const [isPlay, setIsPlay] = useRecoilState(isPlayState);

    function handlePlay() {
        try {
            onClick();
        } catch (e) {
            alert("No Active Device found!")
        }
    }

    return (
        <>
            {(isPlay && condition) ? (
                <div className="flex items-center text-white" data-title="Pause" >
                    <PauseIcon className={"hover:scale-110 cursor-pointer " + className}
                        onClick={() => { setIsPlay(false); spotifyApi.pause() }}
                    />
                    <h2 className={`transition-opacity absolute left-28 duration-200 ${isSticky ? "opacity-100" : "opacity-0"}`}>{playlistName}</h2>
                </div>
            ) : (
                <div className="flex items-center  text-white" data-title="Play">
                    <PlayIcon className={"hover:scale-110 cursor-pointer " + className}
                        onClick={handlePlay}
                    />
                    <h2 className={`transition-opacity absolute left-28 duration-200 ${isSticky ? "opacity-100" : "opacity-0"}`}>{playlistName}</h2>
                </div>
            )}
        </>
    )
}

export default PlayPause
