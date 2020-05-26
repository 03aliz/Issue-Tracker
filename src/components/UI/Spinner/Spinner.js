import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => {

    return (
        <React.Fragment>
            {props.tick ? <div className={classes.Tick}><img src="/images/tick.svg" width="100" /></div> : <div className={classes.loader}></div>}
        </React.Fragment>
        
    ) 
}

export default spinner;