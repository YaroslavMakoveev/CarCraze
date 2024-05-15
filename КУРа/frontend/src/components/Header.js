import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { ShoppingCart, AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import SearchBox from "./SearchBox";
import logo from "../logo.png";
import { logout } from "../redux/slices/userSlice";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#212121",

  },
  grow: {
    flexGrow: 1,
  },
  menuItem: {
    minWidth: 180,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  let history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    console.log("hi")
    handleMenuClose();
    history.push('/');
    window.location.reload(); // Reload the page

  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}  >
        <Toolbar>
          <Link to="/" className={classes.link}>
            <img
              src={logo}
              alt="CarCraze"
              style={{
                height: 60,
              }}
            />
          </Link>
          <div style={{ marginLeft: "5vw" }}>
            <SearchBox />
          </div>
          <div className={classes.grow} />

          <div>
            <IconButton
              aria-label="show cart items"
              color="inherit"
              component={Link}
              to="/cart"
              style={{ color: "white" }}
            >
              <ShoppingCart />
            </IconButton>
          </div>
          {console.log(userDetails)}
          {userDetails ? (
            <>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem
                  className={classes.menuItem}
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  Профиль
                </MenuItem>

                <MenuItem className={classes.menuItem} onClick={handleLogout}>
                  Выйти
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div>
              <IconButton
                aria-label="login"
                color="inherit"
                component={Link}
                to="/login"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
