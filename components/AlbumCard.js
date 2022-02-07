import Link from "next/link";

const AlbumCard = ({ album, type }) => {
    return (
        <Link href={`/album/${album.id}`}>
            <div className="w-36 cursor-pointer rounded-md bg-stone-900 p-3 pb-6 shadow-md shadow-black transition-all duration-150 hover:scale-110 hover:shadow-lg hover:shadow-black lg:w-52">
                <img
                    className="w-full object-cover"
                    src={album.images[1].url}
                ></img>
                <div class="mt-4">
                    <p className="font-bold">{album.name}</p>
                    <p className="capitalize">
                        {album.release_date.substring(0, 4) + " - " + type}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default AlbumCard;
