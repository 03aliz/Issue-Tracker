import React, { Component } from 'react';
import Input from '../../components/Form/input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from '../createIssueForm/CreateIssue.module.css';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import axios from '../../axios-instance';


// need to validate form

class CreateIssue extends Component {

    state = {

       inputData: {

        input: {
            type: 'input',
            typeConfig: {
                type: 'text',
                label: 'Title',
                name: 'title'
            },
            value: '',
            validation : {

            },
            isValid : false
        },
        
        textarea: {
            type: 'textarea',
            typeConfig: {
                label: 'Description',
                name: 'description'
            },
            value: '',
            validation : {
                
            },
            isValid : false
        },

        select: {
            type: 'select',
            typeConfig: {
                options: ["Select an option","High", "Medium", "Low"],
                label: 'Priority',
                name: 'priority'
            },
            value: '',
            validation : {
                select: true
            },
            isValid : false
        },

        select2: {
            type: 'select',
            typeConfig: {
                options:["Select an option", "Not Started", "In Progress", "Test", "Review"],
                label: 'Status',
                name: 'status'
            },
            value: '',
            validation : {
               select:true
            },
            isValid : false
        },

        input2: {
            type: 'input',
            typeConfig: {
                type: 'date',
                label: 'Date',
                name: 'date'
            },
            value: '',
            validation : {
                
            },
            isValid : false
        }

       }, 
       
        spinner:false,
        error: false,
        tick:false,
        disableForm: true

    }



    // setup 2 way binding so state is updated when user types
    userInputHandler = (event, key) => {
        // shallow copy
        let updatedState = {...this.state.inputData};
        // deep copy
        let updatedInput = {...updatedState[key]}
         updatedInput.value = event.target.value;
         updatedInput.isValid = this.isFormValidHandler(updatedInput.value, updatedInput.validation);
         updatedState[key] = updatedInput;

         let formIsValid = true;

         for(let inputIdentifier in updatedState) {
             formIsValid = updatedState[inputIdentifier].isValid && formIsValid;
         }

        this.setState({
            inputData:updatedState,
            disableForm: !formIsValid
        });

    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        this.setState({spinner:true})
        
        // assign ticketNo with latest child in firebase
        axios.get('/tickets.json')
        .then(response => {
            const updatedState = {...this.state.inputData};
            // inialize ticket no
            const ticket = {ticketNo : 1};
            const responseSize = Object.keys(response.data).length;

            // response is always 1 behind so add 1
            ticket.ticketNo = responseSize + 1;

            for(let formDataIdentifier in updatedState) {
                // e.g 'name:value'
                 ticket[updatedState[formDataIdentifier].typeConfig.name] = updatedState[formDataIdentifier].value;
            }

            
            // post form data
            axios.post('/tickets.json', ticket);

             // reset form
            for(let formDataIdentifier in updatedState) {

                updatedState[formDataIdentifier].value = '';

            }

            // reset controlled compenent i.e inputs
            this.setState({
                inputData:updatedState, 
                loading:false,
                tick:true
                }, () => {
                // form is not submitted when using onclick in jsx so have to use here to get rid of form
                // remove tick when loading has finished
                setTimeout(() => {
                    this.setState({tick:false});
                    this.props.cancel();
                }, 1000)
                
            });
       
        })
        .catch(error => {
            this.setState({error:true});
        })

         // reset uncontrolled components i.e select
         e.target.reset();
              
    }

    isFormValidHandler = (value, rules) => {
        let isValid = false;

        // is form element not empty? i.e does it have a value? isValid is then true
        isValid = value.trim() !== '';

        if(rules.select) {

            if(value === 'Select an option') {
                isValid = false;
            }
        }

        return isValid;

    }

    

    render () {

        let input = [];

        for(let i in this.state.inputData) {
            input.push(<Input key={i} 
                keyVal = {i}
                inputtype={this.state.inputData[i].type} 
                inputdata={this.state.inputData[i].typeConfig} 
                val={this.state.inputData[i].value}
                change={(event) => this.userInputHandler(event, i)} 
                />)
        }




        return (
            <React.Fragment>  
                <ErrorPage show={this.state.error}/>          
                        <div className={classes.Overlay}></div>
                        <div className={classes.FormWrapper}>
                            {this.state.spinner || this.props.spinner ? <Spinner tick={this.state.tick} /> :
                            <React.Fragment>
                                <h2>Create new issue</h2>
                                <form onSubmit={(e) => this.onSubmitHandler(e)}>
                                    {input}
                                    <div>
                                        <button disabled={this.state.disableForm} type="submit">Submit</button>
                                        <button onClick={this.props.cancel}>Cancel</button>
                                    </div>
                                </form>
                            </React.Fragment>}
                        </div>           
            </React.Fragment>
           
        )
    }
}

export default CreateIssue;