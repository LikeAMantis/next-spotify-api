import AlbumCard from "./AlbumCard"

const ArtistCategory = ({ albums, titel }) => {
    return (
        <>
            {(albums.length > 0) && (
                <div>
                    <h2 className="mb-4">{titel}</h2>
                    <div className="flex flex-wrap gap-x-3 gap-y-6">
                        {albums && (
                            albums.map(album => (
                                <AlbumCard album={album} type={titel.substring(0, titel.length - 1)} />
                            )))
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default ArtistCategory

