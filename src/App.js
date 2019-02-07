import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import api from "./core/API";
import ThingSelect from "./components/ThingSelect";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ApolloProvider client={api}>
            <ThingSelect />
          </ApolloProvider>
        </header>
      </div>
    );
  }
}

export default App;
