import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useParams, Redirect, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableContainer } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { auth, firebase, firestore } from '../firebase/firebase.config'
import swal from 'sweetalert';
import { DataGrid } from '@material-ui/data-grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarsIcon from '@material-ui/icons/Stars';
import {
  randomCreatedDate,
  randomUpdatedDate,
} from '@material-ui/x-grid-data-generator';

export default function MainPage() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home">
            <Main />
          </Route>
          <Route path="/" exact>
            <Login />  
          </Route>
        </Switch>
      </Router>
    </div>
  )
  
  function Main(props) {
    const [platforms, setPlatforms] = useState([]);
    const [comments, setComments] = useState([]);
    const getPlatforms = async () => {
      const data = await firestore.collection("platforms").get();
      setPlatforms(data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })))
    }
    const getComments = async () => {
      const data = await firestore.collection("comments").get();
      setComments(data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })))
    }
  useEffect(() => {
    getComments();
  }, [])
  useEffect(() => {
    getPlatforms();
  }, [])
    const [expanded, setExpanded] = React.useState(false);
    var user = firebase.auth().currentUser;
    var email, uid;
    if (user) {
    if (user != null) {
      email = user.email;
      uid = user.uid;
    }
    const columns = [
      { field: 'სახელი', width: 170 },
      { field: 'ლინკი', width: 170 },
      {
        field: 'აღწერა',
        valueGetter: (params) =>
          `${params.getValue(params.id, 'სახელი') || 'unknown'} - ${
            params.getValue(params.id, 'ლინკი') || 'x'
          }`,
        sortComparator: (v1, v2, param1, param2) =>
          param1.api.getCellValue(param1.id, 'ლინკი') -
          param2.api.getCellValue(param2.id, 'ლინკი'),
        width: 170,
      },
      { field: 'ლიმიტი', width: 170 },
      { field: 'ფასიანი', width: 170 },
    ];
    
    const rows = [
      {
        id: 1,
        სახელი: 'Google Classroom',
        ლინკი: 'https://edu.google.com/products/classroom/',
        აღწერა: 'Google Classroom არის უფასო ვებ – სერვისი, რომელიც Google– მა შექმნა სკოლებისთვის და მიზნად ისახავს დავალებების შექმნის, განაწილებისა და შეფასების გამარტივებას. Google Classroom- ის ძირითადი მიზანია მასწავლებლებსა და სტუდენტებს შორის ფაილების გაზიარების პროცესის გამარტივება. დადგენილია, რომ Google Classroom- ს 40-დან 100 მილიონამდე ადამიანი იყენებს.',
        ლიმიტი: 'არა',
        ფასიანი: 'არა',
      },
      {
        id: 2,
        სახელი: 'Google Meet',
        ლინკი: 'https://meet.google.com',
        აღწერა: 'Google Meet (ადრე ცნობილი როგორც Hangouts Meet) - ვიდეო – საკომუნიკაციო სერვისი, რომელიც Google– მა შექმნა. ეს არის ერთი ორი აპლიკაციიდან, რომელიც წარმოადგენს Google Hangouts- ის ჩანაცვლებას, მეორე არის Google Chat.',
        ლიმიტი: 'არა',
        ფასიანი: 'არა',
      },
      {
        id: 3,
        სახელი: 'Zoom',
        ლინკი: 'https://zoom.us',
        აღწერა: 'Zoom Video Communications, Inc. არის ამერიკული საკომუნიკაციო ტექნოლოგიური კომპანია, რომლის სათაო ოფისი მდებარეობს სან ხოსეში, კალიფორნია. ის გთავაზობთ სატელეფონო და ონლაინ ჩეთ სერვისებს პროგრამული პლატფორმის საშუალებით და გამოიყენება ტელეკონფერენციის, ტელეკომუნიკაციის, დისტანციური სწავლებისა და სოციალური ურთიერთობებისათვის.',
        ლიმიტი: 'კი',
        ფასიანი: 'კი',
      },
      
    ];
    
    const sortModel = [
      {
        field: 'ლიმიტი',
        sort: 'asc',
      },
    ];
    const styles = makeStyles({
      card: {
        display: 'flex',
      },
      cardDetails: {
        flex: 1,
      },
      cardMedia: {
        width: 160,
      },
      root: {
        width: '100%',
      },
    });
    const postsStyle = makeStyles((theme) => ({
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
    }));
    
    const classes = postsStyle();
    
    const addStarOne = async () => {
      const quantity = 1;
      const platformId = document.getElementById("platformId").value;
      await firestore.collection("one").doc(platformId).set({
      }).then(() => {
      })
    }
    const addStarTwo = async () => {
      const quantity = 1;
      const platformId = document.getElementById("platformId2").value;
      await firestore.collection("two").doc(platformId).set({
      }).then(() => {
      })
    }
    const addStarThree = async () => {
      const quantity = 1;
      const platformId = document.getElementById("platformId3").value;
      await firestore.collection("three").doc(platformId).set({
      }).then(() => {
      })
    }
    const addStarFour = async () => {
      const quantity = 1;
      const platformId = document.getElementById("platformId4").value;
      await firestore.collection("four").doc(platformId).set({
      }).then(() => {
      })
    }
    const addStarFive = async () => {
      const quantity = 1;
      const platformId = document.getElementById("platformId5").value;
      await firestore.collection("five").doc(platformId).set({
      }).then(() => {
      })
    }
    const addComment = async () => {
      const content = document.getElementById("content").value;
      const id = document.getElementById("platformIdComm").value;
      await firestore.collection("comments").doc(id).set({
          email: email,
          content: content,
      })
      .catch((error) => {
      });
    }
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
  const { post } = props;
    return (
        <div>
          <br />
          <div style={{ height: 400, width: '60%', margin: "auto" }}>
            <DataGrid sortModel={sortModel} rows={rows} columns={columns} />
          </div>
          <br />
          <br />
          <br />
          <br />
           { 
                 platforms.map((plat, index) => { 
               // if (plat.id == ) {
               //   firestore.collection('users').get().then(snap => {
              //     const size = snap.size
              //     console.log(size)
              //   });
              // }
               return ( 
                            <div className={classes.root}>
                              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                >
                                  <Typography className={classes.heading}>{plat.name}</Typography>
                                  <Typography className={classes.secondaryHeading}>{plat.link}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography style={{textAlign: "start"}}>
                                    {plat.description}
                                    <br />
                                    <br />
                                    <a href={plat.link} target="_blank">{plat.name}</a>
                                    <br />
                                    <br />
                                    <p>აქვს თუ არა ლიმიტი: <b>{plat.limit}</b></p>
                                    <p>არის თუ არა ფასიანი: <b>{plat.price}</b></p>
                                    <br />
                                    <br />
                                    <b><p>შეაფასეთ პლატფორმა 5 ბალიანი სისტემით:</p></b>
                                    <form action=""><Button style={{color: "gold"}} onClick={addStarOne}><StarsIcon /></Button><input type="hidden" id="platformId" value={plat.id}/></form>
                                    <form action=""><Button style={{color: "gold"}} onClick={addStarTwo}><StarsIcon /><StarsIcon /></Button><input type="hidden" id="platformId2" value={plat.id}/></form>
                                    <form action=""><Button style={{color: "gold"}} onClick={addStarThree}><StarsIcon /><StarsIcon /><StarsIcon /></Button><input type="hidden" id="platformId3" value={plat.id}/></form>
                                    <form action=""><Button style={{color: "gold"}} onClick={addStarFour}><StarsIcon /><StarsIcon /><StarsIcon /><StarsIcon /></Button><input type="hidden" id="platformId4" value={plat.id}/></form>
                                    <form action=""><Button style={{color: "gold"}} onClick={addStarFive}><StarsIcon /><StarsIcon /><StarsIcon /><StarsIcon /><StarsIcon /></Button><input type="hidden" id="platformId5" value={plat.id}/></form>
                                    <br />
                                    <p>დატოვეთ კომენტარი:</p>
                                    <form action="" style={{paddingLeft: "10%", paddingRight: "10%", height: "60px"}}>
                                      <label htmlFor=""><i>{email}</i></label>
                                      <br />
                                      <input type="hidden" id="platformIdComm" value={plat.id}/>
                                      <input type="hidden" value={email}/>
                                      <TextField style={{width: "90%"}} id="content" label="კომენტარი" variant="filled" /><Button style={{height: "100%"}} onClick={addComment}>გაგზავნა</Button>
                                    </form>
                                    <br />
                                    { 
                                      comments.map((comm, index) => { 
                                    if (plat.id == comm.id) {
                                      return ( 
                                        <>
                                          <div className="comments">
                                            <br />
                                            <br />
                                            <p><b>{comm.email}</b> - {comm.content}</p>
                                          </div>
                                        </>
                                      )
                                    }
                                  })
                                }
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <br />
                            </div>
                                  )
                                 })
                             }
        </div>
    )
  }
  else {
    return "თქვენ არ გაქვთ ამ გვერდზე წვდომა, დაბრუნდით მთავარ გვერდზე."
  }
  }
  function Login() {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
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
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    
  }));

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeIndex = (index) => {
      setValue(index);
    };
    const history = useHistory();
    const userPassAuth = () => {
      const email = document.getElementById("mail").value;
      const password = document.getElementById("pass").value;
      auth.signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        swal({
          title: "სისტემაში წარმატებულად შეხვედით!",
          icon: "success",
          dangerMode: true,
        })
        .catch((error) => {
          swal({
            title: "სისტემაში შესვლისას წარმოიშვა შეცდომა, გთხოვთ სცადოთ თავიდან.",
            icon: "error",
            dangerMode: true,
          })
        });
        history.push("/home");
      })
    }
  //   db.collection("cities").doc("LA").set({
  //     name: "Los Angeles",
  //     state: "CA",
  //     country: "USA"
  // })
    const userRegister = () => {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const id = document.getElementById("id").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        firestore.collection("users").doc(user.uid).set({
          firstName: firstName,
          lastName: lastName,
          id: id
        })
        swal({
          title: "რეგისტრაცია წარმატებით დასრულდა!",
          icon: "success",
          dangerMode: true,
        })
      })
      .catch((error) => {
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to leave this page?",
          icon: "warning",
          dangerMode: true,
        })
      });
      history.push("/home");
    }
    
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{minHeight: "100%"}}
          >
            <Tab label="შესვლა" {...a11yProps(0)} />
            <Tab label="რეგისტრაცია" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{minHeight: "100%"}}
        >
          <TabPanel value={value} index={0} dir={theme.direction} style={{height: "100%"}}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  შესვლა
                </Typography>
                <form className={classes.form} noValidate onSubmit={(event) => event.preventDefault()}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="mail"
                    label="ელ. ფოსტა"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="პაროლი"
                    type="password"
                    id="pass"
                    autoComplete="current-password"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={userPassAuth}
                  >
                    შესვლა
                  </Button>
                </form>
              </div>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  რეგისტრაცია
                </Typography>
                <br />
                <form className={classes.form} noValidate onSubmit={(event) => event.preventDefault()}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="სახელი"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="გვარი"
                        name="lastName"
                        autoComplete="lastname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="id"
                        label="პირადი ნომერი"
                        name="id"
                        autoComplete="id"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="ელ. ფოსტა"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="პაროლი"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={userRegister}
                  >
                    რეგისტრაცია
                  </Button>
                </form>
              </div>
            </Container>
          </TabPanel>
        </SwipeableViews>
      </div>
    );
  }
}