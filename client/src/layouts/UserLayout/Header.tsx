import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useDispatch } from 'redux/store';
import { logoutUser } from 'redux/slices/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    exitButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'flex',
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(logoutUser());
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <AccountTreeIcon className={classes.exitButton} />
          <Typography className={classes.title} variant="h6" noWrap>
            Github User
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="logout"
              onClick={handleLogout}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;