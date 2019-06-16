import React from 'react';

import styles from './Icon.module.css';

const Icon = (props) => {
    let classes = 'icon ion-ios-' + props.class;
    let iconClasses = [styles.Icon];
    if (props.disabled) {
        iconClasses.push(styles.IconDisable)
    }

    return (
        <div className={iconClasses.join(' ')} style={{display: 'block', marginBottom: '6px'}} onClick={props.click}>
            <i className={classes}></i>
        </div>
    )
}

export default Icon;