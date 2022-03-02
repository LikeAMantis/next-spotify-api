import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import useMenu from "./useMenu";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Children, cloneElement, useContext, useEffect } from "react";
import { MenuContext } from ".";
import { List } from "@mui/material";

const transformOrigin = {
    "left-start": "right top",
    "left-end": "right bottom",
    "right-start": "left top",
    "right-end": "left bottom",
};

export default function NestedItem({ children, label, icon }) {
    const { open, anchor, handleClose, handleOpen, handleListKeyDown } =
        useMenu();

    const {
        handleClose: menuHandleClose,
        menuOpen,
        sx,
    } = useContext(MenuContext);

    return (
        <MenuItem
            onMouseEnter={(e) => handleOpen(e)}
            onMouseLeave={handleClose}
            className="flex h-full w-full items-center justify-between text-left outline-none"
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => handleOpen(e)}
        >
            {icon}
            {label}
            <ArrowRightIcon fontSize="medium" />
            <Popper
                className="z-50"
                open={open && menuOpen}
                anchorEl={anchor}
                role={undefined}
                placement="right-start"
                transition
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: transformOrigin[placement],
                        }}
                    >
                        <Paper sx={sx} elevation={4}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {Children.map(children, (child) =>
                                        cloneElement(child, {
                                            onClick: (e) => {
                                                const onClick =
                                                    child.props.onClick;
                                                if (onClick) onClick();
                                                menuHandleClose(e);
                                            },
                                        })
                                    )}
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </MenuItem>
    );
}
