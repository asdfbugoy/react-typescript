import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	ROUTER_SD_BASE,
	ROUTER_SD_CART,
	ROUTER_SD_CUSTOMER,
	ROUTER_QUOTATION_DRAFT,
	ROUTER_LOGOUT,
	ROUTER_HOME,
	ROUTER_MS_CLOUD_BASE,
	ROUTER_CYBER_SECURITY_BASE
} from '../stores/global';

import {
	Collapse,
	Container,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownMenu,
	DropdownToggle
} from 'reactstrap';

class HeaderCollapsible extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		this.closeNavbar = this.closeNavbar.bind(this);
		this.state = {
			UserFullName: '',
			isExpanded: false,
			dropdownOpen: false
		};
	}

	componentWillMount() {
		if (window.hasOwnProperty('site')) {
			this.setState({ UserFullName: window.site.user });
		}
	}

	handleToggle() {
		this.setState({
			isExpanded: !this.state.isExpanded,
			height: this.refs.inner.clientHeight
		});
	}

	closeNavbar() {
		if (this.state.isExpanded == true) {
			this.handleToggle();
		}
	}

	render() {
		const { homePage, cart, totalCart } = this.props;
		const { isExpanded, height } = this.state;
		const currentHeight = isExpanded ? height : 0;
		return (
			<div className={`panel ${isExpanded ? 'is-expanded' : ''}`}>
				<div className="container pt-2">
					<div className="row align-items-center">
						<div className="col-3 pl-2 text-left">
							<button
								className="navbar-toggler custom-toggler panel-heading"
								type="button"
								onClick={this.handleToggle}
							>
								<span className="navbar-toggler-icon" />
							</button>
						</div>
						<div className="col text-center">
							<Link onClick={this.closeNavbar} to={homePage} className="navbar-brand-mobile">
								<img src="img/singtel-logo.png" alt="Singtel" style={{ height: '51px' }} />
							</Link>
						</div>
						<div className="col-3 text-right">
							<span className="nav-item navbar-right navbar-cart-mobile active">
								<Link
									onClick={this.closeNavbar}
									to={cart}
									className="fa-stack fa-lg"
									style={{ color: 'black' }}
								>
									<i className="fa fa-circle fa-stack-2x" />
									<i className="fa fa-shopping-cart fa-stack-1x fa-inverse" />
									<span className="fa-stack fa-1x pill">
										<i className="fa fa-circle red fa-stack-2x" />
										<i className="fa fa-stack-1x white avenir">{totalCart}</i>
									</span>
								</Link>
							</span>
						</div>
					</div>
				</div>
				<div className="pos-f-t">
					<nav className="navbar navbar-light bg-white" />
				</div>
				<div className="panel-collapse" style={{ height: currentHeight + 'px' }}>
					<div className="panel-body" ref="inner">
						<Nav className="pt-4 pr-4 pl-4" navbar>
							<li className="nav-item">
								<h6>
									Hi, <strong className="red">{this.state.UserFullName}</strong>
								</h6>
							</li>
							<li className="nav-item">
								<Link
									onClick={this.closeNavbar}
									to={ROUTER_QUOTATION_DRAFT}
									className="nav-link"
									style={{ textDecoration: 'none' }}
								>
									<b>My Dashboard</b>
								</Link>
							</li>
							<li className="nav-item">
								<a
									onClick={this.closeNavbar}
									href={ROUTER_LOGOUT}
									target="_top"
									className="nav-link"
									style={{ textDecoration: 'none' }}
								>
									<b>Logout</b>
								</a>
							</li>
							<li className="dropdown-divider" />
							<NavItem>
								<Link
									onClick={this.closeNavbar}
									className="nav-link navigation__navlinks"
									to={ROUTER_SD_BASE}
								>
									SD-LAN
								</Link>
							</NavItem>
							<NavItem>
								<Link
									onClick={this.closeNavbar}
									className="nav-link navigation__navlinks"
									to={ROUTER_MS_CLOUD_BASE}
								>
									Managed Public Cloud
								</Link>
							</NavItem>
							<NavItem>
								<Link
									onClick={this.closeNavbar}
									className="nav-link navigation__navlinks"
									to={ROUTER_CYBER_SECURITY_BASE}
								>
									Cyber Security
								</Link>
							</NavItem>
						</Nav>
					</div>
				</div>
			</div>
		);
	}
}

HeaderCollapsible.propTypes = {
	title: PropTypes.string
};

export default HeaderCollapsible;
