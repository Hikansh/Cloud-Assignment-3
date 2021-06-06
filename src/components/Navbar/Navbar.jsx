import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Button
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';

import logo from '../../assets/commerce.png';
import useStyles from './styles';
import { authContext } from '../../Context/UserContext';

const PrimarySearchAppBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const auth = useContext(authContext);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          component={Link}
          to="/cart"
          aria-label="Show cart items"
          color="inherit"
        >
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="commerce.js"
              height="25px"
              className={classes.image}
            />{' '}
            Commerce.js
          </Typography>
          <div className={classes.grow} />
          {
            <div className={classes.button}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
              >
                <AccountCircleIcon />
              </IconButton>
              {auth.user ? (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      history.push('/dashboard');
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      auth.setUser(null);
                      history.push('/');
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      history.push('/login');
                      handleClose();
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push('/signup');
                      handleClose();
                    }}
                  >
                    Register
                  </MenuItem>
                </Menu>
              )}

              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
