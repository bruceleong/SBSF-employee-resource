import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import './App.css';
import Routes from './Routes'
import AppDrawer from './AppDrawer'

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
  constructor(){
    super()

    this.state = {
      logged: true,
      open: false,
      authed: false,
  
    };

  }
  

  handleChange = (event, logged) => this.setState({logged: logged});
  handleClose = () => this.setState({ open: false });
  handleToggle = () => this.setState({ open: !this.state.open });



  render() {


    return (
      <div className="App">
        <HashRouter>
          <div>
            <AppDrawer
                open={this.state.open}
                handleClose={this.handleClose}
                handleToggle={this.handleToggle}
            />

            {/*<Toggle
              label="Logged"
              defaultToggled={true}
              onToggle={this.handleChange}
              labelPosition="right"
              style={{margin: 20}}
            />*/}
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
