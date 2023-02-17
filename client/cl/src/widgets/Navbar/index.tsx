import React, {FC, PropsWithChildren, ReactNode, useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';

import { AccountCircle } from '@mui/icons-material';
import { AppBar, CssBaseline } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Loader } from '../../shared/Loader';

type ListType = {
  text: string;
  path: string;
  roles?: string[];
};

const list: ListType[] = [
  {
    text: 'Расписание',
    path: '/schedules'
  },
  {
    text: 'Профессоры',
    path: '/professors'
  },
  {
    text: 'Группы',
    path: '/groups'
  }
];

type NavbarProps = {
  children?: React.ReactElement; // 👈️ type children
};

export interface PropsS extends PropsWithChildren {}

export const Navbar: React.FC<PropsS> = ({children}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  // const { data: userRole, isLoading } = getUserRole();
  // const { data: user } = getCurrentUser();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }}>
                {list.map((page) => {
                  return (
                      <Button
                          key={page.text}
                          onClick={() => navigate(page.path)}
                          sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {page.text}
                      </Button>
                  );
                })}
              </Box>

              {/*<Box sx={{ flexGrow: 0 }}>*/}
              {/*  <Tooltip title={"(" + userRole + ") " + "Выйти"}>*/}
              {/*    <IconButton onClick={handleMenu} sx={{ p: 0 }}>*/}
              {/*      <AccountCircle style={{color: "#fff"}}/>*/}
              {/*    </IconButton>*/}
              {/*  </Tooltip>*/}
              {/*  <Menu*/}
              {/*      sx={{ mt: '50px' }}*/}
              {/*      id="menu-appbar"*/}
              {/*      anchorEl={anchorEl}*/}
              {/*      anchorOrigin={{*/}
              {/*        vertical: 'top',*/}
              {/*        horizontal: 'right',*/}
              {/*      }}*/}
              {/*      keepMounted*/}
              {/*      transformOrigin={{*/}
              {/*        vertical: 'top',*/}
              {/*        horizontal: 'right',*/}
              {/*      }}*/}
              {/*      open={Boolean(anchorEl)}*/}
              {/*      onClose={handleClose}*/}
              {/*  >*/}
              {/*    <Typography textAlign="center">{user?.username}</Typography>*/}
              {/*    <MenuItem onClick={onLogout}>*/}
              {/*      <Typography textAlign="center">Выйти</Typography>*/}
              {/*    </MenuItem>*/}
              {/*  </Menu>*/}
              {/*</Box>*/}
            </Toolbar>
          </Container>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
  );
}
