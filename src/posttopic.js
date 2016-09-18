import React from 'react';
import http from 'superagent';

class PostTopic extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category: "Some category...",
			budget: "Some budget...",
			title: "The title...",
			body: "The body...",
			materials: []
		}
	}

	componentDidMount() {
		http.get('/topics')
			.end((err, res) => {
        this.setState({topics: res.body});
		});
	}
	
	handleSubmit(e){
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
		this.refs.materials.value = "";
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			Title:<br>
			<input type="text" name="title" onChange={this.handleChange} value={this.state.title}/><br>
			<select onChange={this.handleChange} value={this.state.category}>
				<option value="kitchen">Kitchen</option>
				<option value="bathroom">Bathroom</option>
				<option value="outdoors">Outdoors</option>
			</select>
			Budget:<br>
			<input type="text" name="budget" onChnage={this.handleChange} value={this.state.budget}/><br>
			Body:<br>
			<input type="text" name="Body"><br>
			<ul className="materials">
				{this.state.materials.map((material, index) => <tr key={index}><td>{material}</td>)}
			</ul>

			<input type="text" name="material" ref="material"/><button type="btn" onClick={this.addMaterial}>Add</button><br>				
			
			<button>Submit</button><br>	
			</form>
		);
	}
}

export default PostTopic;