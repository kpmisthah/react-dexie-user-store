// import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  AppBar,
  Toolbar,
  Chip,
  Stack,
  Fade,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  RefreshRounded as RefreshIcon,
  DeleteOutlineRounded as DeleteIcon,
  PeopleAltRounded as PeopleIcon,
} from "@mui/icons-material";
import { useUsers } from "./hooks/useUsers";

export default function App() {
  const { users, loading, refreshUsers, deleteUser } = useUsers();

  return (
    <Box sx={{ minHeight: "100vh", pb: 10 }}>
      {/* 🔹 Glassmorphism Header */}
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
            onClick={refreshUsers}
            sx={{ px: 3 }}
          >
            Refresh List
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* 🔹 Stats Section */}
        <Box mb={5} display="flex" alignItems="center">
          <Typography variant="h4" fontWeight={700}>
            All Users
          </Typography>
          <Chip
            label={`${users.length} Active`}
            color="secondary"
            sx={{ ml: 2, fontWeight: 700, borderRadius: 2 }}
          />
        </Box>

        {/* 🔹 Main Content Area */}
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress size={60} thickness={4} color="primary" />
          </Box>
        ) : (
          <Fade in={!loading} timeout={800}>
            <Grid container spacing={3}>
              {users.map((user) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
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
                        <Typography
                          variant="h6"
                          component="div"
                          color="white"
                          fontWeight={700}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.7)"
                        >
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
                        onClick={() => deleteUser(user.id)}
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
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Container>
    </Box>
  );
}
