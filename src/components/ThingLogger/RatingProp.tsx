import React, { Component } from 'react';
import Rating from 'react-rating';
import Prop from '../../interfaces/Prop';
import PropInput from '../../interfaces/PropInput';

export default class RatingProp extends Component<PropInput, { rating : number }> {
  constructor(props : PropInput) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      rating: 3
    });
  }

  handleChange(rating : number) {
    this.setState({
      rating: rating
    });
  }

  render() {
    return <Rating
    initialRating={this.state.rating}
    onChange={this.handleChange}
      />;
  }
}
