import React from 'react';
import {useStyles} from '../App';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IntegrationDownshift from './SearchList';



//-----------------START OF SPOTIFY BACKEND SETUP--------------------
export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "690c30f6add5454c8a5660405b6b228c";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

  window.location.hash = "";

//-----------------END OF SPOTIFY BACKEND SETUP--------------------

const TopBar = ({ token, queuedTracks, forceUpdate }) => {
  const classes = useStyles();
  return(
  <AppBar position="fixed">
      <Toolbar>
              <IconButton edge="start" color="inherit">
              <MusicNoteIcon fontSize="large" />
              </IconButton>
              <Typography className={classes.title} variant="h6">
                PlayOurSong
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <IntegrationDownshift queuedTracks={ queuedTracks }  forceUpdate={ forceUpdate } />
              </div>    
              {!token && (
                <IconButton  href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`} edge="end" aria-label="account of current user" color="inherit">
                  <AccountCircle fontSize="small" />
                </IconButton>
              )}          
              
      </Toolbar>
    </AppBar>
  )
};

export default TopBar;
