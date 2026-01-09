import {
  Container,
  CircularProgress,
  Box,
  Chip,
  Fade,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useUsers } from "./hooks/useUsers";
import { useState } from "react";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import UserCard from "./components/UserCard";
import AppHeader from "./components/AppHeader";

export default function App() {
  const { users, loading, refreshUsers, deleteUser } = useUsers();
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmationId) {
      deleteUser(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: 10 }}>
      {/* 🔹 Glassmorphism Header */}
      <AppHeader onRefresh={refreshUsers} />

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
                  <UserCard user={user} onDelete={handleDeleteClick} />
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Container>

      <DeleteConfirmationDialog
        open={!!deleteConfirmationId}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
