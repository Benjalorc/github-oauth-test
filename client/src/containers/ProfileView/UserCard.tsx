import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    borderRadius: '50%',
    width: 'auto',
    margin: '1rem auto'
  },
});

const UserCard = ({ user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        className={classes.media}
        image={user.avatar_url}
        title="Github User"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {user.login}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {user.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <AccountTreeIcon /> Public Repositories: {user.public_repos}
      </CardActions>
    </Card>
  );
}

export default UserCard;