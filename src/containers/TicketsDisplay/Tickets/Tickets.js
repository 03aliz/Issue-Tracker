import React from 'react';
import classes from './Tickets.module.css';

const Tickets = (props) => {

    return (
        <div className={classes.Tickets}>
            <div className={classes.CategoryTitle}>
                <h4>{props.category}</h4>
            </div>
            {props.children}
        </div>
    )
}

export default Tickets;