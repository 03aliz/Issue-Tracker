import React from 'react';
import classes from './ErrorPage.module.css';

const errorPage = (props) => {

    return (
        
        <div className={props.show ? classes.ErrorWrapper : classes.Hidden}>
            <img src="/images/cross.svg" width="80"></img>
            <h1>oops something went wrong!</h1>
            <h1>Check your Internet connection and reload the page</h1>
        </div>
    )
}

export default errorPage;