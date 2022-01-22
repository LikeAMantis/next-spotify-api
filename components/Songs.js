import Song from "./Song"

const Songs = ({ songs, ...props }) => {

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
            <div className="sticky z-10 top-0 bg-inherit song-container border-primary border-b-[1px] pb-1 mb-4 uppercase font-bold text-xs rounded-none">
                <h3 className="w-full text-right pr-4">#</h3>
                <h3>Title</h3>
                {songs[0]?.album && <h3>Album</h3>}
                <h3 className="justify-self-end">Duration</h3>
            </div>
            <div>
                {drawPlaylist()}
            </div>
        </div>
    )
}

export default Songs





