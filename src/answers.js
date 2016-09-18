import React from 'react';
import BdProductInfo from './bdProductInfo';

export default class Answers extends React.Component {
  render() {
    return (
      <div>
        {this.props.answers.map(answer => (
          <div key={answer._id}>
            <BdProductInfo skus={answer.materials} />
            <p>{answer.body}</p>
          </div>
        ))}
      </div>
    )
  }
}