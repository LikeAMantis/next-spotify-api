import Song from "./Song"

const Songs = ({ songs, spotifyApi, setCurrentSong, currentSong }) => {

    function drawPlaylist() {
        return (
            songs.map((song, i) => (
                <Song key={song.track.id} order={i}
                    song={song.track}
                    isActive={currentSong?.id === song.track.id}
                    setCurrentSong={setCurrentSong}
                    spotifyApi={spotifyApi}
                />)
            )
        )
    }


    return (
        <div className="text-secondary bg-inherit">
            <div className="sticky z-10 top-0 bg-inherit song-container border-primary border-b-[1px] pb-1 mb-4 uppercase font-bold text-xs rounded-none">
                <h3 className="w-full text-right pr-4">#</h3>
                <h3>Title</h3>
                <h3>Album</h3>
                <h3 className="justify-self-end">Duration</h3>
            </div>
            <div>
                {drawPlaylist()}
            </div>
        </div>
    )
}

export default Songs





