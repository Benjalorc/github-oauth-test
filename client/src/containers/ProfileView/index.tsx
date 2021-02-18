import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';

import { useDispatch, useSelector } from 'redux/store';
import { loadUserData } from 'redux/slices/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    	marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'center'
    },
    textCenter: {
    	textAlign: 'center'
    }
  })
);

const ProfileView = () => {
  const classes = useStyles();

	const dispatch = useDispatch();
	const { user } = useSelector((state)=> state.auth);

	useEffect(()=>{
		dispatch(loadUserData());
	}, [dispatch]);

	return(
		<>
			<h1 className={classes.textCenter}>{user?.name || ""}</h1>
			<div className={classes.root}>
        <UserCard user={user} />
	    </div>
		</>
	)
}

export default ProfileView;