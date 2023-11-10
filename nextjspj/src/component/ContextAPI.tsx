import { Box, Typography } from "@mui/material"
import { createContext, useContext } from "react";

const themeDefault = { border: "10px solid green", margin: "10px", padding: "10px" };
const themeContext = createContext(themeDefault);

function Sub1() {
    const theme = useContext(themeContext)
    return (
        <themeContext.Provider value={{ border: "10px solid red", margin: "10px", padding: "10px" }}>
            <Box sx={theme}>
                <Typography variant="h3">
                    Sub1
                </Typography>
                <Sub2 />
            </Box >
        </themeContext.Provider>
    )
}

function Sub2() {
    const theme = useContext(themeContext)
    return (

        <Box sx={theme}>
            <Typography variant="h3" >
                Sub2
            </Typography>
            <Sub3 />
        </Box>

    )
}

function Sub3() {
    const theme = useContext(themeContext)
    return (
        <Box sx={theme}>
            <Typography variant="h3" >
                Sub3
            </Typography>
        </Box>
    )
}

export default function ContextAPI() {
    const theme = useContext(themeContext)

    return <>
        <Box component='div' sx={theme}>
            <Typography variant="h3" >
                Hello
            </Typography>
            <Sub1 />
        </Box>
    </>
}

