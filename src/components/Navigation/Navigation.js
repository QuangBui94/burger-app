import React from 'react';

import styles from './Navigation.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawToggle';

const Toolbar = (props) => { 
    return (
            <header className={styles.Toolbar}>
                <DrawerToggle click={props.toggleDrawer}/>
                <Logo 
                    height='90%'
                    padding='8px'/>
                <nav className={styles.DesktopOnly}>
                    <NavigationItems />       
                </nav>   
            </header>
    )
}

export default Toolbar;