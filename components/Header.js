import { useEffect, useState } from "react";
import Avatar from "./Avatar"

const colors = [
    "from-red-500",
    "from-blue-500",
    "from-green-500",
    "from-orange-500",
    "from-teal-500",
    "from-purple-500",
    "from-pink-500",
];

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}


const Header = ({ songNumber, type, name, imgRef }) => {
    const [color, setColor] = useState(colors[0]);


    useEffect(() => {
        setColor(randomColor());

    }, [])

    return (
        <div className={`flex items-end h-[30vw] min-h-[300px] max-h-[480px] bg-gradient-to-b to-transparent ${color} p-12`}>
            <Avatar />
            {imgRef && <img className="w-auto h-[90%] aspect-square object-cover shadow-lg shadow-black" src={imgRef} />}
            <div className="ml-5 space-y-2 lg:space-y-4">
                <p className="text-base lg:text-xl font-bold uppercase">{type}</p>
                <h1>{name}</h1>
                {songNumber && <p className="text-xs">{songNumber + (songNumber === 1 ? " Song" : " Songs")}</p>}
            </div>
        </div>
    )
}

export default Header
