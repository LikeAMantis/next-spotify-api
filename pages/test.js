import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

const test = () => {
    const [toggle, setToggle] = useState(true);

    return (
        <div className="">
            <div className={`flex gap-x-10`}>
                <LayoutGroup>
                    <motion.div
                        layout
                        className={`h-10 w-52 bg-blue-500 transition-opacity duration-500 ${
                            toggle
                                ? "opacity-100"
                                : "absolute select-none opacity-0"
                        }`}
                    >
                        Hello
                    </motion.div>
                    <motion.div
                        layout
                        className="h-10 w-32 bg-blue-500"
                    ></motion.div>
                    <motion.div
                        layout
                        className="h-10 w-32 bg-blue-500"
                    ></motion.div>
                </LayoutGroup>
            </div>
            <button onClick={() => setToggle(!toggle)} className="text-white">
                Click Me
            </button>
        </div>
    );
};

export default test;
