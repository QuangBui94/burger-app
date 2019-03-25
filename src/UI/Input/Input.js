import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    let classInput = [styles.InputElement];
    if (props.invalid && props.touched) {
        classInput.push(styles.Invalid)
    }

    switch (props.elementtype) {
        case 'input':
        inputElement = <input 
                        className={classInput.join(' ')} 
                        {...props.elementconfig} 
                        value={props.value} 
                        onChange={props.changed}/>
            break;

        case 'textarea':
        inputElement = <textarea 
                        className={classInput.join(' ')} 
                        value={props.value}
                        onChange={props.changed}/>
            break;

        case 'select':
        inputElement = 
            <select className={classInput.join(' ')} value={props.value} onChange={props.changed}>
            {
                props.elementconfig.options.map(el => {
                    return (
                            <option key={el.value} value={el.value}>{el.display}</option>
                        )  
                })
            }
            </select>
            break;

        default:
        inputElement = <input 
                        className={classInput.join(' ')} 
                        value={props.value} 
                        onChange={props.changed}/>
            break;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;