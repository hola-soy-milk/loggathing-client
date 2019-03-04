import React, { Component } from 'react';
import Prop from '../../interfaces/Prop';
import PropInput from '../../interfaces/PropInput';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class DateProp extends Component<PropInput, { date : Date }> {
  constructor(props : PropInput) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      date: new Date()
    });
  }

  async handleChange(date : Date) {
    await this.setState({
      date: date
    });
    this.props.handleChange(JSON.stringify(date))
  }

  render() {
    return <DatePicker className="input"
    selected={this.state.date}
    onChange={this.handleChange}
      />;
  }
}
