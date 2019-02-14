import React, { Component } from 'react';
import Prop from '../../interfaces/Prop';
//import DateProp from './DateProp';

interface Input {
  prop: Prop;
  onChange(oldProp: Prop, newProp: Prop): void;
}

interface PropKind {
  key: string;
  label: string;
  component: any;
}

const PropTypes : PropKind[] = [
  {
    key: 'date',
    label: 'Date',
    component: '',
  },
]

export default class PropForm extends Component<Input> {
  constructor(props : any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event : any) {
    this.props.onChange(this.props.prop, event.target.value);
  }

  render() {
    return <div>
      <label>
      Kind:
    <select name="thing" onChange={this.handleChange}>
      {PropTypes.map(propType => (
        <option key={propType.key} value={propType.key}>
          {propType.label}
        </option>
      ))}
      </select>
      </label>
      </div>;
  }
}
