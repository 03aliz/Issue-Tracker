import React, { Component } from 'react';
import classes from './TicketsDisplay.module.css';
import Tickets from './Tickets/Tickets';
import Ticket from './Ticket/Ticket';

const ticketsDisplay = (props) => {
    // categories
    const notStartedCat = [];
    const inProgressCat = [];
    const testCat = [];
    const reviewCat = [];
    // convert tickets props into array to map over
    const tickets = Object.keys(props.tickets).map(ticket => {
        switch (props.tickets[ticket].status) {
            case "Not Started":
                notStartedCat.push(<Ticket 
                     key={ticket}
                     id={props.tickets[ticket].ticketNo} 
                     title={props.tickets[ticket].title} 
                     description={props.tickets[ticket].description} 
                     date={props.tickets[ticket].date}  
                     shown={(event) => {props.show(event, ticket)}} />);
                break;

            case "In Progress":
                inProgressCat.push(<Ticket
                     key={ticket}
                     id={props.tickets[ticket].ticketNo}
                     title={props.tickets[ticket].title} 
                     description={props.tickets[ticket].description} 
                     date={props.tickets[ticket].date}
                     shown={(event) => {props.show(event, ticket)}}   />);
                break;

            case "Test":
                testCat.push(<Ticket
                     key={ticket}
                     id={props.tickets[ticket].ticketNo}
                     title={props.tickets[ticket].title} 
                     description={props.tickets[ticket].description} 
                     date={props.tickets[ticket].date} 
                     shown={(event) => {props.show(event, ticket)}}  />);
                break;

            case "Review":
                reviewCat.push(<Ticket
                     key={ticket}
                     id={props.tickets[ticket].ticketNo}
                     title={props.tickets[ticket].title} 
                     description={props.tickets[ticket].description} 
                     date={props.tickets[ticket].date}  
                     shown={(event) => {props.show(event, ticket)}} />);
                break;
        }   

    });

    return (
        <div className={props.disable || props.overlay ? classes.DisableScroll : classes.TicketsContainer}>
                <Tickets category="NOT STARTED"> 
                    {notStartedCat}
                </Tickets>
                <Tickets category="IN PROGRESS"> 
                    {inProgressCat} 
                </Tickets>
                <Tickets category="TEST"> 
                    {testCat}
                </Tickets>
                <Tickets category="REVIEW"> 
                    {reviewCat}
                </Tickets>
        </div>
    )
}


export default ticketsDisplay;
