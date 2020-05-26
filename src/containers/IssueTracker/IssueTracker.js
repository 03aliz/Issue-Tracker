import React, { Component } from 'react';
import axios from '../../axios-instance';
import CreateIssue from '../createIssueForm/CreateIssue';
import Navigation from '../../components/Navigation/Navigation'
import TitleBar from '../../components/UI/TitleBar/TitleBar';
import TicketsDisplay from '../TicketsDisplay/TicketsDisplay';
import FullTicket from '../../components/FullTicket/FullTicket';
import SkeletonTicket from '../../components/UI/SkeletonContainer/SkeletonContainer';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import Spinner from '../../components/UI/Spinner/Spinner';
import firebase from '../../firebase';
import { Redirect } from 'react-router-dom';

const ref = firebase.database().ref('tickets');

// loading indicator for full ticker done
// loading indicator for create issue done
// loading indictor when clicked on create issue to tell user it's been clicked done
// loading indicator and success tick when ticket has been submitted  or changed done
// general styleing to spruce up 
//  create issue form validation and add rules done
// edit issue form validation done
//canceling create issue form should go back like clicking off the form. at the moment it gives a tick. done
// search page?

export default class IssueTracker extends Component {

    state = {
        tickets: null,
        currentTicket: null,
        currentKey : null,
        showCreateIssue: false,
        overlay: false,
        fullTicket: true,
        ticketLoaded: false,
        error: false,
        spinner:false,
        tick:false,
        disableForm: false,
        userSearch : '',
        redirect : false,
        navSearchBar : true,
        // dummy text for skeleton loading
        skeletons : [
            'Not Started',
            'Not Started',
            'Not Started',
            'Not Started',
            'In Progress',
            'In Progress',
            'In Progress',
            'In Progress',
            'Test',
            'Test',
            'Test',
            'Test',
            'Review',
            'Review',
            'Review',
            'Review'
        ]
    }

    componentDidMount () {
        axios.get('/tickets.json')
        .then(response => {
            this.setState({tickets:response.data,}, () => {
            });
        }).catch((error) => {
            if (error) {
                this.setState({error : true});
            }
        })

        
    }


    createIssueHandler = () => {
        let updatedState = {...this.state};
        let updatedTickets = {...updatedState.tickets};

        let updatedIssue = !updatedState.showCreateIssue;
        
        this.setState({showCreateIssue: updatedIssue});


        ref.limitToLast(2).on('child_added', snapshot => {
            // when child is added to database updated tickets
            updatedTickets[snapshot.key] = snapshot.val();

            this.setState({
                tickets:updatedTickets, 
            });
        });
        
    }

    cancelCreateIssueHandler = () => {

        this.setState({showCreateIssue : false})
    }

    showFullTicketHandler = (event, key) => {
        const ticket = {
            ticketNo: this.state.tickets[key].ticketNo,
            title: this.state.tickets[key].title,
            description: this.state.tickets[key].description,
            priority: this.state.tickets[key].priority,
            status: this.state.tickets[key].status,
            date: this.state.tickets[key].date
        }

        this.setState({
            currentTicket : ticket,
            fullTicket: true, 
            currentKey : key,
            overlay: true
        });
    }

    cancelFullTicketHandler = () => {

        this.setState({currentTicket: null, overlay: false});
    }

    editFullTicketHandler = () => {
       const updatedState = {...this.state};
       const updatedFullTicket = updatedState.fullTicket;

        this.setState({fullTicket:!updatedFullTicket})
    }

    onChangeEditFullTicketHandler = (e, key) => {
        const updatedState = {...this.state};
        const updatedCurrentTicket = {...updatedState.currentTicket};
        let isValid;

        updatedCurrentTicket[key] = e.target.value;
        isValid = this.isFormValidHandler(updatedCurrentTicket[key]);

        this.setState({
            currentTicket : updatedCurrentTicket,
            disableForm : !isValid
        });
    }

    editFullTicketSubmitHandler = (e, key) => {
        e.preventDefault();
        const updatedState = {...this.state};
        const updatedCurrentTicket = {...updatedState.currentTicket};
        
        // show spinner and then when promise resolved set spinner to false
         this.setState({spinner:true}, () => {

            firebase.database().ref().child('tickets/' + updatedState.currentKey).update(updatedCurrentTicket)
        .then(() => {
            const updatedState = {...this.state};
            const updatedTickets = {...updatedState.tickets};
            updatedTickets[updatedState.currentKey] = updatedCurrentTicket;

            this.setState({
                tickets : updatedTickets,
                tick:true
            }, () => {

                // get rid of tick and everything else after 1 second
                setTimeout(() => {
                    this.setState({
                        overlay: false,
                        fullTicket: false,
                        currentTicket: null,
                        tick: false,
                        spinner:false
                    });
                }, 1000);
            });

            })
            .catch((error) => {
                console.log(error.response);
            });

        });

        // on submit 
        

    }

    isFormValidHandler = (value) => {
        let isValid = false;

        isValid = value.trim() !== '';

        return isValid;
    }

    searchUserInputHandler = (e) => {
        const updatedState = {...this.state};

        updatedState.userSearch = e.target.value;

        this.setState(updatedState);
    }


    userSubmitRedirectHandler = (e) => {
        e.preventDefault();
        this.setState({redirect : true});

        console.log('works');
    }

    
    render () {
        
        const createIssue = this.state.showCreateIssue ? <CreateIssue cancel={this.cancelCreateIssueHandler} /> : null;

        const ticketsDisplay = this.state.tickets !== null ? <TicketsDisplay
        disable={this.state.showCreateIssue}
        overlay={this.state.overlay}
        tickets={this.state.tickets}
        show={this.showFullTicketHandler} />
         : <SkeletonTicket tickets={this.state.skeletons} />;

         const fullTicket = this.state.currentTicket !== null ? <FullTicket 
         ticketNo={this.state.currentTicket.ticketNo}
         title={this.state.currentTicket.title}
         description={this.state.currentTicket.description}
         priority={this.state.currentTicket.priority}
         status={this.state.currentTicket.status}
         date={this.state.currentTicket.date}
         show={this.state.overlay}
         spinner={this.state.spinner}
         fullticket = {this.state.fullTicket}
         showtick={this.state.tick}
         disabled={this.state.disableForm}
         cancel={this.cancelFullTicketHandler}
         edit={this.editFullTicketHandler}
         change={this.onChangeEditFullTicketHandler} 
         submit={this.editFullTicketSubmitHandler}
         pencil={true}/>
         : null;

         // redirect user to search page
          const redirectUser = this.state.redirect ? <Redirect to={{
                                                    pathname : "/search",
                                                    state : { userSearch : this.state.userSearch}
                                                    }} />: null;


        return(
            
            <div>
                <Navigation 
                input={this.searchUserInputHandler}
                submit={this.userSubmitRedirectHandler}
                show={this.state.navSearchBar} />
                <TitleBar show={this.createIssueHandler} spinner={this.state.spinner} />
                {ticketsDisplay}
                {fullTicket}
                {createIssue}
                <ErrorPage show={this.state.error}/>
                {redirectUser}
            </div> 
        )
    }
}