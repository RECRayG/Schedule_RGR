import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { Loader } from '../shared/Loader';
import { Navbar } from '../widgets/Navbar';

import { theme } from '../shared/theme';
export const RoleRoute: FC<{ roles: string[] }> = ({ roles = [] }) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Outlet />
      </Navbar>
    </ThemeProvider>
  );
};
