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
            {isPlay && condition ? (
                <div className="flex items-center space-x-2 text-white" data-title="Pause" onClick={() => { setIsPlay(false); spotifyApi.pause() }}>
                    <PauseIcon className={className} />
                    <h2 className={`transition-opacity duration-150 ${isSticky ? "opacity-100" : "opacity-0"}`}>{playlistName}</h2>
                </div>
            ) : (
                <div className="flex items-center  space-x-2 text-white" data-title="Play" onClick={handlePlay}>
                    <PlayIcon className={className} />
                    <h2 className={`transition-opacity duration-150 ${isSticky ? "opacity-100" : "opacity-0"}`}>{playlistName}</h2>
                </div>
            )}
        </>
    )
}

export default PlayPause
