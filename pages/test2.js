import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { NestedMenuItem } from "mui-nested-menu/build/NestedMenuItem"
import { IconMenuItem } from 'mui-nested-menu/build/IconMenuItem';


export default function test2() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div>
            <Button variant='contained' onClick={handleClick}
            // endIcon={<ArrowDownIcon />}
            >
                Click Me!
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} className="bg-black">
                <NestedMenuItem
                    // leftIcon={<AdbIcon />}
                    // rightIcon={<FlutterDashIcon />}
                    label={'Top Level'}
                    parentMenuOpen={open}
                >
                    <MenuItem onClick={handleClose}>Standard Menu Item!</MenuItem>
                    <IconMenuItem
                        onClick={handleClose}
                        // leftIcon={<NewIcon />}
                        // rightIcon={<SaveIcon />}
                        label={'Icon Menu Item'}
                    />
                    <NestedMenuItem
                        // leftIcon={<AdbIcon />}
                        // rightIcon={<ArrowRightIcon />}
                        label={'Go deeper!'}
                        parentMenuOpen={open}
                        className="bg-gray-700"
                    >
                        <MenuItem
                            className="ml-10 bg-gray-700"
                            onClick={handleClose}>Standard Menu Item!
                        </MenuItem>
                        <IconMenuItem
                            onClick={handleClose}
                            // leftIcon={<NewIcon />}
                            // rightIcon={<SaveIcon />}
                            label={'Icon Menu Item'}
                        />
                    </NestedMenuItem>
                </NestedMenuItem>
            </Menu>
        </div>
    )
}