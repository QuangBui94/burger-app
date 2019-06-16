import React from 'react';

import LogoBurger from '../../assets/Images/133 burger-logo.png';
import styles from './Logo.module.css';

const Logo = (props) => (
    <div className={styles.Logo} style={{height: props.height, padding: props.padding, backgroundColor: props.backgroundColor}}>
        <img src={LogoBurger} alt="MyBurger"></img>
    </div>
)

export default Logo;