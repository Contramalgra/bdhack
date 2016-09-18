import React from 'react';
import http from 'superagent';
import {Link} from 'react-router';

const categories = [
  {name: 'Kitchen', value: 'kitchen'},
  {name: 'Bathroom', value: 'bathroom'},
  {name: 'Outdoors', value: 'outdoors'}
];

class MainTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       topics: [],
       filteredTopics: [],
       filterCategory: ''
    }
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    http.get('/topics')
      .end((err, res) => {
        this.setState({topics: res.body, filteredTopics: res.body});
      });
  }

  filter(e) {
    const value = e.target.value;
    let filtered;
    if (!value) {
      filtered = this.state.topics;
    }
    else {
      filtered = this.state.topics.filter(topic => topic.category === value);
    }
    this.setState({filterCategory: value, filteredTopics: filtered});
  }
	
	render() {
		return (
      <div className="main">
        <select onChange={this.filter} value={this.state.filterCategory}>
          <option value="">All</option>
          {categories.map(category => <option key={category.value} value={category.value}>{category.name}</option>)}
        </select>
  			<table>
  				<thead>
  					<tr>
  						<th>Title</th>
							<th>Category</th>
  						<th>Budget</th>
  					</tr>
  				</thead>
  				<tbody>
  					{this.state.filteredTopics.map(topic => 
              <tr key={topic._id}>
                <td><Link to={'/topics/' + topic._id + '/details'}>{topic.title}</Link></td>
                <td>{topic.category}</td>
                <td>{topic.budget}</td>
              </tr>
            )}
  				</tbody>
  			</table>
        <Link to={'/new-topic'}>New Topic</Link>
      </div>
		);
	}
}

export default MainTable;