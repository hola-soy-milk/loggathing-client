import React, { Component } from 'react';
import logo from './logo.svg';

import { ApolloProvider } from "react-apollo";
import api from "./core/Api";
import ThingLogger from "./components/ThingLogger";
import 'bulma/css/bulma.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>Go ahead and <em>Loggathing</em>!</h1>
            <div className="App">
            <ApolloProvider client={api}>
            <ThingLogger />
            </ApolloProvider>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
