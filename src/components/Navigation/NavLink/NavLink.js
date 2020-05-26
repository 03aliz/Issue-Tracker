import React from 'react';
import classes from './NavLink.module.css';

const navLink = (props) => {

    return (
        <React.Fragment>
            <a href="#"><li className={classes.Link}>{props.link}</li></a>
        </React.Fragment>
    )
}

export default navLink;