import React from 'react';
import PropTypes from 'prop-types';
import { QuantityComponent } from '../components/QuantityComponent';

class TierPlansCollapsible extends React.Component {
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
		const { title, subtitle, expandDetails, children } = this.props;
		const { isExpanded, height } = this.state;
		const currentHeight = isExpanded ? height : 0;
		return (
			<div className={`panel ${isExpanded ? 'is-expanded' : ''} mb-3`}>
				<div className="addon-mobile-card p-0 panel-heading" style={{ overflow: `hidden`, paddingTop: '16px' }}>
					<div className="addon-mobile-card-body-title avenirHeavy p-3" onClick={(e) => this.handleToggle(e)}>
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
								style={{ marginTop: '-3px' }}
							/>
						</a>
					</div>
					<div className="avenirBook p-3 text-center">
						<strong>{subtitle}</strong>
						<QuantityComponent max={100} min={1} />
					</div>
					<div className="d-none avenirBook pl-4">{expandDetails}</div>
				</div>
				<div className="panel-collapse" style={{ height: currentHeight + 'px' }}>
					<div className="avenirMedium panel-body text-center" ref="inner">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

TierPlansCollapsible.propTypes = {
	title: PropTypes.string
};

export default TierPlansCollapsible;
