import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import './App.css';
import Routes from './Routes'
<<<<<<< HEAD
import { db } from '../config/constants';
import AppDrawerLoggdedOut from './AppDrawerLoggedOut';
import AppDrawerLoggdedIn from './AppDrawerLoggedIn';

import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
=======
import AppDrawer from './AppDrawer'
>>>>>>> master

// Material UI
import AppBar from 'material-ui/AppBar';

import { HashRouter } from 'react-router-dom';



// class Login extends Component {
//   static muiName = 'FlatButton';

//   render() {
//     return (
//       <FlatButton {...this.props} label="Login" />
//     );
//   }
// }

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class App extends Component {
<<<<<<< HEAD
  state = {
    logged: true,
    open: false,
    authed: false,
    company: false
  };
=======
  constructor(){
    super()

    this.state = {
      logged: true,
      open: false,
      authed: false,
  
    };

  }
  
>>>>>>> master

  handleChange = (event, logged) => this.setState({logged: logged});
  handleClose = () => this.setState({ open: false });
  handleToggle = () => this.setState({ open: !this.state.open });



  render() {
<<<<<<< HEAD
    console.log(this.state, 'current state')
=======


>>>>>>> master
    return (
      <div className="App">
        <HashRouter>
          <div>
            <AppDrawerLoggdedOut
                open={this.state.open}
                handleClose={this.handleClose}
                handleToggle={this.handleToggle}
            />

            {
              !this.state.company
              ? <AppDrawerLoggdedOut
              open={this.state.open}
              handleClose={this.handleClose}
              handleToggle={this.handleToggle}
          />
          :<AppDrawerLoggdedIn
          open={this.state.open}
          handleClose={this.handleClose}
          handleToggle={this.handleToggle}
      />
            }
            <AppBar

              title="Side By Side Financials"
              onLeftIconButtonClick={this.handleToggle}
              // iconElementRight={this.state.logged ? <Logged /> : <Login />}
              style={styles.navBarStyle}
            />
            <div id="header">
            <h1 id="title">Employee Resource</h1>
            </div>
            <Routes />
          </div>
        </HashRouter>
        <br />
        <div id="footer">
        <p>Side by Side Financials LLC. 2018</p>
        </div>
      </div>
    );
  }
}

const styles = {
  navBarStyle: {
      backgroundColor: 'green',
  }
}

export default App
