import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
          'html, body, #root': { margin: 0, padding: 0, width: '100%', maxWidth: '100%' },
        }}
      />

      {/* الـ Navbar مثبت دائماً في أعلى الشاشة */}
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: '64px',
            // مسافة مريحة للعين من اليمين واليسار تتجاوب مع أحجام الشاشات
            px: { xs: 2, sm: 3, md: 4 },
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* قسم الشعار والاسم مع مسافة داخلية متناسقة */}
          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              userSelect: 'none',
            }}
          >
            <AdbIcon
              sx={{
                fontSize: '1.9rem',
                mr: 0.75,
                transform: 'translateY(-1.5px)',
                display: 'block',
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontSize: '1.45rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                lineHeight: 1,
                display: 'inline-block',
              }}
            >
              MR
            </Typography>
          </Box>

          {/* قسم الأفاتار وقائمة المستخدم */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;