import React from 'react';
import http from 'superagent';

import BdProductInfo from './bdProductInfo';
import AnswersForm from './answersForm';

class Topic extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topic: {},
			answers: []
		};

		this.addAnswer = this.addAnswer.bind(this);
	}
	
	componentDidMount() {
    http.get('/topics/' + this.props.params.id)
			.end((err, res) => {
				this.setState({topic: res.body});
	    });
  }
  addAnswer(answer) {
  	const answers = this.state.answers;
  	answers.push(answer);
  	this.setState({answers});
  }
	
	render() {
		return (
			<div className="main">
				<h3>{this.state.topic.title}</h3>
				<div>
					<h5>Category</h5>
					<p>{this.state.topic.category}</p>
				</div>
				<div>
					<h5>Budget</h5>
					<p>{this.state.topic.budget}</p>
				</div>
				<div>
					<h5>Description</h5>
					<p>{this.state.topic.body}</p>
				</div>
				<h4>Materials</h4>
				{this.state.topic.materials ? <BdProductInfo skus={this.state.topic.materials} /> : null}
				<br />
			
				<h5>Propose a solution</h5>
				<AnswersForm onNewAnswer={this.addAnswer} topicId={this.state.topic._id} />
			</div>
		);
	}
}

export default Topic;