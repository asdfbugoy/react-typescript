import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import { observer, inject } from 'mobx-react';
import {
	ROUTER_SD_BASE,
	ROUTER_SD_CART,
	ROUTER_SD_CUSTOMER,
	ROUTER_QUOTATION_DRAFT,
	ROUTER_LOGOUT,
	ROUTER_HOME,
	ROUTER_MS_CLOUD
} from '../stores/global';
import HeaderCollapsible from './../components/HeaderCollapsible';
import { BrowserView, MobileView } from 'react-device-detect';

class Header extends React.Component {
	state = {
		UserFullName: ''
	};
	componentWillMount() {
		if (window.hasOwnProperty('site')) {
			this.setState({ UserFullName: window.site.user });
		}
	}
	renderMobileHeader() {
		const { productStore } = this.props;
		return (
			<HeaderCollapsible
				homePage={ROUTER_HOME}
				cart={ROUTER_SD_CART}
				totalCart={productStore.isReady && productStore.totalProductCart}
			>
				<div className="bg-white pt-4 pr-4 pl-4">
					<ul className="nav navbar-nav navbar-center col no-styled">
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
								href={ROUTER_LOGOUT}
								target="_top"
								className="nav-link"
								style={{ textDecoration: 'none' }}
							>
								<b>Logout</b>
							</a>
						</li>
						<li className="dropdown-divider" />
						<li className="nav-item">
							<NavLink
								onClick={this.closeNavbar}
								to={ROUTER_SD_BASE}
								className="nav-link text-left"
								activeClassName="active"
							>
								SD-LAN
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								onClick={this.closeNavbar}
								to={ROUTER_MS_CLOUD}
								className="nav-link text-left"
								activeClassName="active"
							>
								MS Public Cloud
							</NavLink>
						</li>
					</ul>
				</div>
			</HeaderCollapsible>
		);
	}
	render() {
		const { productStore } = this.props;

		return (
			<header className="header">
				<BrowserView>
					<div className="d-none d-lg-block">
						<nav className="navbar navbar-expand-lg navbar-light bg-white p-sm-0">
							<div className="container">
								<div className="col-lg-2">
									<span className="navbar-brand text-sm-left">
										<Link
											onClick={this.closeNavbar}
											to={ROUTER_HOME}
											className="col-lg text-sm-left"
										>
											<img src="img/singtel-logo.png" alt="Singtel" style={{ width: '91px' }} />
										</Link>
									</span>
								</div>
								<div className="col-lg">
									<button
										className="navbar-toggler navbar-link pull-left"
										type="button"
										data-toggle="collapse"
										data-target="#navBarToggle"
										aria-controls="navBarToggle"
										aria-expanded="false"
										aria-label="Toggle navigation"
									>
										<span className="navbar-toggler-icon" />
									</button>
									<div className="collapse navbar-collapse" id="navBarToggle">
										<ul className="nav navbar-nav navbar-center col">
											<li className="nav-item active ml-auto">
												<NavLink
													onClick={this.closeNavbar}
													to={ROUTER_SD_BASE}
													className="nav-link text-left"
													activeClassName="active"
												>
													SD-LAN
												</NavLink>
											</li>
											<li className="nav-item active mr-auto">
												<NavLink
													onClick={this.closeNavbar}
													to={ROUTER_MS_CLOUD}
													className="nav-link text-left"
													activeClassName="active"
												>
													Managed Public Cloud
												</NavLink>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="row">
										<span className="nav-item navbar-cart active ml-auto mr-3">
											<Link
												onClick={this.closeNavbar}
												to={ROUTER_SD_CART}
												className="fa-stack fa-lg"
												style={{ color: 'black' }}
											>
												<i className="fa fa-circle fa-stack-2x" />
												<i className="fa fa-shopping-cart fa-stack-1x fa-inverse fa-xs" />
												<span className="fa-stack fa-1x pill">
													<i className="fa fa-circle red fa-stack-2x" />
													<i className="fa fa-stack-1x white avenir">
														{productStore.isReady && productStore.totalProductCart}
													</i>
												</span>
											</Link>
										</span>

										<UncontrolledDropdown>
											<DropdownToggle tag="a">
												<span className="fa-stack fa-lg" style={{ color: 'black' }}>
													<i className="fa fa-circle fa-stack-2x" />
													<i className="far fa-user fa-stack-1x fa-inverse fa-xs" />
												</span>
											</DropdownToggle>
											<DropdownMenu right style={{ marginTop: '15px' }}>
												<h6 className="dropdown-header">
													Hi, <strong className="red">{this.state.UserFullName}</strong>
												</h6>
												<Link
													onClick={this.closeNavbar}
													to={ROUTER_QUOTATION_DRAFT}
													className="dropdown-item"
													href="#"
													style={{ lineHeight: '1.5' }}
												>
													My Dashboard
												</Link>
												<a
													href={ROUTER_LOGOUT}
													target="_top"
													className="dropdown-item"
													style={{ lineHeight: '1.5' }}
												>
													Logout
												</a>
											</DropdownMenu>
										</UncontrolledDropdown>
									</div>
								</div>
							</div>
						</nav>
					</div>
					<div className="d-lg-none">{this.renderMobileHeader()}</div>
				</BrowserView>
				<MobileView>{this.renderMobileHeader()}</MobileView>
			</header>
		);
	}
}

export default observer(Header);
