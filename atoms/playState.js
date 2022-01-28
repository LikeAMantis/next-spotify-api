import { atom } from "recoil";

export const isPlayState = atom({
    key: "isPlayState",
    default: false,
});

export const playingPlaylistIdState = atom({
    key: "playingPlaylistIdState",
    default: null,
});

export const progressTimeState = atom({
    key: "progressTimeState",
    default: 0,
});