import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    Box,
    Chip,
    Stack,
} from "@mui/material";
import { DeleteOutlineRounded as DeleteIcon } from "@mui/icons-material";
import type { User } from "../interface/user.interface";

interface UserCardProps {
    user: User;
    onDelete: (id: string) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "visible",
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="260"
                    image={user.picture}
                    alt={user.name}
                    sx={{
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        objectFit: "cover",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        background:
                            "linear-gradient(to top, rgba(15,23,42,0.95), transparent)",
                        p: 3,
                        pt: 8,
                    }}
                >
                    <Typography variant="h6" component="div" color="white" fontWeight={700}>
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                        User ID: {user.id.slice(0, 8)}...
                    </Typography>
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                {/* Placeholder for more details if available */}
                <Stack direction="row" spacing={1} mb={1}>
                    <Chip
                        label="Active"
                        size="small"
                        color="success"
                        variant="outlined"
                    />
                    <Chip
                        label="Verified"
                        size="small"
                        color="info"
                        variant="outlined"
                    />
                </Stack>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(user.id)}
                    sx={{
                        borderRadius: 3,
                        borderWidth: "1.5px",
                        "&:hover": { borderWidth: "1.5px" },
                    }}
                >
                    Remove User
                </Button>
            </CardActions>
        </Card>
    );
}
