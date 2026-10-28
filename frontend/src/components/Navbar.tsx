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
    <AppBar 
      position="static" 
      elevation={2} 
      sx={{ 
        width: '100%', 
        m: 0, 
        p: 0 
      }}
    >
      <Toolbar 
        disableGutters 
        sx={{ 
          minHeight: '64px', 
          px: 0, // تصفير أي padding جانبي نهائياً
          m: 0,
          width: '100%'
        }}
      >
        {/* قسم اللوجو ملتصق بالحافة تماماً */}
        <Box
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
            userSelect: 'none',
            pl: 1, // مسافة صغيرة جداً للعين من الحافة (احذفها إذا أردت الالتصاق الصارم 0)
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

        {/* قائمة المستخدم والأفاتار ملتصقة بالطرف الآخر */}
        <Box sx={{ flexGrow: 0, pr: 1 }}>
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
  );
}

export default Navbar;