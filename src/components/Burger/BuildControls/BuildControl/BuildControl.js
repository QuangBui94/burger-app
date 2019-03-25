import React from 'react';

import styles from './BuildControl.module.css';

const BuildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button 
                onClick={props.decrease} 
                className={styles.Less}
                disabled={props.disabled}>Less</button>
            <button onClick={props.increase} className={styles.More}>More</button>
        </div>   
    )
}

export default BuildControl;