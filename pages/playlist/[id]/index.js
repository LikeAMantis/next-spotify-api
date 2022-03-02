import { forwardRef } from "react";
import Header from "../../../components/Header";
import Songs from "../../../components/Songs";
import { useRecoilState } from "recoil";
import { playingPlaylistIdState } from "../../../atoms/playState";
import Layout from "../../../components/Layout";
import PlayPause from "../../../components/PlayPause";
import usePlaylist from "../../../lib/usePlaylist";

const Playlist = forwardRef(
    ({ setCurrentSong, currentSong, spotifyApi, className }, ref) => {
        const [playingPlaylistId, setPlayingPlaylistId] = useRecoilState(
            playingPlaylistIdState
        );
        const [playlist, songs, totalSongs, removeSong] =
            usePlaylist(spotifyApi);

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
                            songNumber={totalSongs}
                        />
                        <Songs
                            songs={songs}
                            onRemove={removeSong}
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
