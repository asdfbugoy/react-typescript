import React from 'react';
import { Link } from 'react-router-dom';

class ConfiguratorSummaryComponent extends React.PureComponent{
	render(){
		return(
			<div className="container">
				<h2 className="museoMedium mb-4">Your configured profile</h2>
				<div className="mb-4">
					<i className="fas fa-building"></i> Office Premise &nbsp;&nbsp;
					<i className="fas fa-user-circle"></i> 250+ User &nbsp;&nbsp;
					<i className="fas fa-cubes"></i> 4 Floors &nbsp;&nbsp;
					<i className="fas fa-crop"></i> 500m+
				</div>
				<p><Link to="/">Change profile detail</Link></p>
			</div>
		)
	}
}

export default ConfiguratorSummaryComponent;