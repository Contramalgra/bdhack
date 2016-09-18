import React from 'react';
import http from 'superagent';

class PostTopic extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category: "",
			budget: "",
			title: "",
			body: "",
			materials: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.addMaterial = this.addMaterial.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getBDSkus(url) { // Extract BuildDirect SKUs from user-provided product URLs
		const rex = /[0-9]{8}/;
		return rex.exec(url)[0];
	}
	
	handleSubmit(e){
		e.preventDefault();
		
		const state = this.state;
		state.materials = state.materials.map(this.getBDSkus);

		http.post('/topics')
			.send(state)
			.end((err, res) => {
				if (err) {
					return window.alert('Something went wrong, sorry.');
				}
				window.location = `/topics/${res.body._id}/details`
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
			<div className="main">
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
					<input type="text" name="material" ref="material"/><button type="button" onClick={this.addMaterial}>Add Material</button><br />

					<button>Submit</button><br />	
				</form>
			</div>
		);
	}
}

export default PostTopic;