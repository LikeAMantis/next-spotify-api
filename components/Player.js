import {
    VolumeOffIcon,
    VolumeUpIcon,
    ArrowUpIcon,
} from "@heroicons/react/solid";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Slider } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import PlayPause from "./PlayPause";
import { useRecoilState } from "recoil";
import { isPlayState, progressTimeState } from "../atoms/playState";
import Link from "next/link";
import millisToMinutesAndSeconds from "../lib/time";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/outline";

const sliderStyles = {
    color: "rgb(209, 213, 219)",
    margin: "0",
    padding: "0",
    "& .MuiSlider-thumb": {
        display: "none",
        height: "12px",
        width: "12px",
    },
    "&:hover": {
        color: "white",
    },
    "&:hover .MuiSlider-thumb": {
        display: "block",
    },
};

const Player = ({ setCurrentSong, currentSong, spotifyApi }) => {
    const [isPlay, setIsPlay] = useRecoilState(isPlayState);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState("off");
    const [volume, setVolumeValue] = useState(100);
    const [activeDevice, setActiveDevice] = useState(null);
    const [progressTime, setProgressTime] = useRecoilState(progressTimeState);
    const firstRender = useRef(true);
    const interval = useRef();

    useEffect(() => {
        async function setPlayer() {
            spotifyApi.getMyCurrentPlayingTrack().then((res) => {
                if (res.body) {
                    setCurrentSong(res.body.item);
                    setProgressTime(res.body.progress_ms);
                }
            });

            setPlaybackStates();
        }
        setPlayer();
    }, []);

    useEffect(() => {
        async function handleSongSwitch() {
            if (firstRender.current) {
                firstRender.current = false;
                return;
            }

            if (!isPlay) setIsPlay(true);

            await new Promise((res) => setTimeout(res, 300));
            spotifyApi.getMyCurrentPlayingTrack().then((res) => {
                if (!res.body) return;
                setProgressTime(res.body.progress_ms);
            });
        }
        handleSongSwitch();
    }, [currentSong]);

    useEffect(() => {
        if (isPlay && currentSong) {
            progressTimer();
            return;
        }
        clearInterval(interval.current);

        // Unmount
        return () => clearInterval(interval.current);
    }, [isPlay]);

    function progressTimer() {
        interval.current = setInterval(() => {
            setProgressTime((progressTime) => {
                const newProgressTime = progressTime + 1000;

                if (newProgressTime > currentSong.duration_ms) {
                    spotifyApi.getMyCurrentPlayingTrack().then((res) => {
                        setCurrentSong(res.body.item);
                    });
                }
                return newProgressTime;
            });
        }, 1000);
    }

    async function setPlaybackStates() {
        const res = await spotifyApi.getMyCurrentPlaybackState();
        if (!res.body) return;

        const playbackState = res.body;
        setIsPlay(playbackState.is_playing);
        setShuffle(playbackState.shuffle_state);
        setRepeat(playbackState.repeat_state);
        setActiveDevice(playbackState.device);
    }

    const setSeekDebounced = useCallback(
        debounce((position_ms) => spotifyApi.seek(position_ms), 300),
        []
    );

    const setVolumeDebounced = useCallback(
        debounce((volume) => spotifyApi.setVolume(volume), 300),
        []
    );

    function setVolume(volume) {
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

    const Left = useCallback(({ currentSong }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="player-btn-container flex items-center">
                {currentSong && (
                    <AnimatePresence>
                        {!isOpen ? (
                            // Original
                            <motion.div
                                className="group relative"
                                layout="position"
                                layoutDependency={isOpen}
                            >
                                <Link href={`/album/${currentSong?.album?.id}`}>
                                    <img
                                        className={`aspect-square w-14 bg-black shadow-sm shadow-black`}
                                        src={currentSong?.album?.images[1]?.url}
                                    />
                                </Link>
                                <ArrowUpIcon
                                    className="absolute top-1 left-1 w-6 rounded-full bg-black p-1 opacity-0 group-hover:opacity-75"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                            </motion.div>
                        ) : (
                            // Copy
                            <motion.div
                                className="group absolute top-0 left-0 -z-10"
                                initial={{
                                    translateY: "0%",
                                    opacity: 0,
                                }}
                                animate={{
                                    translateY: "-100%",
                                    opacity: 1,
                                }}
                                exit={{ translateY: "0%", opacity: 0 }}
                                transition={{ duration: 0.35 }}
                            >
                                <Link href={`/album/${currentSong?.album?.id}`}>
                                    <img
                                        className={`aspect-square w-52 bg-black shadow-sm shadow-black`}
                                        src={currentSong?.album?.images[1]?.url}
                                    />
                                </Link>
                                <ArrowDownIcon
                                    className="absolute top-2 left-2 w-7 rounded-full bg-black p-1 opacity-0 group-hover:opacity-75"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
                <motion.div
                    className="cursor-default overflow-hidden text-xs lg:text-sm"
                    layout="position"
                    layoutDependency={isOpen}
                >
                    <p className="font-bold text-white">{currentSong?.name}</p>
                    <Link href={`/artist/${currentSong?.artists[0]?.id}`}>
                        <p className="cursor-pointer">
                            {currentSong?.artists
                                ?.map((x) => x.name)
                                .join(", ")}
                        </p>
                    </Link>
                </motion.div>
            </div>
        );
    }, []);

    return (
        <div className="relative z-10 col-span-full">
            <div
                className="border-primary grid 
                h-20 grid-cols-3 items-center gap-2 border-t 
                bg-neutral-800 px-6 text-gray-300 child:gap-x-2
                "
            >
                <Left currentSong={currentSong} />

                {/* Center */}
                <div className="relative flex flex-col items-center justify-center gap-1">
                    <div className="player-btn-container flex items-center justify-center gap-1 justify-self-center md:gap-2">
                        <div
                            data-title="Shuffle"
                            onClick={() => {
                                spotifyApi.setShuffle(!shuffle);
                                setShuffle(!shuffle);
                            }}
                        >
                            <ShuffleIcon
                                className={`${shuffle ? "text-active" : ""}`}
                            />
                        </div>
                        <div
                            data-title="Previous Song"
                            onClick={async () => {
                                await spotifyApi.skipToPrevious();
                                getMyPlayingSong();
                            }}
                        >
                            <SkipNextIcon className="rotate-180" />
                        </div>
                        <PlayPause
                            className="w-11"
                            spotifyApi={spotifyApi}
                            onClick={() => {
                                setIsPlay(true);
                                spotifyApi.play();
                            }}
                        />
                        <div
                            data-title="Next Song"
                            onClick={async () => {
                                await spotifyApi.skipToNext();
                                setTimeout(getMyPlayingSong, 300);
                            }}
                        >
                            <SkipNextIcon />
                        </div>
                        <div
                            data-title="Repeat"
                            onClick={() => {
                                spotifyApi.setRepeat(toggleRepeat());
                                setRepeat(toggleRepeat());
                            }}
                        >
                            <RepeatIcon
                                className={`${
                                    repeat === "track" ? "text-active" : ""
                                }`}
                            />
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="text-secondary flex w-full items-center gap-1 text-xs">
                        <p className="overflow-visible">
                            {currentSong
                                ? millisToMinutesAndSeconds(progressTime)
                                : ""}
                        </p>
                        {currentSong && (
                            <Slider
                                min={0}
                                max={currentSong.duration_ms}
                                size="medium"
                                value={progressTime}
                                onChange={(e) => {
                                    setProgressTime(parseInt(e.target.value));
                                    setSeekDebounced(parseInt(e.target.value));
                                }}
                                sx={sliderStyles}
                            />
                        )}
                        <p className="overflow-visible">
                            {currentSong
                                ? millisToMinutesAndSeconds(
                                      currentSong?.duration_ms
                                  )
                                : ""}
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="player-btn-container relative flex items-center justify-self-end">
                    <div onClick={() => setVolume(volume - 10)}>
                        <VolumeOffIcon className="w-5" />
                    </div>
                    <div className="flex items-center" data-title={volume}>
                        {/* <input className="w-24 h-1 cursor-pointer" onChange={e => setVolume(parseInt(e.target.value))} type="range" value={volume} /> */}
                        <Slider
                            size="medium"
                            onChange={(e) =>
                                setVolume(parseInt(e.target.value))
                            }
                            value={volume}
                            sx={{ ...sliderStyles, width: "80px" }}
                        />
                    </div>

                    <div target onClick={() => setVolume(volume + 10)}>
                        <VolumeUpIcon className="w-5" />
                    </div>
                </div>
                {activeDevice && (
                    <div className="bg-active absolute right-0 bottom-0 hidden rounded-tl-md px-4 text-xs text-white md:block">{`Active Device: ${activeDevice?.name}`}</div>
                )}
            </div>
        </div>
    );
};

export default Player;
