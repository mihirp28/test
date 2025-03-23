// src/components/NavigationBar.tsx
import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';
import { useFavorites } from '../context/FavoritesContext';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteIds, clearFavorites } = useFavorites();

  const handleLogout = async () => {
    try {
      await logout();
      clearFavorites(); // clear favorites when logging out
      navigate('/'); // redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        margin: 1,
        borderRadius: 8,
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: 2,
          }}
        >
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/brand-logo.png`}
            alt="Brand Logo"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          My Dog Finder
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => navigate('/search')}>
          Search Dogs
        </Button>
        <Button color="inherit" onClick={() => navigate('/favorites')}>
          Favorites ({favoriteIds.length})
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
