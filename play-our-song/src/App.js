import React, { useEffect, useState } from 'react';
import Queue from './components/Queue';
import TopBar from './components/TopBar';
import { fade,makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


//-----------------START OF SPOTIFY BACKEND SETUP--------------------


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

console.log(window.location.hash);

//-----------------END OF SPOTIFY BACKEND SETUP--------------------

export const useStyles = makeStyles(theme => ({
  
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '200',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 800,
    },
  },
  queue: {
    margin: theme.spacing(10, 0, 0, 0),
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
  },
  inline: {
    display: 'inline',
  },
}));

const useForceUpdate = () => {
  const [value, set] = useState(true);
  return () => {
    console.log('Force updating...')
    set(value=> !value);
  };
}

const App = () =>  {
  const classes = useStyles();
  // const [allTracks, setAllTracks] = useState({});
  const [queuedTracks, setQueuedTracks] = useState([]);
  const forceUpdate = useForceUpdate();
  const [tokens, setTokens] = useState();

  // useEffect(() => {
  //   const fetchTracks = async () => {
  //     const response = await fetch('./data/tracks.json');
  //     const json = await response.json();
  //     // setAllTracks(json);
  //   };
  //   fetchTracks();
  // }, []);
  useEffect(() => {
    setQueuedTracks(queuedTracks);
    // Set token
    let _token = hash.access_token;
    console.log("hello");
    if (_token) {
      // Set token
      // this.setState({
      //   token: _token
      // });
      setTokens(_token);
      console.log(_token);
    }
  }, []);


  return(
  <React.Fragment>
  <TopBar token = { tokens } queuedTracks={ {items: queuedTracks, setItems: setQueuedTracks } } forceUpdate={ forceUpdate } className={classes.grow } />
  <Container maxWidth="md" >
    <Queue tracks={ queuedTracks } />
  </Container>
  </React.Fragment>

);}


export default App;
