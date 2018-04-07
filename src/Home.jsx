import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
            <RaisedButton
            label="Drawer Test"
            onClick={this.handleToggle}
          />
          <Drawer open={this.state.open}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
                <h1>Hey Participant! Welcome to Employee Resource</h1>
                <p>where will i go</p>
                <br />
                <br />
                <Link to={'/About'}>About</Link>

                <p>super secret links</p>
                <Link to={'/Transamerica'}>Transamerica</Link>
                <br />
                <br />
                <Link to={'/Principal'}>Principal</Link>
            </div>
        )
    }
}
