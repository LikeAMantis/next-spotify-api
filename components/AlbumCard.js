import Link from "next/link"

const AlbumCard = ({ album, type }) => {
    return (
        <Link replace={true} href={`/album/${album.id}`}>
            <div className="w-36 lg:w-52 p-3 pb-6 bg-stone-900 hover:scale-110 hover:shadow-md hover:shadow-black transition-all duration-150 cursor-pointer shadow-sm shadow-black">
                <img className="w-full object-cover" src={album.images[1].url}></img>
                <div class="[line-height:1] mt-4">
                    <p className="font-bold">{album.name}</p>
                    <p className="capitalize">{album.release_date.substring(0, 4) + " - " + type}</p>
                </div>
            </div>
        </Link>
    )
}

export default AlbumCard
