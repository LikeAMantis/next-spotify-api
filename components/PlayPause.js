import { PlayIcon, PauseIcon } from "@heroicons/react/solid"
import { useRecoilState } from "recoil";
import { isPlayState } from "../atoms/playState";


const PlayPause = ({ className, spotifyApi, onClick, condition = true }) => {
    const [isPlay, setIsPlay] = useRecoilState(isPlayState);

    return (
        <>
            {isPlay && condition ? (
                <div data-title="Pause" onClick={() => { setIsPlay(false); spotifyApi.pause() }}>
                    <PauseIcon className={className} />
                </div>
            ) : (
                <div data-title="Play" onClick={async () => {
                    try {
                        onClick();
                    } catch (e) {
                        alert("No Active Device found!")
                    }
                }}><PlayIcon className={className} /></div>
            )}
        </>
    )
}

export default PlayPause
