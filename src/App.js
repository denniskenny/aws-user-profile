import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, Analytics, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { listProfileElements } from './graphql/queries';
import { createProfileElement } from './graphql/mutations';
import { CssBaseline, Grid, Container, Paper, FormGroup, 
          FormControl, InputLabel, Input, FormHelperText, TextField, Button } from '@material-ui/core';
import { MuiThemeProvider, makeStyles, createMuiTheme} from '@material-ui/core/styles';

Amplify.configure(awsconfig);

const theme = createMuiTheme({
  spacing : 2,
  formgroup : { margin : 2}
});

const profile = {};
//API.graphql(graphqlOperation(createProfileElement, { input: { id: "27", name: "Padraig", user: "Padraig.OhIceadha@hmhco.com", value: "42" } }));

class App extends PureComponent {
  
    fixture = [
          {id: "3", name: "Discipline", user: "user123", value: "Physics"},
          {id: "3", name: "Name", user: "user123", value: "User Firstthree"},
          {id: "1", name: "disc", user: "user123", value: "science"},
          {id: "1", name: "theme", user: "user123", value: "night"},
          {id: "1", name: "lang", user: "user234", value: "EN"},
          {id: "27", name: "Padraig", user: "Padraig.OhIceadha@hmhco.com", value: "42"}];

    constructor(props) {
        super(props);
        this.state = { user: { attributes: { email: "" } } };
        Auth.currentAuthenticatedUser().then(user => {
          this.setState( {user: user });
        })
    }
    
    async componentWillMount() {
      try {
        const apiData = await API.graphql(graphqlOperation(listProfileElements))
        const profileItems = apiData.data.listProfileElements;
        if (profileItems) {
          this.setState({ profileItems: profileItems.items });
        }
      } catch (err) {
        console.log('error: ', err)
      }
    }
    
    mapProfile() {
      if(this.state.profileItems){
        console.log('mapping profile')
         var formValues = this.state.profileItems.map(field => ({ name: field.name, value: field.value }));
        return this.fixture;
        return formValues;
      }
        return this.fixture;
    }
    
    InputList(props) {
      const inputs = props.inputs;
      if (typeof inputs !== 'undefined') {
      
        const listItems = inputs.map((input) =>
          <FormControl key={input.name} className="formgroup">                
            <InputLabel htmlFor={input.name + `-input`}>{input.name}</InputLabel>
            <Input  id={input.name + `-input`} 
                    name={input.name}
                    aria-describedby={input.name + `-helper-text`}
                    value={input.value} 
                    //onchange={this.handleFormChange}
                    />
            <FormHelperText id={input.name + `-helper-text`}>{input.name} is <em>not</em> editable.</FormHelperText>
          </FormControl>
        );
        return (
          <Grid item xs="8"><FormGroup>{listItems}</FormGroup></Grid>
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
      console.log('mutate')
    }
    
    render() {
      const InputList = this.InputList;
      return (
        <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Paper>
          <Grid className="App" container spacing={8} direction="row">
             <Grid item xs="8">
              <img src={logo} className="App-logo" alt="logo" />
             </Grid>
            <Grid item xs="8">
              <Paper className="Welcome" 
                      aria-label={`Profile of ` + this.state.user.attributes.email}>
                {`Profile of ` + this.state.user.attributes.email}
              </Paper>
            </Grid>
            <InputList inputs={this.mapProfile()} />
            <Grid item xs="8">
              <FormGroup>
                <Button variant="contained" className="primary-variant" onClick={this.saveForm}>Update Profile</Button>
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>
        </MuiThemeProvider>
    );
}
}




/* Current Schema
{"data":
{"listProfileElements":
{"items":[
  {"id":"3","name":"Discipline","user":"user123","value":"Physics"},
  {"id":"3","name":"Name","user":"user123","value":"User Firstthree"},
  {"id":"1","name":"disc","user":"user123","value":"science"},
  {"id":"1","name":"lang","user":"user123","value":"ES"},
  {"id":"1","name":"theme","user":"user123","value":"night"},
  {"id":"1","name":"lang","user":"user234","value":"EN"},
  {"id":"5","name":"Discipline","user":"Padraig.OhIceadha@hmhco.com","value":"Physics"},
  {"id":"27","name":"Padraig","user":"Padraig.OhIceadha@hmhco.com","value":"42"},
  {"id":"6","name":"lang","user":"Padraig.OhIceadha@hmhco.com","value":"en-ie"},
  {"id":"1","name":"theme","user":"user456","value":"night"}
], "nextToken":null}
}}
*/

export default withAuthenticator(App, true);
