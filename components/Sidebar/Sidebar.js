import { HomeIcon, SearchIcon, LibraryIcon, PlusIcon } from "@heroicons/react/outline"
import { Button } from "./Button"
import Link from "next/link";

export const Sidebar = ({ playlists, sidebarIsOpen, setSidebarIsOpen }) => {
    return (
        <div className={`min-w-max shadow-lg overflow-y-scroll no-scrollbar bg-black text-secondary p-12 md:p-5 space-y-3 font-bold text-lg md:text-base 
        md:block ${sidebarIsOpen ? "block" : "hidden"}`}
        >
            <Link href="/" scroll={true}><Button text="Home" icon={<HomeIcon className="w-4 lg:w-5" />} onClick={() => setSidebarIsOpen(false)} /></Link>
            <Button text="Search" icon={<SearchIcon className="w-4 lg:w-5" />} />
            <Button text="Library" icon={<LibraryIcon className="w-4 lg:w-5" />} />
            <Button text="Create Playlist" icon={<PlusIcon className="w-4 lg:w-5" />} />

            <div className="label-wrapper max-w-screen-sm">
                <h3>Playlists</h3>
            </div>
            {/* Playlists */}
            <section className="space-y-2 font-normal">
                {playlists.map(playlist => (
                    <Link key={playlist.id} href={`/playlist/${playlist.id}`} scroll={true} onclick={() => console.log("ture")}>
                        <Button
                            text={playlist.name}
                            onClick={() => setSidebarIsOpen(false)}
                        />
                    </Link>
                ))}
            </section>
        </div >
    )
}