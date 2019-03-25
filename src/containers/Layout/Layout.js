import React, { Component } from 'react';
import Aux from 'react-aux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Navigation';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        DrawerStatus: false
    }

    toggleDrawerHandler = () => {
        this.setState(prevState => {
            return {DrawerStatus: !prevState.DrawerStatus}
        })
    }

    render() {
        return (
            <Aux>
            <SideDrawer openDrawer={this.state.DrawerStatus} closeDrawer={this.toggleDrawerHandler}/>
            <Toolbar toggleDrawer={this.toggleDrawerHandler}/>
            <main className={styles.Content}>{this.props.children}</main>
        </Aux>
        )
    }
}

export default Layout;
