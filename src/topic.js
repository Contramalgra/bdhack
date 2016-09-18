import React from 'react';
import http from 'superagent';

import BdProductInfo from './bdProductInfo';

class Topic extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topic: {}
		};

		this.handleChange = this.handleChange.bind(this);
		this.addMaterial = this.addMaterial.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e){
		e.preventDefault();

		http.post('/topics')
			.send(this.state)
			.end((err, res) => {
				if (err) {
					return window.alert('You suck');
				}
				window.alert('Yay!!!!')
			});
	}
	handleChange(e){
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	}
	addMaterial(){
		const materials = this.state.materials;
		materials.push(this.refs.material.value); 
		this.setState({materials});
		this.refs.material.value = "";
	}
	componentDidMount() {
    http.get('/topics/' + this.props.params.id)
			.end((err, res) => {
				this.setState({topic: res.body});
	    });
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
			
				<button className="startComment">Propose solution</button><br />
				<form onSubmit={this.handleSubmit}>
					
					<button>Submit</button>	
				</form>
			</div>
		);
	}
}

export default Topic;