import React from 'react';
import PropTypes from 'prop-types';

class AddOnsCollapsible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false
		};
	}

	handleToggle(e) {
		e.preventDefault();
		this.setState({
			isExpanded: !this.state.isExpanded,
			height: this.refs.inner.clientHeight
		});
	}

	render() {
		const { title, subtitle, children } = this.props;
		const { isExpanded, height } = this.state;
		const currentHeight = isExpanded ? height : 0;
		return (
			<div className={`panel ${isExpanded ? 'is-expanded' : ''} mb-3`}>
				<div
					className="addon-mobile-card panel-heading"
					onClick={(e) => this.handleToggle(e)}
					style={{ overflow: `hidden` }}
				>
					<div className="avenirHeavy">
						{title}
						<a
							className="read-details float-right"
							data-toggle="collapse"
							data-target="#collapseProfile1"
							aria-expanded="false"
							aria-controls="collapseExample"
						>
							<img
								className="icons icon-collapsible"
								src={`img/icons/collapse_button_${isExpanded ? 'up' : 'down'}.png`}
							/>
						</a>
					</div>
					<div className="avenirBook">{subtitle}</div>
				</div>
				<div className="panel-collapse" style={{ height: currentHeight + 'px' }}>
					<div className="avenirMedium panel-body" ref="inner">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

AddOnsCollapsible.propTypes = {
	title: PropTypes.string
};

export default AddOnsCollapsible;
