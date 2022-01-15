import { useEffect } from "react";
import useTest from "../lib/useTest"


const Test = () => {
    const [test, setTest] = useTest();

    useEffect(() => {
        console.log("test");
    }, [test])

    return (
        <button className="" onClick={() => setTest(prev => prev + 1)}>
            click me!
        </button>
    )
}

export default Test
