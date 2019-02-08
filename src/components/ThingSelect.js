import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Select from "react-select";

const GET_THING_NAMES = gql`
{
  things {
    id
    name
  }
}
`;

export default class ThingSelect extends Component {

  thingOptions (things) {
  }

  render () {
    return <Query query={GET_THING_NAMES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        let options = data.things.map(thing => {
          return {
            value: thing.id,
            label: thing.name,
          }
        });

        return (
          <Select options={options}>
          </Select>
        );
      }}
    </Query>
  }
};
