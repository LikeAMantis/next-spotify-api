import { useEffect, useState } from "react"

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        if (initValue) {
            localStorage.setItem(key, JSON.stringify(initValue));
        }
        // localStorage key exists already
        else if (!localStorage.getItem(key)) {
            setValue(JSON.parse(localStorage.getItem(key)));
        }
    }, []);

    function setStorage(value) {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    }

    return [value, setStorage]
}

export default useLocalStorage;