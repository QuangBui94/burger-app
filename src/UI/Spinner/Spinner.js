import React from 'react';

import styles from './Spinner.module.css';

const Spinner = (props) => {
    let classSpinner = styles.Close;
    if (props.show) {
        classSpinner = styles.Loader;
    }

    return (
        <div className={classSpinner}>Loading...</div>
    )
}

    
export default Spinner;