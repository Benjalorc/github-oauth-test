import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'redux/store';
import { requestAuthToken } from 'redux/slices/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));


const Authorizing = ({ code }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{

    dispatch(requestAuthToken(code));
  }, [code, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Authorizing
        </Typography>
        <CircularProgress color="primary" />
        <Typography component="h1" variant="h6">
          It's almost done...
        </Typography>
      </div>
    </Container>
  );
}

export default Authorizing;