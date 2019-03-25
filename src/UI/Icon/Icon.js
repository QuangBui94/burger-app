import React from 'react';

import styles from './Icon.module.css';

const Icon = (props) => {
    let classes = 'icon ion-ios-' + props.class;
    return (
        <div className={styles.Icon}>
            <i className={classes}></i>
        </div>
    )
}

export default Icon;