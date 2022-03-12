import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const PlaylistModal = ({ modalOpen, closeModal, addPlaylist }) => {
    const [value, setValue] = useState("");

    return (
        <Transition appear show={modalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto bg-black/50 pt-20 text-white"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center ">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-[10s]"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-white"
                            >
                                Create Playlist
                            </Dialog.Title>
                            <div className="relative">
                                <input
                                    className="peer mt-4 w-full border-b border-gray-600 bg-transparent text-gray-200 outline-none"
                                    placeholder=" "
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <p className="absolute top-0.5 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                                    Playlist Name
                                </p>
                                <div className="w-full origin-center scale-x-0 border-b border-green-600 transition-all duration-300 peer-focus:scale-x-100"></div>
                            </div>

                            <div class="mt-4 flex gap-2">
                                <button
                                    className="modal-btn bg-active text-white focus-visible:ring-green-500"
                                    onClick={() => {
                                        addPlaylist(value);
                                        setValue("");
                                        closeModal();
                                    }}
                                >
                                    Create
                                </button>

                                <button
                                    className="modal-btn bg-white text-black focus-visible:ring-green-500"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};
export default PlaylistModal;
