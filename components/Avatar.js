import { useSession } from "next-auth/react";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    LogoutIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "./Sidebar/Button";

const Avatar = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="spac absolute top-5 right-5 flex h-7 w-fit cursor-pointer items-center space-x-3 rounded-full bg-black p-0.5 pr-4 
            text-xs font-semibold lg:h-9 lg:text-sm"
            tabIndex={0}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={(e) =>
                e.relatedTarget?.parentElement?.dataset.type !== "module" &&
                setIsOpen(false)
            }
        >
            <img
                className="object-fit h-full rounded-full"
                src={session?.user?.image}
            />
            <p className="">{session?.user?.name}</p>
            {!isOpen ? (
                <ChevronDownIcon className="w-4 lg:w-5" />
            ) : (
                <>
                    <ChevronUpIcon className="w-4 lg:w-5" />
                    <div
                        className="absolute -bottom-2 translate-y-full bg-black py-2 px-3"
                        data-type="module"
                    >
                        <Button
                            text="Logout"
                            icon={<LogoutIcon className="w-4 lg:w-5" />}
                            onClick={() => signOut()}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Avatar;
