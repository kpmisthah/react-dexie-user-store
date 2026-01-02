
import { createTheme, alpha } from "@mui/material/styles";

// Premium Colors
const primaryColor = "#6366f1"; // Indigo
const secondaryColor = "#ec4899"; // Pink
const backgroundColor = "#0f172a"; // Slate 900
const surfaceColor = "#1e293b"; // Slate 800

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        background: {
            default: backgroundColor,
            paper: surfaceColor,
        },
        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: `linear-gradient(135deg, ${backgroundColor} 0%, #020617 100%)`,
                    minHeight: "100vh",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: alpha(surfaceColor, 0.7),
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${alpha(primaryColor, 0.1)}`,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: `0 12px 24px -10px ${alpha(primaryColor, 0.5)}`,
                        border: `1px solid ${alpha(primaryColor, 0.3)}`,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    boxShadow: `0 4px 12px ${alpha(primaryColor, 0.4)}`,
                    "&:hover": {
                        boxShadow: `0 8px 24px ${alpha(primaryColor, 0.6)}`,
                    },
                },
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});
