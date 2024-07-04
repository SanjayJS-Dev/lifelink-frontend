import { createTheme } from "@mui/material";

const MUITheme = createTheme({

    typography: {
        fontFamily: 'inherit',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'inherit',
                },
            },
        },
        // Override all components' typography using a common pattern
        MuiTypography: {
            defaultProps: {
                style: { fontFamily: 'inherit' },
            },
        },
        MuiButton: {
            defaultProps: {
                style: { fontFamily: 'inherit' },
            },
        },
        // ...apply to other components similarly if needed
    },
    
})

export default MUITheme