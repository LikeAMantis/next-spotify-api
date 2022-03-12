import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusIcon,
} from "@heroicons/react/outline";
import { Button } from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { playingPlaylistIdState } from "../../atoms/playState";
import PlaylistModal from "../PlaylistModal";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Sidebar = ({
    playlists,
    sidebarIsOpen,
    setSidebarIsOpen,
    ...props
}) => {
    const router = useRouter();
    const playingPlaylistId = useRecoilValue(playingPlaylistIdState);
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div
                id="sidebar"
                className={`text-secondary w-full min-w-max overflow-y-auto bg-black p-12 transition-transform duration-300
                    md:relative md:block md:w-52 md:p-5 md:pr-10
           
                `}
            >
                <section id="sidebar-main" className="space-y-2 text-lg">
                    <Link href="/" scroll={true}>
                        <Button
                            text="Home"
                            icon={<HomeIcon className="w-5" />}
                            onClick={() => setSidebarIsOpen(false)}
                            isActive={router.pathname === "/"}
                            isPlaying={
                                playingPlaylistId === "recentlyPlayedTracks"
                            }
                        />
                    </Link>
                    <Button
                        text="Search"
                        icon={<SearchIcon className="w-5" />}
                    />
                    <Button
                        text="Library"
                        icon={<LibraryIcon className="w-5" />}
                    />
                    <Button
                        text="Create Playlist"
                        icon={<PlusIcon className="w-5" />}
                        onClick={() => setModalOpen(true)}
                    />
                </section>
                {/* Playlists */}
                <div className="label-wrapper my-3">
                    <h3 className="uppercase text-white">Playlists</h3>
                </div>
                <section className="space-y-1">
                    {playlists.map((playlist) => (
                        <Link
                            key={playlist.id}
                            href={`/playlist/${playlist.id}`}
                            scroll={true}
                        >
                            <Button
                                text={playlist.name}
                                onClick={() => setSidebarIsOpen(false)}
                                isActive={router.query.id === playlist.id}
                                isPlaying={playingPlaylistId === playlist.id}
                            />
                        </Link>
                    ))}
                </section>
            </div>
            <PlaylistModal
                {...props}
                closeModal={closeModal}
                modalOpen={modalOpen}
            />
        </>
    );
};
