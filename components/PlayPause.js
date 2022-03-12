import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { isPlayState } from "../atoms/playState";

const PlayPause = ({
    className,
    spotifyApi,
    onClick,
    playlistName,
    isSticky,
    condition = true,
}) => {
    const [isPlay, setIsPlay] = useRecoilState(isPlayState);

    function handlePlay() {
        try {
            onClick();
        } catch (e) {
            alert("No Active Device found!");
        }
    }

    return (
        <>
            <div
                className="flex items-center text-white"
                data-title={isPlay && condition ? "Pause" : "Play"}
            >
                {isPlay && condition ? (
                    <PauseIcon
                        className={
                            "cursor-pointer hover:scale-110 " + className
                        }
                        onClick={() => {
                            setIsPlay(false);
                            spotifyApi.pause();
                        }}
                    />
                ) : (
                    <PlayIcon
                        className={
                            "cursor-pointer duration-200 hover:scale-110 " +
                            className
                        }
                        onClick={handlePlay}
                    />
                )}
                <h2
                    className={`absolute left-28 transition-opacity duration-200 ${
                        isSticky ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {playlistName}
                </h2>
            </div>
        </>
    );
};

export default PlayPause;
