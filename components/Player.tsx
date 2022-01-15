import { PlayIcon, VolumeOffIcon, VolumeUpIcon, PauseIcon, ReplyIcon, SwitchHorizontalIcon, FastForwardIcon } from "@heroicons/react/solid"
import { useState } from "react";


const Player = () => {
    const [isPlay, setIsPlay] = useState(false);
    const [volume, setVolume] = useState(50);

    return (
        <div className="grid grid-cols-3 col-span-full 
        child:space-x-2 items-center h-14 bg-neutral-800 border-gray-700 
        border-t-2 px-6 text-gray-300
        "
        >
            {/* SongInfo */}
            <div className="flex player-btn-container">
                <img src="" className="w-7 aspect-square bg-black" />
                <div className="text-xs">
                    <p className="text-white">Song Title</p>
                    <p>Album Name</p>
                </div>
            </div>
            {/* Control */}
            <div className="flex player-btn-container justify-self-center">
                <SwitchHorizontalIcon className="w-5" />
                <FastForwardIcon className="w-5 rotate-180" />
                {isPlay ? (
                    <PauseIcon onClick={() => setIsPlay(false)} className="w-8" />
                ) : (
                    <PlayIcon onClick={() => setIsPlay(true)} className="w-8" />
                )}
                <FastForwardIcon className="w-5" />
                <ReplyIcon className="w-5" />
            </div>
            {/* Volume */}
            <div className="flex player-btn-container justify-self-end">
                <VolumeOffIcon className="w-5" />
                <input className="w-24" type="range" />
                <VolumeUpIcon className="w-5" />
            </div>
        </div>
    )
}

export default Player