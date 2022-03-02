import {
    MenuList,
    Paper,
    Popper,
    Grow,
    ClickAwayListener,
    List,
    Popover,
} from "@mui/material";
import {
    useMemo,
    Children,
    cloneElement,
    createContext,
    useEffect,
} from "react";
import NestedItem from "./NestedItem";
import useMenu from "./useMenu";

export const MenuContext = createContext();

const CustomMenu = ({ ButtonElement, children, sx }) => {
    const { anchor, open, handleOpen, handleClose, handleListKeyDown } =
        useMenu();

    const btnProps = useMemo(
        () => ({
            id: "composition-button",
            "aria-controls": open ? "composition-menu" : undefined,
            "aria-expanded": open ? "true" : undefined,
            "aria-haspopup": "true",
            onClick: (e) => handleOpen(e),
        }),
        [open]
    );

    return (
        <>
            <ButtonElement btnProps={btnProps} />
            <Popper
                className="z-50"
                open={open}
                anchorEl={anchor}
                role={undefined}
                placement="bottom"
                transition
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                        <Paper sx={sx} elevation={4}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuContext.Provider
                                        value={{
                                            handleClose,
                                            menuOpen: open,
                                            sx,
                                        }}
                                    >
                                        {Children.map(children, (child) =>
                                            cloneElement(child, {
                                                onClick: (e) => {
                                                    const onClick =
                                                        child.props.onClick;
                                                    if (onClick) onClick();
                                                    handleClose(e);
                                                },
                                            })
                                        )}
                                    </MenuContext.Provider>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

CustomMenu.Nested = NestedItem;

export default CustomMenu;
