import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme ({
    palette:{
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiImageListItem:{
            styleOverrides:{
                root: {
                    ".hidden-button": {
                        display: "none"
                    },
                    ":hover .hidden-button": {
                        display: "flex"
                    }
                }
            }
        }
    }
});