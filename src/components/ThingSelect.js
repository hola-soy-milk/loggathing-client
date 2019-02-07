import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_THING_NAMES = gql`
{
  things {
    id
    name
  }
}
`;

export default class ThingSelect extends Component {
  render () {
    return <Query query={GET_THING_NAMES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <select name="thing" >
            {data.things.map(dog => (
              <option key={dog.id} value={dog.breed}>
                {dog.breed}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
  }
};
