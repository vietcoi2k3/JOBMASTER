import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import { Notifications, ArrowDropDown } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" className="bg-white shadow-none">
      <Toolbar className="flex justify-between">
        <h1 className="text-xl text-blue-600">JobMaster</h1>
        <div className="flex items-center">
          <IconButton>
            <Notifications />
          </IconButton>
          <IconButton>
            <Avatar alt="Pham Phuong" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <IconButton>
            <ArrowDropDown />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
