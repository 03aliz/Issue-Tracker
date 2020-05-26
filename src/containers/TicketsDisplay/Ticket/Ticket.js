import React from 'react';
import classes from './Ticket.module.css';

const ticket = (props) => {

    // shorten title and description to fit in ticket container and add elipsis at end
    const title = props.title.split('').slice(0,12).join('') + '...';
    const description = props.description.split('').slice(0,20).join('') + '...';


    return (

        <div onClick={props.shown} className={classes.TicketContainer}>
            <p className={classes.ID}>Ticket #{props.id}</p>
            <h5>{title}</h5>
            <p className={classes.Description}>{description}</p>
            <p className={classes.Date}>{props.date}</p>
        </div>
    )
}

export default ticket;