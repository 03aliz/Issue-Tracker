import React , { Component } from 'react';
import classes from './SearchPage.module.css';
import Navigation from '../../components/Navigation/Navigation';
import SearchBar from  '../../components/SearchBar/SearchBar';
import Ticket from '../TicketsDisplay/Ticket/Ticket';
import Spinner from '../../components/UI/Spinner/Spinner';
import FullTicket from '../../components/FullTicket/FullTicket';
import firebase from '../../firebase';

const db = firebase.database();
const events = db.ref('tickets');

// loading indicator when searching done
// case sensitive search done
// if results are null display message done
// can search by ticket no done
// if ticket clicked show full ticket and can cancel done
// hide pencil icon done
// make ticket all same size done
// style search bar done
// add search to home page and when clicked go to search page done
// remove searchbar from navigation on search page done
// style search bar on home page done
// bug when reloading page and search query is still from home page
// bug when searching nothing
// bug when searching by capitlized title e.g Intranet
// filters



class SearchPage extends Component {


    state = {
        searchQuery : '',
        loading : false,
        tickets : null,
        firstSearch : false,
        showFullTicket : false,
        currentTicket : null,
        overlay : false,
        navSearchBar : false
    }


    componentDidMount = () => {

        // check if redirected from home page and then initialize a search function immediately
        if (this.props.location.state !== undefined) {
            this.setState({searchQuery : this.props.location.state.userSearch}, () => {
                const updatedState = {...this.state};

                // case senstive search query
                updatedState.searchQuery = updatedState.searchQuery.toLocaleLowerCase();
        
                // user has searched first time to prevent no result message showing up on initial page load
                updatedState.firstSearch = true;
        
                // is search query a number? convert to integer 
                if (!isNaN(this.state.searchQuery)) {
                    updatedState.searchQuery = parseInt(updatedState.searchQuery);
                }
        
                this.setState({
                    loading : true,
                });
        
                
                // allow to search for multiple orderbychild based on ticketno or title
                const query = !isNaN(this.state.searchQuery) ?  
                        events
                        .orderByChild('ticketNo')
                        .startAt(updatedState.searchQuery)
                        .endAt(updatedState.searchQuery)
                        .on('value', (snap) => {
                            updatedState.tickets = snap.val();
                            console.log('works');
                            updatedState.loading = false;
                            this.setState(updatedState);
        
                }) :     events
                         .orderByChild('title')
                         .startAt(updatedState.searchQuery)
                         .endAt(updatedState.searchQuery+'\uf8ff')
                         .on('value', (snap) => {
                             updatedState.tickets = snap.val();
                             updatedState.loading = false;
                             console.log(snap.val());
                             this.setState(updatedState);
                });
            })
        }
    }

    userInputHandler = (e) => {
        const updatedState = {...this.state};

        updatedState.searchQuery = e.target.value;

        this.setState(updatedState);
    }

    userSubmitHandler = (e) => {
        e.preventDefault();
        const updatedState = {...this.state};

        // case senstive search query
        updatedState.searchQuery = updatedState.searchQuery.toLocaleLowerCase();

        // user has searched first time to prevent no result message showing up on initial page load
        updatedState.firstSearch = true;

        // is search query a number? convert to integer 
        if (!isNaN(this.state.searchQuery)) {
            updatedState.searchQuery = parseInt(updatedState.searchQuery);
        }

        this.setState({
            loading : true,
        });

        
        // allow to search for multiple orderbychild based on ticketno or title
        const query = !isNaN(this.state.searchQuery) ?  
                events
                .orderByChild('ticketNo')
                .startAt(updatedState.searchQuery)
                .endAt(updatedState.searchQuery)
                .on('value', (snap) => {
                    updatedState.tickets = snap.val();
                    console.log('works');
                    updatedState.loading = false;
                    this.setState(updatedState);

        }) :     events
                 .orderByChild('title')
                 .startAt(updatedState.searchQuery)
                 .endAt(updatedState.searchQuery+'\uf8ff')
                 .on('value', (snap) => {
                     updatedState.tickets = snap.val();
                     updatedState.loading = false;
                     console.log(snap.val());
                     this.setState(updatedState);
        });

        
        
    } 

    showFullTicketHandler = (e, key) => {
        const updatedState = {...this.state};

        updatedState.currentTicket = updatedState.tickets[key];
        updatedState.showFullTicket = true;
        updatedState.overlay = true;

        this.setState(updatedState);
    }

    cancelFullTicketHandler = () => {
        this.setState({
            showFullTicket : false,
            overlay : false
        })
    }

    render () {

        const tickets = this.state.tickets !== null ? Object.keys(this.state.tickets).map((ticket) => {
            return <div className={classes.Ticket}>
                        <Ticket
                        key={ticket} 
                        title={this.state.tickets[ticket].title}
                        description={this.state.tickets[ticket].description}
                        id={this.state.tickets[ticket].ticketNo}
                        date={this.state.tickets[ticket].date}
                        shown={(e) => {this.showFullTicketHandler(e, ticket)}}
                        pencil={false}/>
                    </div>
            }) : this.state.firstSearch ? <h1>There are no results</h1> : null;

        const fullTicket = this.state.showFullTicket ? 
                            <FullTicket 
                            fullticket={this.state.showFullTicket}
                            show={this.state.overlay}
                            cancel={this.cancelFullTicketHandler}
                            ticketNo={this.state.currentTicket.ticketNo}
                            title={this.state.currentTicket.title}
                            description={this.state.currentTicket.description}
                            priority={this.state.currentTicket.priority}
                            status={this.state.currentTicket.status}
                            date={this.state.currentTicket.date}
                            /> : null;

        

        return (
            <div>
                <Navigation
                input={this.userInputHandler}
                search={this.userSubmitHandler}
                show={this.state.navSearchBar} />
                <SearchBar
                val = {this.state.searchQuery} 
                input={this.userInputHandler}
                search={this.userSubmitHandler} />
                <div className={classes.TicketsDisplay}>
                    {this.state.loading ? <Spinner /> : tickets}
                    {fullTicket}
                </div>
            </div> 
        )
    }
}

export default SearchPage;