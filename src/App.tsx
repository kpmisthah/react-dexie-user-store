import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Card,
  CardContent,
  CardMedia,
  CircularProgress, 
  Box, 
  CssBaseline,
  Alert,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Using Grid2 for MUI v6 compatibility
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import Dexie, { Table } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import axios from 'axios';

// --- Database Configuration (Dexie) ---
interface User {
  id?: number;
  uuid: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: string;
}

class UserDatabase extends Dexie {
  users!: Table<User>;

  constructor() {
    super('UserDatabase');
    this.version(1).stores({
      users: '++id, uuid' 
    });
  }
}

const db = new UserDatabase();

// --- Main Application Component ---
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Live Query: Automatically detects changes in IndexedDB and updates the view
  const users = useLiveQuery(() => db.users.toArray());

  // Initial Data Check
  useEffect(() => {
    const init = async () => {
      try {
        const count = await db.users.count();
        if (count === 0) {
          await refreshUsers();
        }
      } catch (err) {
        setError('Failed to load initial data');
      }
    };
    init();
  }, []);

  const refreshUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch 50 users from API
      const response = await axios.get('https://randomuser.me/api/?results=50');
      
      const newUsers: User[] = response.data.results.map((u: any) => ({
        uuid: u.login.uuid,
        name: {
          title: u.name.title,
          first: u.name.first,
          last: u.name.last,
        },
        email: u.email,
        picture: u.picture.large
      }));

      // 2. Clear existing DB and Add new users (Atomic Transaction)
      await db.transaction('rw', db.users, async () => {
        await db.users.clear();
        await db.users.bulkAdd(newUsers);
      });
      
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await db.users.delete(id);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <>
      <CssBaseline />
      
      {/* Top Application Bar */}
      <AppBar position="sticky" sx={{ bgcolor: '#2c387e' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            User Directory
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Live Counter Statement */}
            <Typography variant="subtitle1" sx={{ fontWeight: 500, bgcolor: 'rgba(255,255,255,0.15)', px: 2, py: 0.5, borderRadius: 2 }}>
              Total: {users?.length ?? 0}
            </Typography>
            
            {/* Refresh Button */}
            <Button 
              color="inherit" 
              variant="outlined" 
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
              onClick={refreshUsers}
              disabled={loading}
              sx={{ 
                borderColor: 'white', 
                textTransform: 'none',
                '&:hover': { borderColor: '#ddd', bgcolor: 'rgba(255,255,255,0.1)' } 
              }}
            >
              {loading ? 'Fetching...' : 'Refresh'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Container sx={{ py: 4 }} maxWidth="xl">
        
        {/* Error Handling */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {/* Loading State - Full Page Spinner when empty */}
        {loading && (!users || users.length === 0) ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: 2 }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" color="text.secondary">Fetching Users...</Typography>
          </Box>
        ) : (
          /* User Grid */
          <Grid container spacing={3}>
            {users?.map((user) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
                 <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    p: 2,
                    boxShadow: 3,
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                  }}>
                    <CardMedia
                      component="img"
                      sx={{ 
                        width: 100, 
                        height: 100, 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        mb: 2,
                        border: '3px solid #1976d2'
                      }}
                      image={user.picture}
                      alt={user.name.first}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 0 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {user.name.title} {user.name.first} {user.name.last}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </CardContent>
                    <Box sx={{ mt: 2, width: '100%' }}>
                      <Button 
                        variant="contained" 
                        color="error" 
                        fullWidth 
                        startIcon={<DeleteIcon />}
                        onClick={() => user.id && deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && users?.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 10,  borderRadius: 4, bgcolor: '#f5f5f5', p: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No users found
            </Typography>
            <Button variant="contained" onClick={refreshUsers} startIcon={<RefreshIcon />}>
              Load Users
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
