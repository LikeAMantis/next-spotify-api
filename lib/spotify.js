
const scope = [
    "ugc-image-upload",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-private",
    "user-read-email",
    "user-library-modify",
    "user-library-read",
    "streaming",
    "app-remote-control",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "playlist-read-collaborative",
    "playlist-read-private",
].join(",");

const queryParamsString = new URLSearchParams({ scope }).toString();

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamsString;

export { LOGIN_URL };