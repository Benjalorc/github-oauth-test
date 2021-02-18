import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { createOAuthAppAuth } from "@octokit/auth-oauth-app";

interface AppAuth {
  type: string,
  clientId: string,
  clientSecret: string,
  headers: {
    authorization: string
  }
}

const auth = createOAuthAppAuth({
  clientId: "b0af111fa670f5c709c8",
  clientSecret: "95389c8326fe033dcf8bc1e79f24dd70cb39aee2",
});

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Any Text
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  },
  gitHubLogin: {
    padding: 0,
    '& a': {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: 'bold'
    }
  }
}));

const GithubSvg = () => {

  return (
    <svg width="64" height="64" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 1C4.133 1 1 4.213 1 8.177c0 3.171 2.006 5.861 4.787 6.81.35.066.478-.155.478-.346 0-.17-.006-.621-.01-1.22-1.947.434-2.357-.962-2.357-.962-.319-.83-.778-1.05-.778-1.05-.635-.445.048-.437.048-.437.703.051 1.073.74 1.073.74.624 1.097 1.638.78 2.037.596.063-.463.244-.78.444-.959-1.554-.18-3.188-.797-3.188-3.547 0-.783.273-1.424.72-1.926-.072-.181-.312-.911.07-1.9 0 0 .586-.192 1.924.736A6.55 6.55 0 018 4.471a6.557 6.557 0 011.753.241c1.336-.928 1.923-.735 1.923-.735.382.988.142 1.718.07 1.9.448.5.72 1.142.72 1.925 0 2.757-1.638 3.364-3.197 3.542.251.221.475.66.475 1.329 0 .959-.009 1.733-.009 1.968 0 .193.127.416.482.346 2.78-.951 4.783-3.64 4.783-6.81C15 4.213 11.866 1 8 1z"></path></svg>
  )
}


const Login = () => {

  const classes = useStyles();
  const [loginUrl, setLoginUrl] = useState<string>("");

  useEffect(()=>{

    const authFlow = async () => {

      try {

        const appAuthentication: any  = await auth({
          type: "oauth-app",
        });

        const { clientId } = appAuthentication;
        const redirect_uri = "http://localhost:3000/authorizing";

        setLoginUrl(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}`);
      }
      catch(err){

        console.log(err);
      }

    }

    authFlow();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Button variant="contained" className={classes.gitHubLogin}>
          <Link
            color="inherit"
            href={loginUrl}>
            <GithubSvg /> Login with github
          </Link>
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;