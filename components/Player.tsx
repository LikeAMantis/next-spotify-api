import { VolumeOffIcon, VolumeUpIcon, ReplyIcon, SwitchHorizontalIcon, FastForwardIcon } from "@heroicons/react/solid"
import { useCallback, useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import useSpotify from "../lib/useSpotify";
import PlayPause from "../components/PlayPause"
import { useSetRecoilState } from "recoil";
import { isPlayState } from "../atoms/playState";


const Player = ({ setCurrentSong, currentSong }) => {
    const setIsPlay = useSetRecoilState(isPlayState);
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
        child:space-x-2 items-center h-16 bg-neutral-800 border-primary 
        border-t-2 px-6 text-gray-300
        "
        >
            {/* Left - SongInfo*/}
            <div className="flex player-btn-container items-center">
                <img className="w-12 shadow-md aspect-square bg-black
                    origin-bottom-left hover:scale-[4] z-10 duration-500
                    "
                    src={currentSong?.album?.images[1]?.url}
                />
                <div className="text-base overflow-hidden">
                    <p className="text-white font-bold  ">{currentSong?.name}</p>
                    <p className="">{currentSong?.artists?.map(x => x.name).join(", ")}</p>
                </div>
            </div>
            {/* Center - Play */}
            <div className="flex player-btn-container justify-self-center items-center">
                <div data-title="Shuffle" onClick={() => { spotifyApi.setShuffle(!shuffle); setShuffle(!shuffle) }}>
                    <SwitchHorizontalIcon className={`w-5 ${shuffle ? "text-active" : ""}`} />
                </div>
                <div data-title="Previous Song" onClick={async () => {
                    await spotifyApi.skipToPrevious();
                    getMyPlayingSong();
                }
                }>
                    <FastForwardIcon className="w-5 rotate-180" />
                </div>
                <PlayPause className="w-11" spotifyApi={spotifyApi} onClick={() => {
                    setIsPlay(true);
                    spotifyApi.play();
                }
                } />
                <div data-title="Next Song" onClick={async () => {
                    await spotifyApi.skipToNext();
                    setTimeout(getMyPlayingSong, 300);
                }
                } >
                    <FastForwardIcon className="w-5" />
                </div>
                <div data-title="Repeat" onClick={() => { spotifyApi.setRepeat(toggleRepeat()); setRepeat(toggleRepeat()) }}>
                    <ReplyIcon className={`w-5 ${repeat === "track" ? "text-active" : ""}`} />
                </div>
            </div>
            {/* Right - Volume */}
            <div className="flex player-btn-container justify-self-end">
                <div onClick={() => setVolume(volume - 10)}>
                    <VolumeOffIcon className="w-5" />
                </div>
                <div className="flex items-center" data-title={volume}>
                    <input className="w-28 h-[6px]" onChange={e => setVolume(parseInt(e.target.value))} type="range" value={volume} />
                </div>
                <div onClick={() => setVolume(volume + 10)}>
                    <VolumeUpIcon className="w-5" />
                </div>
            </div>
        </div>
    )
}

export default Player