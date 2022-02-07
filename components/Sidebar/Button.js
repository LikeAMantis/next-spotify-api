import { VolumeUpIcon } from "@heroicons/react/solid";

export const Button = ({
    text,
    icon,
    onClick,
    className,
    isActive = false,
    isPlaying = false,
}) => {
    return (
        <button
            className={`relative flex w-full cursor-pointer items-center space-x-2 overflow-visible truncate hover:text-white
                ${className ?? ""}
                ${isActive ? "text-white" : ""}
                `}
            onClick={(e) => onClick && onClick(e)}
        >
            {icon}
            <p>{text}</p>
            {isPlaying && <VolumeUpIcon className="absolute -right-6 w-4" />}
        </button>
    );
};
