import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CreatableSelect from "react-select/lib/Creatable";
import PropForm from "./ThingLogger/PropForm";
import Prop from "../interfaces/Prop";

const GET_THINGS = gql`
{
  things {
    id
    name
  }
}
`;

interface Thing {
  id: string;
  name: string;
}

interface State {
  selectedThing: Thing;
  props: Prop[];
}

export default class ThingLogger extends Component<any, State> {
  constructor(props : any) {
    super(props);
    this.thingSelected = this.thingSelected.bind(this);
    this.addPropFields = this.addPropFields.bind(this);
  }

  componentWillMount() {
    this.setState({props: []});
  }

  thingSelected(selected : any, bla : any) {
    let selectedThing = selected as Thing;
    this.setState({ ...this.state, selectedThing: selectedThing });
  }

  addPropFields(e : any) {
    e.preventDefault();
    let props = [...this.state.props];
    props.push({
      kind: '',
      value: '',
    });
    this.setState({...this.state, props: props});
  }

  render() {
    return <Query query={GET_THINGS}>
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
          <form>
            <CreatableSelect
            isClearable
            onChange={this.thingSelected}
            options={options}
            />
          { this.state.props.map((prop) => {
            return <PropForm prop={prop}/>
          })}
          <button onClick={this.addPropFields}>Add prop</button>
          </form>
        );

      }}
      </Query>;
  }
}
