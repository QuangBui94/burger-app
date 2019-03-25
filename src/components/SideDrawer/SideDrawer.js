import React from 'react';
import Aux from 'react-aux';

import styles from './SideDrawer.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let classDrawer = [styles.SideDrawer, styles.Close];

    if (props.openDrawer) {
        classDrawer = [styles.SideDrawer, styles.Open]
    }
    return (
        <Aux>
            <BackDrop order={props.openDrawer} modalClosed={props.closeDrawer}/>
            <div className={classDrawer.join(' ')} onClick={props.closeDrawer}>
                <Logo 
                height='10%'
                padding='20px 35px'/>
                <NavigationItems 
                    link1={'My Burger'}
                    link2={'Orders'}
                    link3={'Sign Up'}/>
            </div>
        </Aux>   
    ) 
}

export default SideDrawer;