import { useEffect, useRef, useState } from "react";
import Song from "./Song"

const Songs = ({ songs, playlist, playingPlaylistId, container, PlayPauseBtn, ...props }) => {
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
            )
        observer.observe(cachedRef)

        return function () {
            observer.unobserve(cachedRef)
        }
    }, []);


    function drawPlaylist() {
        return (
            songs.map((song, i) => (
                <Song key={song?.id} order={i}
                    song={song}
                    isActive={props.currentSong?.id === song?.id}
                    uris={songs.map(song => song.uri)}
                    {...props}
                />)
            )
        )
    }

    return (
        <div className="relative -top-10 text-secondary transparent">
            <div ref={ref} className={`sticky flex flex-col justify-end -top-1 z-10 bg-inherit h-28 ${isSticky ? "shadow-md shadow-black background" : ""}`}>
                <PlayPauseBtn isSticky={isSticky} />
                <div className={`song-container border-primary pb-1 mb-1 uppercase font-bold text-xs rounded-none ${!isSticky ? "border-b" : ""}`}>
                    <h3 className="w-full text-right pr-4">#</h3>
                    <h3>Title</h3>
                    {props.uriType !== "album" && <h3>Album</h3>}
                    <h3 className="justify-self-end">Duration</h3>
                </div>
            </div>
            <div>
                {drawPlaylist()}
            </div>
        </div>
    )
}

export default Songs





