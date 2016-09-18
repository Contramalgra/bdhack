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
	render() {
		return (
			<span>
				<form onSubmit={this.handleSubmit}>
					Title:<br />
					<input type="text" name="title" onChange={this.handleChange} value={this.state.title}/><br />
					<select onChange={this.handleChange} name="category" value={this.state.category}>
						<option value="kitchen">Kitchen</option>
						<option value="bathroom">Bathroom</option>
						<option value="outdoors">Outdoors</option>
					</select>
					Budget:<br />
					<input type="text" name="budget" onChange={this.handleChange} value={this.state.budget}/><br />
					Body:<br />
					<input type="text" name="body" onChange={this.handleChange} value={this.state.body} /><br />
					<ul className="materials">
						{this.state.materials.map((material, index) => <li key={index}>{material}</li>)}
					</ul>
					Materials
					<input type="text" name="material" ref="material"/><button type="button" onClick={this.addMaterial}>Add</button><br />

					<button>Submit</button><br />	
				</form>
			</span>
		);
	}
}

export default Post;