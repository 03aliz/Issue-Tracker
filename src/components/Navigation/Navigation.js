import React from 'react';
import NavLink from './NavLink/NavLink';
import SearchBar from '../SearchBar/SearchBar';
import classes from './Navigation.module.css';
import { Link } from 'react-router-dom';

const navigation = (props) => {

    return (
        <div className={classes.NavContainer}>
            <nav className={classes.Nav}>
                <h1>Zflow</h1>
                <ul>
                    <Link to="/"> <NavLink link="Home" /></Link>
                    <Link to="/"><NavLink link="Tickets" /></Link>
                    <NavLink link="Task" />
                </ul>
                {props.show ?  <SearchBar
                input={props.input}
                search={props.submit}
                home={props.show} /> : null }
               
            </nav>
        </div>
    )
}

export default navigation;