import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {
    PeopleAltRounded as PeopleIcon,
    RefreshRounded as RefreshIcon,
} from "@mui/icons-material";

interface AppHeaderProps {
    onRefresh: () => void;
}

export default function AppHeader({ onRefresh }: AppHeaderProps) {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(15, 23, 42, 0.7)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <Toolbar>
                <PeopleIcon sx={{ mr: 2, color: "primary.main", fontSize: 32 }} />
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: "-0.02em" }}
                >
                    User Directory
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={onRefresh}
                    sx={{ px: 3 }}
                >
                    Refresh List
                </Button>
            </Toolbar>
        </AppBar>
    );
}
