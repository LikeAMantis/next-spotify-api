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

export const Sidebar = ({ playlists, sidebarIsOpen, setSidebarIsOpen }) => {
    const router = useRouter();
    const playingPlaylistId = useRecoilValue(playingPlaylistIdState);

    return (
        <div
            className={`no-scrollbar text-secondary min-w-max space-y-3 overflow-y-scroll bg-black p-12 text-lg font-bold shadow-lg md:block md:p-5 md:pr-10 
        md:text-base ${sidebarIsOpen ? "block" : "hidden"}`}
        >
            <Link href="/" scroll={true}>
                <Button
                    text="Home"
                    icon={<HomeIcon className="w-4 lg:w-5" />}
                    onClick={() => setSidebarIsOpen(false)}
                    isActive={router.pathname === "/"}
                    isPlaying={playingPlaylistId === "recentlyPlayedTracks"}
                />
            </Link>
            <Button
                text="Search"
                icon={<SearchIcon className="w-4 lg:w-5" />}
            />
            <Button
                text="Library"
                icon={<LibraryIcon className="w-4 lg:w-5" />}
            />
            <Button
                text="Create Playlist"
                icon={<PlusIcon className="w-4 lg:w-5" />}
            />

            <div className="label-wrapper max-w-screen-sm">
                <h3>Playlists</h3>
            </div>
            {/* Playlists */}
            <section className="space-y-2 font-normal">
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
    );
};
