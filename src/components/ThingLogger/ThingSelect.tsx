import React, { Component } from 'react';
import CreatableSelect from "react-select/lib/Creatable";

interface Option {
  value: string;
  label: string;
}

interface Options {
  options: Option[];
}

export default class ThingSelect extends Component<Options> {
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
        return (
          <CreatableSelect
          isClearable
          onChange={this.handleChange}
          options={this.props.options}
          />
        );
  }
}
