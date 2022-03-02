import { useState } from "react";

const useMenu = () => {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const handleClose = () => {
        setAnchor(null);
    };

    const handleOpen = (e) => {
        setAnchor(e.target);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setAnchor(null);
        } else if (event.key === "Escape") {
            setAnchor(null);
        }
    }

    return {
        open,
        anchor,
        handleClose,
        handleOpen,
        handleListKeyDown,
    };
};

export default useMenu;
