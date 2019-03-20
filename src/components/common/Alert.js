import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
	render(){
		const { type='primary', closable=true, visible=true } = this.props;
		let alertStyles = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
		const alertStyle =  alertStyles.indexOf(type) >=0 ? type : 'primary';
		
		return(
			visible && <div className={`alert alert-${alertStyle}`}>
				{ this.props.children }
				{ closable && <button type="button" className="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				}
			</div>
		)
	}
}

Alert.propTypes = {
	type: PropTypes.string,
	closable: PropTypes.bool,
}

export { Alert }