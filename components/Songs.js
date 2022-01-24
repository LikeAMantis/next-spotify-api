import { useRouter } from "next/router";
import { cloneElement, useEffect, useRef, useState } from "react";
import PlayPause from "./PlayPause";
import Song from "./Song"

const Songs = ({ songs, spotifyApi, playlist, playingPlaylistId, container, playPauseBtn, ...props }) => {
    const router = useRouter();
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
        <div className="text-secondary bg-inherit">
            <div ref={ref} className="sticky top-[-1px] z-10 bg-inherit">
                {cloneElement(playPauseBtn, isSticky)}
                <div className="song-container border-primary border-b-[1px] pb-1 mb-4 uppercase font-bold text-xs rounded-none">
                    <h3 className="w-full text-right pr-4">#</h3>
                    <h3>Title</h3>
                    {songs[0]?.album && <h3>Album</h3>}
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





