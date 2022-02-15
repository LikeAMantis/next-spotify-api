import millisToMinutesAndSeconds from "../lib/time";
import { PlayIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    isPlayState,
    playingPlaylistIdState,
    playlistsState,
} from "../atoms/playState";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const Song = ({
    order,
    song,
    setCurrentSong,
    isActive,
    spotifyApi,
    uriType,
    uris,
    showCover = true,
}) => {
    const setPlayingPlaylistId = useSetRecoilState(playingPlaylistIdState);
    const isPlay = useRecoilValue(isPlayState);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const playlists = useRecoilValue(playlistsState);

    async function play() {
        try {
            if (uriType) {
                await spotifyApi.play({
                    context_uri: `spotify:${uriType}:` + router.query.id,
                    offset: { position: order },
                });
            } else if (uris) {
                await spotifyApi.play({ uris, offset: { position: order } });
            }
            setCurrentSong(song);
        } catch (e) {
            alert("No Active Device Found!");
        }

        if (!router.query.id) return;
        setPlayingPlaylistId(router.query.id);
    }

    return (
        <div
            className={`song-container group relative items-center hover:bg-neutral-800 hover:text-white 
                ${isActive ? "font-bold" : ""}
                ${isActive && isPlay ? "animate-pulse" : ""}`}
            onDoubleClick={play}
        >
            <p className="visible w-full pr-4 text-right group-hover:invisible">
                {order + 1}
            </p>
            <div className="flex items-center space-x-4">
                {showCover && (
                    <Link href={`/album/${song.album.id}`}>
                        <img
                            className="w-12 cursor-pointer shadow-sm shadow-black"
                            src={song.album?.images[2]?.url}
                        />
                    </Link>
                )}

                <div>
                    <PlayIcon
                        className="absolute left-10 top-1/2 hidden w-6 -translate-y-1/2 cursor-pointer hover:text-white group-hover:block"
                        onClick={play}
                    />
                    <p
                        className={
                            "text-white" + (isActive ? " text-active" : "")
                        }
                    >
                        {song.name}
                    </p>
                    <Link href={`/artist/${song?.artists[0]?.id}`}>
                        <p className="cursor-pointer">
                            {song.artists.map((x) => x.name).join(", ")}
                        </p>
                    </Link>
                </div>
            </div>
            <Link href={`/album/${song.album.id}`}>
                <p className="cursor-pointer">{song.album.name}</p>
            </Link>
            <p className="justify-self-end">
                {millisToMinutesAndSeconds(song.duration_ms)}
            </p>

            {/* Menu */}
            <div className="absolute -right-4 hidden group-hover:block">
                {/* <Button
                    sx={{ color: "white" }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={handleClose}>Liked Songs</MenuItem>
                    <NestedMenuItem label="Playlists" parentMenuOpen={open}>
                        {playlists.map((playlist) => (
                            <MenuItem key={playlist.id} onClick={handleClose}>
                                {playlist.name}
                            </MenuItem>
                        ))}
                    </NestedMenuItem>
                </Menu> */}
            </div>
        </div>
    );
};

export default Song;
