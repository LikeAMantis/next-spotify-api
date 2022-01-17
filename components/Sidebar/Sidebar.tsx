import { HomeIcon, SearchIcon, LibraryIcon, PlusIcon, LogoutIcon } from "@heroicons/react/outline"
import { Button } from "./Button"
import useSpotify from "../../lib/useSpotify";


interface Props {
    playlists: [],
    setActivePlaylistId: any,
    setCurrentSong: Object,
}

export const Sidebar = ({ playlists, setActivePlaylistId }: Props) => {
    const spotifyApi = useSpotify();

    return (
        <div className="hidden min-w-max shadow-lg overflow-y-scroll no-scrollbar bg-black text-gray-400 p-5 pb-19 space-y-3
            font-bold text-sm lg:text-base 
            md:block"
        >
            <Button text="Home" icon={<HomeIcon className="w-4 lg:w-5" />} />
            <Button text="Search" icon={<SearchIcon className="w-4 lg:w-5" />} />
            <Button text="Library" icon={<LibraryIcon className="w-4 lg:w-5" />} />
            <Button text="Create Playlist" icon={<PlusIcon className="w-4 lg:w-5" />} />
            <hr className="border-gray-700"></hr>
            <section className="space-y-2 font-normal">
                {playlists.map(playlist => (
                    <Button
                        key={playlist.id}
                        text={playlist.name}
                        onClick={async () => {
                            const res = await spotifyApi.getPlaylistTracks(playlist.id);
                            console.log(res);
                            setActivePlaylistId(playlist.id);
                        }}
                    />))
                }
            </section>
        </div>
    )
}