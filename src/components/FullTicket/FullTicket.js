import React from 'react';
import Spinner from '../UI/Spinner/Spinner';
import classes from './FullTicket.module.css';

const fullTicket = (props) => {

    // updating database entry on submit

    const propKeys = Object.keys(props);

    console.log(propKeys);

    const fullTicketEdit = props.spinner ? <Spinner tick={props.showtick} /> : (
        <form onSubmit={props.submit}>
            <h2>Ticket#{props.ticketNo}</h2>

            <div className={classes.InputWrapper}>
                <label>Title</label>
                <input type="text" className={classes.FormElem} 
                value={props.title} onChange={(e) => {props.change(e,propKeys[1])}} />
            </div>

            <div className={classes.InputWrapper}>
                <label>Description</label>
                <textarea className={classes.FormElem}
                value={props.description} onChange={(e) => {props.change(e,propKeys[2])}}   />
            </div>

            <div className={classes.InputWrapper}>
                <label>Priority</label>
                <select className={classes.FormElem} value={props.priority} onChange={(e) => {props.change(e,propKeys[3])}}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>

            <div className={classes.InputWrapper}>
                <label>Status</label>
                <select className={classes.FormElem} value={props.status} onChange={(e) => {props.change(e,propKeys[4])}}>
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Test</option>
                    <option>Review</option>
                </select>
            </div>

            <div className={classes.InputWrapper}>
                <label>Date</label>
                <input type="date" className={classes.FormElem}
                value={props.date} onChange={(e) => {props.change(e,propKeys[5])}} />
            </div>

            <div className={classes.InputWrapper}>
                <button type="submit" disabled={props.disabled}>Submit</button>
                <button onClick={props.edit}>Cancel</button>
            </div>
        </form>
    )

    const pencilIcon = props.pencil ? 
                      <span className={classes.PencilIcon} onClick={props.edit}></span> : null;

    const fullTicket =  (
        <React.Fragment>
            <h3 className={classes.TicketNo}>Ticket #{props.ticketNo}</h3>
            {pencilIcon}
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <table>
                <thead>
                    <tr>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.priority}</td>
                        <td>{props.status}</td>
                        <td>{props.date}</td>
                    </tr>
                </tbody>
            </table>
            <button className={classes.Cancel} onClick={props.cancel}>Cancel</button>
        </React.Fragment>
        
       
    ) 
    
    return(
    <div className={props.show ? classes.Overlay : null}>
        <div className={classes.TicketWrapper}>
            {props.fullticket ? fullTicket : fullTicketEdit}
        </div>  
    </div>
    )
    

}

export default fullTicket;