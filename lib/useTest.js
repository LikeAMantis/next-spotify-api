
import { useEffect, useState } from "react";
const objTest = { number: 1 };

const useTest = () => {
    const [state, setState] = useState(1);
    const [obj, setObj] = useState(objTest)

    useEffect(() => {
        obj.number += 1;
    }, [obj]);
    return [obj, setObj]
}

export default useTest;