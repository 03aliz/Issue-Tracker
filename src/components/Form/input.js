import React from 'react';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Input.module.css';


const input = (props) => {

    let inputElement = null;

    switch(props.inputtype) {
        case ('input'):
            inputElement = <input 
            onChange={props.change}
            className={classes.Input} 
            type={props.inputtype}
             value={props.val} 
             {...props.inputdata} />;
            break;

        case ('textarea'):
            inputElement = <textarea 
            onChange={props.change}
             className={classes.Input} 
             value={props.val} 
             {...props.inputdata} />;
            break;

        case ('select'):
            inputElement = <select onChange={props.change} className={classes.Input} {...props.typeData}>
                                <option>{props.inputdata.options[0]}</option>
                                <option>{props.inputdata.options[1]}</option>
                                <option>{props.inputdata.options[2]}</option>
                                <option>{props.inputdata.options[3]}</option>
                                <option>{props.inputdata.options[4]}</option>
                            </select>;
                            break;
        default: inputElement = <input {...props} />
    }

    
    return (
        <div className={classes.InputWrapper}>
                <label>{props.inputdata.label}</label>
                 {inputElement}
        </div>
    )
}

export default input;