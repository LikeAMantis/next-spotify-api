import { useSession } from "next-auth/react"
import { ChevronUpIcon, ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline"
import { useState } from "react";
import { signOut } from "next-auth/react"
import { Button } from "./Sidebar/Button";

const Avatar = () => {
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    return (
        <div className="fixed flex items-center cursor-pointer w-fit h-7 spac lg:h-9 top-5 right-5 bg-black rounded-full p-0.5 pr-4 
            space-x-3 font-semibold text-xs lg:text-sm"
            tabIndex={0}
            onClick={() => setActive(!active)}
            onBlur={(e) => e.relatedTarget?.parentElement?.dataset.type !== "module" && setActive(false)}
        >
            <img className="object-fit h-full rounded-full" src={session?.user?.image} />
            <p className="">{session?.user?.name}</p>
            {!active ? (
                <ChevronDownIcon className="w-4 lg:w-5" />
            ) : (
                <>
                    <ChevronUpIcon className="w-4 lg:w-5" />
                    <div className="absolute -bottom-2 translate-y-full bg-black py-2 px-3" data-type="module">
                        <Button
                            text="Logout" icon={<LogoutIcon className="w-4 lg:w-5" />}
                            onClick={() => signOut()}
                        />
                    </div>
                </>
            )}
        </div >
    )
}

export default Avatar