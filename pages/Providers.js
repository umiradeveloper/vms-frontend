"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Palet brand Umira (teal + tembaga) untuk komponen Material UI
const umiraTheme = createTheme({
    palette: {
        primary: { main: "#0A5A70", dark: "#063B4A", light: "#2F8FA6", contrastText: "#fff" },
        secondary: { main: "#A65A2A", dark: "#8A4720", light: "#C98552", contrastText: "#fff" },
        info: { main: "#2A87A8", contrastText: "#fff" },
        warning: { main: "#D08A2E", contrastText: "#fff" },
        success: { main: "#2E8B6A", contrastText: "#fff" },
        error: { main: "#C8505A", contrastText: "#fff" },
    },
    shape: { borderRadius: 8 },
    typography: { fontFamily: "inherit", button: { textTransform: "none", fontWeight: 600 } },
});

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider theme={umiraTheme}>{children}</ThemeProvider>
        </SessionProvider>
    );
}
