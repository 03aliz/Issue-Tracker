import React from 'react';
import Spinner from '../Spinner/Spinner';
import classes from './TitleBar.module.css';


const titleBar = (props) => {

    return (
        <React.Fragment>
            <div className={classes.TitleContainer}>
                <h2>Issue Tracker</h2>
                <h3 onClick={props.show}><span className={classes.Plus}>+</span> New Issue</h3>
            </div>
        </React.Fragment>
    )
}

export default titleBar;