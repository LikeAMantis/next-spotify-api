import { forwardRef, useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import Songs from "../../../components/Songs";
import { useRecoilState } from "recoil";
import { playingPlaylistIdState } from "../../../atoms/playState";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import PlayPause from "../../../components/PlayPause";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Playlist = forwardRef(
    ({ setCurrentSong, currentSong, spotifyApi, className }, ref) => {
        const [playingPlaylistId, setPlayingPlaylistId] = useRecoilState(
            playingPlaylistIdState
        );
        const router = useRouter();
        const [playlist, setPlaylist] = useState(null);

        useEffect(() => {
            async function getPlaylist() {
                if (!router.query.id) return;

                const res = await spotifyApi.getPlaylist(router.query.id);
                setPlaylist(res.body);
            }

            getPlaylist();
        }, [router]);

        async function handlePlayPlause() {
            await spotifyApi.play({ context_uri: playlist.uri });
            setTimeout(async () => {
                setPlayingPlaylistId(router.query.id);
                const res = await spotifyApi.getMyCurrentPlayingTrack();
                setCurrentSong(res?.body?.item);
            }, 300);
        }

        return (
            <div ref={ref} className={`center ${className}`}>
                {playlist && (
                    <>
                        <Header
                            type={"PLAYLIST"}
                            name={playlist.name}
                            imgRef={playlist.images[0].url}
                            songNumber={playlist.tracks.total}
                        />
                        <Songs
                            songs={playlist.tracks.items.map((x) => x.track)}
                            spotifyApi={spotifyApi}
                            setCurrentSong={setCurrentSong}
                            currentSong={currentSong}
                            playlist={playlist}
                            playingPlaylistId={playingPlaylistId}
                            uriType="playlist"
                            container={ref}
                            PlayPauseBtn={({ isSticky }) => (
                                <PlayPause
                                    className={`text-active ml-12 inline-block transition-all duration-150
                    ${isSticky ? "mt-2 w-14" : "w-24"}`}
                                    spotifyApi={spotifyApi}
                                    condition={
                                        playlist.id === playingPlaylistId
                                    }
                                    onClick={handlePlayPlause}
                                    isSticky={isSticky}
                                    playlistName={playlist.name}
                                />
                            )}
                        />
                    </>
                )}
            </div>
        );
    }
);

Playlist.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Playlist;
