import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { theme } from '../shared/theme';
import { Navbar } from '../widgets/Navbar';

export const ProtectedRoute: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Outlet />
      </Navbar>
    </ThemeProvider>
  );
};
