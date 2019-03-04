import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import CreatableSelect from "react-select/lib/Creatable";
import PropForm from "./ThingLogger/PropForm";
import Prop from "../interfaces/Prop";


const GET_THINGS = gql`
{
  things {
    id
    name
    props {
      kind
      value
    }
  }
}
`;

const SAVE_THING = gql`
mutation SaveThing($id: String, $name: String!) {
    saveThing(id: $id, name: $name) {
      id
      name
    }
}
`;

const SAVE_PROP = gql`
mutation SaveProp($id: String, $kind: String!, $value: String!, $thingId: String!) {
    saveProp(id: $id, kind: $kind, value: $value, thingId: $thingId) {
      id
      kind
      value
      thingId
    }
}
`;

interface Thing {
  id?: string;
  name: string;
  props?: Prop[];
}

interface State {
  selectedThing: Thing;
  isFirstRender: boolean;
  props: Prop[];
  availableThings?: Thing[];
}

export default class ThingLogger extends Component<any, State> {
  constructor(props : any) {
    super(props);
    this.thingSelected = this.thingSelected.bind(this);
    this.addPropFields = this.addPropFields.bind(this);
    this.loadThings = this.loadThings.bind(this);
    this.propChanged = this.propChanged.bind(this);
  }

  componentWillMount() {
    this.setState({isFirstRender: true, props: [], availableThings: []});
  }

  async thingSelected(selected : any, bla : any) {
    if (selected === null) {
      await this.setState({ ...this.state, props: [], selectedThing: {name: ""} });
    }
    else {
      let thing = this.state.availableThings.find((t : Thing) => {
        return t.id == selected.value;
      });
      if (thing === undefined) {
        thing = {name: selected.value, props: []}
      }
      await this.setState({ ...this.state, props: thing.props, selectedThing: thing  });
    }
  }

  addPropFields(e : any) {
    e.preventDefault();
    let props = [...this.state.props];
    props.push({
      kind: 'date',
      value: '',
    });
    this.setState({...this.state, props: props});
  }

  async propChanged(oldProp : Prop, newProp : Prop) {
    let index = this.state.props.indexOf(oldProp);
    let props = [...this.state.props];
    props[index] = newProp;
    await this.setState({...this.state, props: props});
  }

  loadThings(things: Thing[]) {
    if(this.state.isFirstRender) {
      this.setState({...this.state, availableThings: things, isFirstRender: false});
    }
  }

  render() {
    return <Query query={GET_THINGS} onCompleted={(data) => this.loadThings(data.things)}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;


        let options = data.things.map((thing : Thing) => {
          return {
            value: thing.id,
            label: thing.name
          }
        });

        return (
          <Mutation mutation={SAVE_THING}>
          {(addThing, { data }) => (
            <Mutation mutation={SAVE_PROP}>
            {(addProp, { data }) => (
              <form
              onSubmit={async (e) => {
                e.preventDefault();
                let result : any = await addThing({ variables: { name: this.state.selectedThing.name } });
                let thing = result.data.saveThing;
                this.state.props.forEach(async (prop : Prop) => {
                  await addProp({ variables: { kind: prop.kind, value: prop.value, thingId: thing.id } });
                });
                await this.setState({...this.state, isFirstRender: false});
              }}
              >
              <div className="field">
              <CreatableSelect
              isClearable
              onChange={this.thingSelected}
              options={options}
              />
              </div>
              { this.state.props.map((prop) => {
                return <div className="field"> <PropForm onChange={this.propChanged} prop={prop}/></div>
              })}
              <button className="button" disabled={this.state.selectedThing === undefined || this.state.selectedThing.name === ""} onClick={this.addPropFields}>Add prop</button>
              <button className="button" type="submit" disabled={this.state.selectedThing === undefined || this.state.selectedThing.name === ""}>Loggit</button>
              </form>
            )}
            </Mutation>
          )}
          </Mutation>
        );

      }}
      </Query>;
  }
}
