"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Palet brand Umira Sinergi Global untuk komponen Material UI
const umiraTheme = createTheme({
    palette: {
        primary: { main: "#12808C", dark: "#0B3C49", light: "#1FB5B5", contrastText: "#fff" },
        secondary: { main: "#C98A1E", dark: "#B07614", light: "#E3B04B", contrastText: "#fff" },
        info: { main: "#2393C4", contrastText: "#fff" },
        warning: { main: "#D69628", contrastText: "#fff" },
        success: { main: "#16A06E", contrastText: "#fff" },
        error: { main: "#DC4C5C", contrastText: "#fff" },
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
