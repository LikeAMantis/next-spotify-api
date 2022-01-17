import { PlayIcon, VolumeOffIcon, VolumeUpIcon, PauseIcon, ReplyIcon, SwitchHorizontalIcon, FastForwardIcon } from "@heroicons/react/solid"
import { useCallback, useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import useSpotify from "../lib/useSpotify";


const Player = ({ setCurrentSong, currentSong }) => {
    const [isPlay, setIsPlay] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState("off");
    const [volume, setVolumeValue] = useState(50);
    const spotifyApi = useSpotify();

    useEffect(() => {
        setIsPlay(true);
    }, [currentSong])

    useEffect(() => {
        async function getCurrentSong() {
            const res = await spotifyApi.getMyCurrentPlayingTrack();
            if (!res?.body?.is_playing) {
                setIsPlay(false);
                setCurrentSong(JSON.parse(localStorage.getItem("currentSong")));
                return;
            }
            setCurrentSong(res?.body?.item);
            setIsPlay(true);

            const playbackState = await spotifyApi.getMyCurrentPlaybackState();
            setShuffle(playbackState?.body.shuffle_state);
            setRepeat(playbackState?.body.repeat_state);
        }

        getCurrentSong();
    }, []);


    const setVolumeDebounced = useCallback(
        debounce((volume: number) => spotifyApi.setVolume(volume), 300)
        , []);

    function setVolume(volume: number) {
        volume = Math.min(Math.max(volume, 0), 100);
        setVolumeValue(volume);
        setVolumeDebounced(volume);
    }

    async function getMyPlayingSong() {
        const res = await spotifyApi.getMyCurrentPlayingTrack();
        setCurrentSong(res?.body?.item);
    }

    function toggleRepeat() {
        if (repeat === "off") return "track";
        else return "off";
    }


    return (
        <div className="grid grid-cols-3 col-span-full 
        child:space-x-2 items-center h-14 bg-neutral-800 border-gray-700 
        border-t-2 px-6 text-gray-300
        "
        >
            {/* SongInfo */}
            <div className="flex player-btn-container items-center">
                <img src={currentSong?.album?.images[2]?.url} className="w-10 shadow-md aspect-square bg-black" />
                <div className="text-xs">
                    <p className="text-white">{currentSong?.name}</p>
                    <p>{currentSong?.artists?.map(x => x.name).join(", ")}</p>
                </div>
            </div>
            {/* Control */}
            <div className="flex player-btn-container justify-self-center items-center">
                <div data-title="Shuffle" onClick={() => { spotifyApi.setShuffle(!shuffle); setShuffle(!shuffle) }}>
                    <SwitchHorizontalIcon className={`w-5 ${shuffle ? "text-green-600" : ""}`} />
                </div>
                <div data-title="Previous Song" onClick={async () => {
                    await spotifyApi.skipToPrevious();
                    getMyPlayingSong();
                }
                }>
                    <FastForwardIcon className="w-5 rotate-180" />
                </div>
                {isPlay ? (
                    <div data-title="Pause" onClick={() => { setIsPlay(false); spotifyApi.pause() }}>
                        <PauseIcon className="w-8" />
                    </div>
                ) : (
                    <div data-title="Play" onClick={() => {
                        try {
                            setIsPlay(true);
                            spotifyApi.play();
                        } catch (e) {
                            alert("No Active Device found!")
                        }
                    }}><PlayIcon className="w-8" /></div>
                )}
                <div data-title="Next Song" onClick={async () => {
                    await spotifyApi.skipToNext();
                    setTimeout(getMyPlayingSong, 300);
                }
                } >
                    <FastForwardIcon className="w-5" />
                </div>
                <div data-title="Repeat" onClick={() => { spotifyApi.setRepeat(toggleRepeat()); setRepeat(toggleRepeat()) }}>
                    <ReplyIcon className={`w-5 ${repeat === "track" ? "text-green-600" : ""}`} />
                </div>
            </div>
            {/* Volume */}
            <div className="flex player-btn-container justify-self-end items-center">
                <div data-title="Volume Down" onClick={() => setVolume(volume - 10)}>
                    <VolumeOffIcon className="w-5" />
                </div>
                {/* <div data-title={volume}> */}
                <input className="w-28 h-[6px]" onChange={e => setVolume(parseInt(e.target.value))} type="range" value={volume} />
                {/* </div> */}
                <div data-title="Volume Up" onClick={() => setVolume(volume + 10)}>
                    <VolumeUpIcon className="w-5" />
                </div>
            </div>
        </div>
    )
}

export default Player