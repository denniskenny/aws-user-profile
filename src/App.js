import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, Analytics, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { getUserProfileElement } from './graphql/queries';
import { createProfileElement } from './graphql/mutations';
import { Container, Paper, FormGroup, FormControl, InputLabel, Input, FormHelperText, TextField, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import _ from 'lodash';

const theme = { spacing: 4};
Amplify.configure(awsconfig);
const profile = {};

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { user: { attributes: { email: "" } }, formValues : new Array() };
        Auth.currentAuthenticatedUser().then(user => {
          this.setState( {user: user });
        })
    }
    
    async componentWillMount() {
      try {
        const apiData = await API.graphql(graphqlOperation(getUserProfileElement))
        const profileItems = apiData.data.getUserProfileElement;
        if (profileItems) {
          this.setState({formValues: profileItems});
        }
      } catch (err) {
        console.log('error: ', err)
      }
    }

    InputList(props) {
      let inputs = props.inputs;
      if (!Array.isArray(inputs))
          inputs = _.values(inputs);
          
      let userInfo =  _.values(inputs[1]);
      
      
      console.log(userInfo) 
      
      if (typeof inputs !== 'undefined' && inputs.length > 0 ) {
      
        const listItems = userInfo.map((input) =>
          <FormControl key={input}>                
            <InputLabel htmlFor="my-input">{input}</InputLabel>
            <Input  id={input + `-input`} 
                    name={input}
                    aria-describedby={input + `-helper-text`}
                    value={input} 
                    //onchange={this.handleFormChange}
                    />
            <FormHelperText id="my-helper-text">{input} is <em>not</em> editable.</FormHelperText>
          </FormControl>
        );
        return (
          <FormGroup>{listItems}</FormGroup>
        );
      }
      return <Paper>No Preferences Stored.</Paper>;
    }
    
    handleFormChange(event){
       if (typeof event !== 'undefined') {
        this.setState({password: event.target.value});
       }
    }
    
    saveForm(){
      //API.graphql(graphqlOperation(createProfileElement, { input: { id: "27", name: "Padraig", user: "Padraig.OhIceadha@hmhco.com", value: "42" } }));
      console.log('mutate')
    }
    
    render() {
      const InputList = this.InputList;
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          
          <article>
          <Container>
            <Paper>
              <Paper aria-label={`Profile of ` + this.state.user.attributes.email}>{`Profile of ` + this.state.user.attributes.email}</Paper>
                <Paper>   
                    <form>
                      <InputList inputs={this.state.formValues} />
                      <FormGroup>
                        <Button variant="contained" className="primary-variant" onClick={this.saveForm}>Update Profile</Button>
                      </FormGroup>
                    </form>
                </Paper>
              </Paper>
           </Container>
           </article>
        </div>
    );
}
}

export default withAuthenticator(App, true);
