import { VolumeUpIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { isPlayState } from "../../atoms/playState";

export const Button = ({
    text,
    icon,
    onClick,
    className,
    isActive = false,
    isPlaying = false,
}) => {
    const isPlay = useRecoilValue(isPlayState);

    return (
        <button
            className={`relative flex w-full cursor-pointer items-center justify-center space-x-2 overflow-visible truncate hover:text-white md:justify-start md:overflow-visible
                ${className ?? ""}
                ${isActive ? "text-white" : ""}
                `}
            onClick={(e) => onClick && onClick(e)}
        >
            {icon}
            <p>{text}</p>
            {isPlaying && isPlay && (
                <motion.div
                    layoutId="sharedId"
                    className="absolute -right-6 w-4"
                >
                    <VolumeUpIcon />
                </motion.div>
            )}
        </button>
    );
};
