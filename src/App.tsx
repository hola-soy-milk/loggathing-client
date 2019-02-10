import React, { Component } from 'react';
import logo from './logo.svg';

import { ApolloProvider } from "react-apollo";
import api from "./core/Api";
import ThingLogger from "./components/ThingLogger";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <ApolloProvider client={api}>
      <ThingLogger />
      </ApolloProvider>
      </div>
    );
  }
}

export default App;
