import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import ArtistCategory from "../../../components/ArtistCategory";

export default function Artist({ spotifyApi }) {
    const router = useRouter();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        spotifyApi
            .getArtist(router.query.id)
            .then((res) => setArtist(res.body));
        spotifyApi
            .getArtistAlbums(router.query.id)
            .then((res) => setAlbums(res.body.items));
    }, [router]);

    return (
        <>
            <Header
                type="Artist"
                name={artist?.name}
                imgRef={artist?.images[0]?.url}
            ></Header>
            <div className="space-y-12 divide-y divide-gray-700 p-14">
                <ArtistCategory
                    titel="Albums"
                    albums={albums.filter(
                        (album) => album.album_type === "album"
                    )}
                />
                <ArtistCategory
                    titel="EPs"
                    albums={albums.filter(
                        (album) =>
                            album.album_type === "single" &&
                            album.total_tracks > 1
                    )}
                />
                <ArtistCategory
                    titel="Singles"
                    albums={albums.filter((album) => album.total_tracks === 1)}
                />
            </div>
        </>
    );
}

Artist.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
