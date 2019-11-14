import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, Analytics, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { listProfileElements } from './graphql/queries';
import { createProfileElement } from './graphql/mutations';
import { Container, Paper, FormGroup, FormControl, InputLabel, Input, FormHelperText, TextField, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = {
  spacing: 4,
};

Amplify.configure(awsconfig);

const profile = {};
//API.graphql(graphqlOperation(createProfileElement, { input: { id: "27", name: "Padraig", user: "Padraig.OhIceadha@hmhco.com", value: "42" } }));

class App extends PureComponent {
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
        //0: {id: "1", name: "discipline", user: "ea0d96b3-e64e-4908-a5b9-16b44a290466", value: "science"}
        var formValues = this.state.profileItems.map(field => ({ name: field.name, value: field.value }));
        console.log(formValues)
      }
      return formValues
    }
    
    
    InputList(props) {
      const inputs = props.inputs;
      if (typeof inputs !== 'undefined') {
      
        const listItems = inputs.map((input) =>
          <FormControl key={input.name}>                
            <InputLabel htmlFor="my-input">{input.name}</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" value={input.value}/>
            <FormHelperText id="my-helper-text">{input.name} is <em>not</em> editable.</FormHelperText>
          </FormControl>
        );
        return (
          <FormGroup>{listItems}</FormGroup>
        );
      }
      
      return <Paper>No Preferences Stored.</Paper>;
    }
    
    saveForm(){
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
                  <form>
                    <InputList inputs={this.mapProfile()} />
                    <FormGroup>
                      <Button variant="contained" className="primary-variant" onClick={this.saveForm}>Update Profile</Button>
                    </FormGroup>
                  </form>
               </Paper>
           </Container>
           </article>
        </div>
    );
}
}


/*
[
0: {id: "1", name: "discipline", user: "ea0d96b3-e64e-4908-a5b9-16b44a290466", value: "science"}
1: {id: "1", name: "lang", user: "ea0d96b3-e64e-4908-a5b9-16b44a290466", value: "ES"}
2: {id: "1", name: "theme", user: "ea0d96b3-e64e-4908-a5b9-16b44a290466", value: "day"}
3: {id: "3", name: "Discipline", user: "user123", value: "Physics"}
4: {id: "3", name: "Name", user: "user123", value: "User Firstthree"}
5: {id: "1", name: "disc", user: "user123", value: "science"}
6: {id: "1", name: "lang", user: "user123", value: "ES"}
7: {id: "1", name: "theme", user: "user123", value: "night"}
8: {id: "1", name: "lang", user: "user234", value: "EN"}
9: {id: "5", name: "Discipline", user: "Padraig.OhIceadha@hmhco.com", value: "Physics"}
10: {id: "27", name: "Padraig", user: "Padraig.OhIceadha@hmhco.com", value: "42"}
11: {id: "6", name: "lang", user: "Padraig.OhIceadha@hmhco.com", value: "en-ie"}
12: {id: "1", name: "theme", user: "user456", value: "night"}
]

*/

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

/* Proposed Schema
types (rich types)
query{ user: User/class: [Class]/contentRecommendationFreq: ContentRecommendationFreq/PersonalDevelopment/Frequency: PDSFrequency}
User{userAccount: UserAccount/language: [Language]}
UserAccount{
firstName: String!/lastName: String!/userName: String!/email: String!/password: String!}
Class {classroom: Classroom/ classGrade: String!/ discipline: Discipline}
Classroom {technologySupported: [ClassroomTechnology]/studentAccessToTech: AccessToTech}

enums (dropdowns)
Language{English/Spanish}
ClassroomTechnology{/Projector/School Computer/Printer/Personal Computer}
AccessToTech{Sometimes/Always/Never}
Discipline{Maths/Science/Reading}
ContentRecommendationFreq{Never/Modereate/Often}
PDSFrequency{Very_Little_Help/Some_Help/A_Lot_Of_Help}
*/

export default withAuthenticator(App, true);
