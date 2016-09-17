import React from 'react';
import http from 'superagent';

class MainTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       header: "Header from state...",
       content: "Content from state...",
       topics: []
    }
  }

  componentDidMount() {
    http.get('/topics')
      .end((err, res) => {
        this.setState({topics: res.body});
      });
  }
	
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Budget</th>
					</tr>
				</thead>
				<tbody>
					{this.state.topics.map(topic => <tr key={topic._id}><td>{topic.title}</td><td>{topic.budget}</td></tr>)}
				</tbody>
			</table>
		);
	}
}

export default MainTable;