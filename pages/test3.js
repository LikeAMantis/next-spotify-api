import { Transition } from "@headlessui/react";
import { useState } from "react";

const test3 = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative top-10 -right-10 text-white">
            <button className="p-1"
                onClick={() => setIsOpen(!isOpen)}
                onBlur={(e) =>
                    e.relatedTarget?.parentElement?.dataset.type !== "module" && setIsOpen(false)
                }
            >...</button>

            <Transition
                // as={Fragment}
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >

                <div data-type="module" className="flex flex-col p-2 bg-gray-50 rounded-md w-fit right-0 translate-x-full">
                    <button>One</button>
                    <NestedMenu label="two">
                        <button onClick={() => alert("ok")}>Click Me</button>
                        <button>nested two</button>
                        <button>One</button>
                        <NestedMenu label="Three">
                            <button>nested two</button>
                            <button>One</button>
                        </NestedMenu>
                    </NestedMenu>
                </div>
            </Transition>

        </div>
    )
}


function NestedMenu({ label, children }) {
    return (
        <div className="group relative">
            <button className="">{label}</button>
            {/* Menu */}
            <div className="group-hover:opacity-100 group-hover:scale-100 scale-95 group-focus-within:opacity-100  top-0 opacity-0 duration- pl-6 transition-opacity absolute  right-0 translate-x-full">
                <div className="flex flex-col p-2 rounded-md w-fit bg-gray-50">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default test3