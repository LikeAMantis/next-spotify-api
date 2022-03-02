import { Collapse } from "@mui/material";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import Song from "./Song";

const Songs = ({
    songs,
    playlist,
    playingPlaylistId,
    container,
    PlayPauseBtn,
    ...props
}) => {
    const [isSticky, setIsSticky] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const cachedRef = ref.current,
            observer = new IntersectionObserver(
                ([e]) => setIsSticky(e.intersectionRatio < 1),
                {
                    root: container.current,
                    threshold: [1],
                }
            );
        observer.observe(cachedRef);

        return function () {
            observer.unobserve(cachedRef);
        };
    }, []);

    function drawPlaylist() {
        return (
            <TransitionGroup>
                {songs.map((song, i) => (
                    <Collapse
                        key={song?.id}
                        enter={false}
                        orientation="vertical"
                    >
                        <Song
                            order={i}
                            song={song}
                            isActive={props.currentSong?.id === song?.id}
                            uris={songs.map((song) => song.uri)}
                            {...props}
                        />
                    </Collapse>
                ))}
            </TransitionGroup>
        );
    }

    return (
        <div className="text-secondary transparent relative -top-10">
            <div
                ref={ref}
                className={`sticky -top-1 z-10 flex h-28 flex-col justify-end bg-inherit ${
                    isSticky ? "background shadow-md shadow-black" : ""
                }`}
            >
                <PlayPauseBtn isSticky={isSticky} />
                <div
                    className={`song-container border-primary mb-1 rounded-none pb-1 text-xs font-bold uppercase ${
                        !isSticky ? "border-b" : ""
                    }`}
                >
                    <h3 className="w-full pr-4 text-right">#</h3>
                    <h3>Title</h3>
                    {props.uriType !== "album" && <h3>Album</h3>}
                    <h3 className="w-max justify-self-end">Duration</h3>
                </div>
            </div>

            {drawPlaylist()}
        </div>
    );
};

export default Songs;
