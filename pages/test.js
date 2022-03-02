import { FavoriteOutlined } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import CustomMenu from "../components/CustomMenu/index";

var menuColor;
if (typeof window !== "undefined") {
    menuColor = getComputedStyle(document.body).getPropertyValue(
        "--menu-color"
    );
}

const test = () => {
    return (
        <div class="h-screen bg-gray-800">
            <CustomMenu
                sx={{
                    background: menuColor,
                    color: "white",
                }}
                ButtonElement={({ btnProps }) => (
                    <button {...btnProps} className="text-white">
                        Click Me
                    </button>
                )}
            >
                <MenuItem onClick={() => console.log("Profile clicked")}>
                    Profile
                </MenuItem>
                <MenuItem>My account</MenuItem>
                <CustomMenu.Nested
                    label="Nested Menu"
                    icon={<FavoriteOutlined fontSize="medium" />}
                >
                    <MenuItem>Profile</MenuItem>
                    <CustomMenu.Nested label="2x Nested Menu">
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                    </CustomMenu.Nested>
                </CustomMenu.Nested>
            </CustomMenu>
        </div>
    );
};

export default test;
