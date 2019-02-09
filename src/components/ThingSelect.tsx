import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CreatableSelect from "react-select/lib/Creatable";

const GET_THING_NAMES = gql`
{
  things {
    id name
  }
}
`;

interface Thing {
    id: string;
    name: string;
}

export default class ThingSelect extends Component {
  constructor(props : any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue: any, actionMeta: any) {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  render() {
    return <Query query={GET_THING_NAMES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        let options = data.things.map((thing : Thing) => {
          return {
            value: thing.id,
            label: thing.name,
          }
        });

        return (
          <CreatableSelect
          isClearable
          onChange={this.handleChange}
          options={options}
          />
        );
      }}
      </Query>
  }
}
