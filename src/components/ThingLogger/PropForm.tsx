import React, { Component } from 'react';
import Prop from '../../interfaces/Prop';
//import DateProp from './DateProp';

interface Input {
  prop: Prop;
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
    //component: <DateProp/>
  },
]

export default class PropForm extends Component<Input> {
  render() {
    return <div>
      <label>
      Kind:
    <select name="thing" >
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
