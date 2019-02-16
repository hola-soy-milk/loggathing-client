import React, { Component } from 'react';
import Prop from '../../interfaces/Prop';
import DateProp from './DateProp';

interface Input {
  prop: Prop;
  onChange(oldProp: Prop, newProp: Prop): void;
}

interface PropKind {
  key: string;
  label: string;
  component: any;
}

interface State {
  propKind: PropKind;
}

export default class PropForm extends Component<Input> {
  readonly PropTypes: PropKind[] = [
    {
      key: 'date',
      label: 'Date',
      component: '',
    },
    {
      key: 'rating',
      label: 'Rating',
      component: '',
    },
  ];

  constructor(props : any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({propKind: this.PropTypes[0]});
  }

  handleChange(event : any) {
    let newProp = {...this.props.prop}
    newProp.kind = event.target.value;
    this.props.onChange(this.props.prop, newProp);
    if(this.PropTypes && Array.isArray(this.PropTypes)) {
      let propKind = this.PropTypes.find((kind) => {
        return kind['key'] == newProp.kind;
      })[0];
      this.setState({propKind: propKind});
    }
  }

  render() {
    return <div>
      <label>
      Kind:
    <select name="thing" onChange={this.handleChange}>
      {this.PropTypes.map(propType => (
        <option key={propType.key} value={propType.key}>
        {propType.label}
        </option>
      ))}
      </select>
      </label>
      <label>
      Value:
    </label>
      </div>;
  }
}
