import React, { Component } from 'react';
import Prop from '../../interfaces/Prop';
import DateProp from './DateProp';
import RatingProp from './RatingProp';

interface Input {
  prop: Prop;
  onChange(oldProp: Prop, newProp: Prop): void;
}

interface PropKind {
  key: string;
  label: string;
  [key: string]: string;
}

const PropTypes : PropKind[] = [
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'rating',
    label: 'Rating',
  },
];

export default class PropForm extends Component<Input> {
  constructor(props : any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.componentForPropKind = this.componentForPropKind.bind(this);
  }

  componentWillMount() {
    this.setState({propKind: PropTypes[0]});
  }

  componentForPropKind(kind : string) {
    switch (kind) {
      case 'date':
        return <DateProp handleChange={this.handleValueChange} value={this.props.prop.value} />;
      case 'rating':
        return <RatingProp handleChange={this.handleValueChange} value={this.props.prop.value} />;
      default:
        return null;
    }
  }

  handleChange(event : any) {
    let newProp = {...this.props.prop}
    newProp.kind = event.target.value;
    this.props.onChange(this.props.prop, newProp);
    let propKind = PropTypes.find((kind : PropKind) => {
      return kind['key'] == newProp.kind;
    })[0];
    this.setState({propKind: propKind});
  }

  handleValueChange(value : string) {
    let newProp = {...this.props.prop}
    newProp.value = value;
    this.props.onChange(this.props.prop, newProp);
    this.setState({value: value});
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
      {this.componentForPropKind(this.props.prop.kind)}
      </div>;
  }
}
