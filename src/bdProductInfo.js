import React from 'react';
import http from 'superagent';
import {map} from 'async';

export default class BdProductInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }
  
  componentDidMount() {
    map(this.props.skus, (sku, callback) => {
      http.get(`/api/products/${sku}`)
        .end((err, res) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, res.body);
        });
    }, (err, result) => {
      if (err) {
        return console.log('Error!');
      }
      this.setState({products: result});
    });
  }

  render() {
    return null;
  }
}