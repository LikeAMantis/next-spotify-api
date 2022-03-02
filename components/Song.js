import millisToMinutesAndSeconds from "../lib/time";
import { PlayIcon } from "@heroicons/react/solid";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    isPlayState,
    playingPlaylistIdState,
    playlistsState,
} from "../atoms/playState";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import CustomMenu from "./CustomMenu/index";
import { MenuItem } from "@mui/material";
import { AddCircle, FavoriteOutlined, RemoveCircle } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

if (typeof window !== "undefined") {
    var menuColor = getComputedStyle(document.documentElement).getPropertyValue(
        "--menu-color"
    );
}

const Song = ({
    order,
    song,
    onRemove,
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
    const playlists = useRecoilValue(playlistsState);
    const [hover, setHover] = useState(false);

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
            className={`group relative items-center animate-duration-[1500ms]
                            ${isActive ? "font-bold" : ""}
                            ${isActive && isPlay ? "animate-pulse" : ""}
                            ${hover ? "bg-neutral-700 text-white" : ""}
                        `}
            onDoubleClick={play}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="song-container">
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
                            className="absolute left-16 top-1/2 hidden w-6 -translate-y-1/2 cursor-pointer hover:text-white group-hover:block"
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
            </div>
            {hover && (
                <div className="absolute top-1/2 right-9 -translate-y-1/2 cursor-pointer">
                    <CustomMenu
                        sx={{
                            background: menuColor,
                            color: "rgb(243 244 246)",
                            maxHeight: "500px",
                            overflowY: "auto",
                            "& .MuiMenuItem-root": {
                                display: "flex",
                                gap: "12px",
                                fontSize: "small",
                            },
                            "& .MuiMenuItem-root:hover": {
                                background: "#171717",
                            },
                        }}
                        ButtonElement={({ btnProps }) => (
                            <MoreHorizIcon
                                {...btnProps}
                                className="text-secondary hover:text-white"
                            />
                        )}
                    >
                        <MenuItem>
                            <FavoriteOutlined fontSize="small" />
                            Like Song
                        </MenuItem>
                        {onRemove && (
                            <MenuItem onClick={() => onRemove(song.id)}>
                                <RemoveCircle fontSize="small" />
                                Remove from Playlist
                            </MenuItem>
                        )}
                        <CustomMenu.Nested
                            icon={<AddCircle fontSize="small" />}
                            label="Add to Playlist"
                        >
                            {playlists.map((playlist) => (
                                <MenuItem>{playlist.name}</MenuItem>
                            ))}
                        </CustomMenu.Nested>
                    </CustomMenu>
                </div>
            )}
        </div>
    );
};

export default Song;
