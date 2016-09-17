

import React from 'react';

class MainTable extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
         header: "Header from state...",
         "content": "Content from state..."
      }
   }
	
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Discussion Topics</th>
						<th>Posts</th>
					</tr>
				</thead>
				<tbody>
					react here
				</tbody>
			</table>
		);
	}
}

export default App;