import React from 'react';

class TabHeader extends React.PureComponent {

	render(){
		return(
			<a className={`nav-item nav-link ${this.props.active ? 'active' : ''}`}
				onClick={ this.props.onClick }
				role="tab">
				{this.props.children}
			</a>
		)
	}
}

export { TabHeader }