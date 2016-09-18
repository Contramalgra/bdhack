import React from 'react';
import http from 'superagent';

class Post extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category: "Some category...",
			budget: "Some budget...",
			title: "The title...",
			body: "The body...",
			materials: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.addMaterial = this.addMaterial.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e){
		e.preventDefault();

		debugger;

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
    http.get('/topics/' + id)
		.end((err, res) => {
			this.setState({topics: res.body, filteredTopics: res.body});
    });
  }
	
	render() {
		return (
			<div className="main">
				<form onSubmit={this.handleSubmit}>
					<h3>{topic.title}</h3>
					<textarea name="category" value={topic.category} />
					<textarea name="budget" value={topic.budget} />
					<textarea name="body" value={topic.description} />
					<h4>Materials</h4><br />
				
					<button startComment>Comment</button><br />
					<div id="wrapper">
						<ul id="top">
							<li><a href="#one">One</a></li>
							<li><a href="#two">Two</a></li>
						</ul>
						<div class="commentBox" id="one">
							<p>One</p>
							<span><a href="#top">Close</a></span>
						</div>
						<div class="commentBox" id="two">
							<p>Two</p>
							<span><a href="#top">Close</a></span>
						</div>
					</div>

					<button>Submit</button><br />	
				</form>
			</div>
		);
	}
}

export default Post;