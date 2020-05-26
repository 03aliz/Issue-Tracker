import React from 'react';
import classes from './SearchBar.module.css';


const searchBar = (props) => {   

    return (
        <div>
            <form onSubmit={(e) => {props.search(e)}}>
                <input value={props.val} className={props.home ? classes.HomeSearchBar : classes.SearchBar} type="search" placeholder="Search for a ticket" onChange={(e) => {props.input(e)}} />
                <button className={props.home ? classes.HomeSubmit : classes.Submit} type="submit"></button>
            </form>
        </div>
    )

}

export default searchBar;