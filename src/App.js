import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, Analytics, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { listProfileElements } from './graphql/queries';
import { createProfileElement } from './graphql/mutations';
import { TextField } from '@material-ui/core'

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
    
    async componentDidMount() {
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
    render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Welcome {this.state.user.attributes.email}
        <p>
          <TextField/>
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
      </header>
    </div>
    );
  }
}

export default withAuthenticator(App, true);
