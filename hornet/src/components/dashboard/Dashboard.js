import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import BlockTimeChart from "./BlockTimeChart";
import BlockHeight from "./BlockHeight";
import BlockCreated from "./BlockCreated";
import NodeLocation from "./NodeLocation";
import Nodes from "./Nodes";
import LogFile from "./LogFile";
import logo from "../../d.svg";
import { connect } from "react-redux";
import NetLatencyChart from "./NetLatencyChart";
import CPUChart from "./CPUChart";
import MemChart from "./MemChart";
import DiskChart from "./DiskChart";
import HighestBlockChart from "./HighestBlockChart";
import {
  lastNodeUpdateSelector,
  getCurrentBlockInfo,
  getCPUMetrics,
  getNetMetrics,
  getLogMetrics,
  getMemoryMetrics,
  getDiskMetrics,
  getBlockTime,
  getNodeLocations,
  getHighestScore
} from "../../redux/selectors";

const logify = (text, { D }) => {
  return text
    .toUpperCase()
    .split(/(D)/g)
    .map(item =>
      item !== "D" ? item : <img src={logo} alt="D for Dusk" className={D} />
    );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © 2019 Dusk Network B.V. All Rights Reserved."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  D: {
    height: ".95em",
    marginRight: ".4em",
    paddingTop: 1,
    alignSelf: "center"
  },
  title: {
    fontFamily: "Lato",
    textTransform: "uppercase",
    letterSpacing: ".5em",
    flexGrow: 1,
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

function Dashboard({
  items,
  block,
  blockTime,
  net,
  disk,
  memory,
  log,
  score,
  cpu
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {logify("Dashboard", classes)}
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.paper}>
                <BlockHeight height={block.height} hash={block.hash} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper className={classes.paper}>
                <BlockCreated timestamp={block.timestamp} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={fixedHeightPaper}>
                <BlockTimeChart data={blockTime} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={fixedHeightPaper}>
                <NetLatencyChart data={net} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={fixedHeightPaper}>
                <CPUChart data={cpu} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={fixedHeightPaper}>
                <MemChart data={memory} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={fixedHeightPaper}>
                <HighestBlockChart data={score} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={fixedHeightPaper}>
                <DiskChart data={disk} />
              </Paper>
            </Grid>
            <Grid item xs={24} sm={12}>
              <Paper className={fixedHeightPaper}>
                <LogFile items={log} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Nodes items={items} />
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  block: getCurrentBlockInfo(state),
  items: lastNodeUpdateSelector(state),
  blockTime: getBlockTime(state),
  locations: getNodeLocations(state),
  score: getHighestScore(state),
  cpu: getCPUMetrics(state),
  log: getLogMetrics(state),
  net: getNetMetrics(state),
  disk: getDiskMetrics(state),
  memory: getMemoryMetrics(state)
});

export default connect(mapStateToProps)(Dashboard);