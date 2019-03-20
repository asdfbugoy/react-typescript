import React from 'react';
import Banner from './../components/BannerComponent';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { QuantityComponent } from '../components/QuantityComponent';
import Checkbox from '@material-ui/core/Checkbox';
import { ROUTER_MS_CLOUD_BASE, ROUTER_MS_TIERPLANS, ROUTER_MS_OVERVIEW } from '../stores/global';
import sampleData from '../stores/sampleMSCloudStore';
import { BrowserView, TabletView, MobileOnlyView, isMobileOnly } from 'react-device-detect';
import ScrollMenu from '../components/ScrollMenu';
import PropTypes from 'prop-types';
import sampleMSCloudStore from '../stores/sampleMSCloudStore';
import TierPlansCollapsible from '../components/TierPlansCollapsible';
import { types, getParent } from 'mobx-state-tree';

class TierPlans extends React.Component {
	state = {
		addonContent: [],
		banner: {
			background: 'img/hero4.jpg',
			mobileBackground: 'img/hero4-mobile.jpg',
			textcolor: '',
			title: 'Tell Us Your Story'
		},
		isVM: true
	}

	toggleVM = (status) => (e) => {
		e.preventDefault();
		this.setState({ isVM: status });
	};

	render() {
		return (
			<article className="main background-very-light-gray pb-2">
				<Banner {...this.state.banner} />
				<div className="container">
					<section className="mb-5">
						<section className="card shadow">
							<div className="card-body p-sm-5">
								<h2 className="title-text-inside mb-5 text-center">Select your managed service:</h2>

								<div className="row mb-3">
									<div className="col special-text">
										Please select your chosen public cloud provider.
									</div>
								</div>
								<div className="row">
									<div className="col-lg-4 col-md-4 mb-3">
										<a
											href="javascript:void(0);"
											className="card border h-100 active"
											data-toggle="tooltip"
											data-placement="top"
											title=""
										>
											<div className="position-absolute ml-2 mt-2">
												<i className="fas fa-check-circle" />
											</div>
											<div className="card-body">
												<div className="d-block text-center">
													<img
														className="m-3"
														src="img/aws-logo.png"
														style={{ height: '35px' }}
													/>
												</div>
											</div>
										</a>
									</div>
									<div className="col-lg-4 col-md-4 mb-3">
										<a
											href="javascript:void(0);"
											className="card border h-100"
											data-toggle="tooltip"
											data-placement="top"
											title=""
										>
											<div className="position-absolute ml-2 mt-2">
												<i className="fas fa-check-circle" />
											</div>
											<div className="card-body">
												<div className="d-block text-center">
													<img
														className="m-3"
														src="img/microsoft-logo.png"
														style={{ height: '25px' }}
													/>
												</div>
											</div>
										</a>
									</div>
								</div>
								<div className="mb-3 mt-3 special-text">What would you like managed?</div>
								<div className="row">
									<div className="col-md-4 col-lg-3 mb-3">
										<a
											href="javascript:void(0);"
											className={`card border h-100 ${this.state.isVM ? 'active' : ''}`}
											data-toggle="tooltip"
											data-placement="top"
											title=""
											onClick={this.toggleVM(true)}
										>
											<div className="position-absolute ml-2 mt-2">
												<i className="fas fa-check-circle" />
											</div>
											<div className="card-body">
												<div className="pt-4 pb-4 text-center">Virtual Machine</div>
											</div>
										</a>
									</div>
									<div className="col-md-4 col-lg-3 mb-3">
										<a
											href="javascript:void(0);"
											className={`card border h-100 ${!this.state.isVM ? 'active' : ''}`}
											data-toggle="tooltip"
											data-placement="top"
											title=""
											onClick={this.toggleVM(false)}
										>
											<div className="position-absolute ml-2 mt-2">
												<i className="fas fa-check-circle" />
											</div>
											<div className="card-body">
												<div className="pt-4 pb-4 text-center">Fabric</div>
											</div>
										</a>
									</div>
								</div>
							</div>
						</section>
					</section>
					<h2 className="title-text text-center mt-5 mb-5">
						{this.state.isVM ? 'Managed Tiers for AWS' : 'Fabric Management for AWS'}
					</h2>
					<section className="mb-5">{this.state.isVM ? <ManagedPlan /> : <FabricPlan />}</section>
					<div className="mb-4">
						<div className="row align-items-center text-center text-sm-left">
							<div className="col-sm-auto">
								<Link to={ROUTER_MS_OVERVIEW} className="btn btn-singtel-go-primary">
									Save
								</Link>
							</div>
							<div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0">
								<span>or</span>
							</div>
							<div className="col-sm-auto">
								<Link to={ROUTER_MS_CLOUD_BASE} className="avenirHeavy">
									Reset Order Cart
								</Link>
							</div>
						</div>
					</div>
				</div>
			</article>
		);
	}
}

export default observer(TierPlans);

class TierPackages extends React.Component {
	render() {
		return (
			<section className="card shadow">
				<div className="card-body p-sm-5">
					<h2 className="title-text-inside mb-5 text-center">Singtel partners trusted cloud providers:</h2>

					<div className="row mb-3">
						<div className="col special-text">What is your favourite series?</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-4 mb-3">
							<a
								href="javascript:void(0);"
								className="card border h-100 active"
								data-toggle="tooltip"
								data-placement="top"
								title=""
							>
								<div className="position-absolute ml-2 mt-2">
									<i className="fas fa-check-circle" />
								</div>
								<div className="card-body">
									<div className="d-block text-center">
										<img className="m-3" src="img/aws-logo.png" style={{ height: '35px' }} />
									</div>
								</div>
							</a>
						</div>
						<div className="col-lg-4 col-md-4 mb-3">
							<a
								href="javascript:void(0);"
								className="card border h-100"
								data-toggle="tooltip"
								data-placement="top"
								title=""
							>
								<div className="position-absolute ml-2 mt-2">
									<i className="fas fa-check-circle" />
								</div>
								<div className="card-body">
									<div className="d-block text-center">
										<img className="m-3" src="img/microsoft-logo.png" style={{ height: '25px' }} />
									</div>
								</div>
							</a>
						</div>
					</div>
					<div className="mb-3 mt-3 special-text">What is your choice from Amazon web services?</div>
					<div className="row">
						<div className="col-md-4 col-lg-3 mb-3">
							<a
								href="javascript:void(0);"
								className="card border h-100 active"
								data-toggle="tooltip"
								data-placement="top"
								title=""
							>
								<div className="position-absolute ml-2 mt-2">
									<i className="fas fa-check-circle" />
								</div>
								<div className="card-body">
									<div className="pt-4 pb-4 text-center">Virtual Machine</div>
								</div>
							</a>
						</div>
						<div className="col-md-4 col-lg-3 mb-3">
							<a
								href="javascript:void(0);"
								className="card border h-100"
								data-toggle="tooltip"
								data-placement="top"
								title=""
							>
								<div className="position-absolute ml-2 mt-2">
									<i className="fas fa-check-circle" />
								</div>
								<div className="card-body">
									<div className="pt-4 pb-4 text-center">Fabric</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

class ManagedPlan extends React.Component {
	render() {
		return (
			<div>
				<BrowserView>
					<div className="row">
						<div className="col-md m-0 pl-1 pr-1 text-center font-size-16-lg font-size-14">
							<div className="card border shadow">
								<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
									<div className="d-flex flex-row justify-content-center" style={{ height: '50px' }}>
										<div className="sub-title-text">Plans</div>
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Suggest Workload
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Quantity
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Service Hours
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Monitoring
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Restore Time
									</div>
								</div>
							</div>
						</div>
						{sampleData.tierPlans.map((d, i) => (
							<div className="col-md m-0 pl-1 pr-1" key={i}>
								<div className="card border shadow">
									<div className="card-body p-3 text-center">
										{Object.keys(d).map((attribute, index) => {
											switch (attribute) {
												case 'name':
													return (
														<div style={{ height: '50px', overflow: 'hidden' }} key={index}>
															<div className="sub-title-text">{d.name}</div>
														</div>
													);
												case 'quantity':
													return (
														<div
															className="d-flex flex-row justify-content-center align-items-center table-row-height"
															key={index}
														>
															<div className="mb-3">
																<QuantityComponent max={100} min={1} />
															</div>
														</div>
													);
												default:
													return (
														<div
															className="d-flex flex-row justify-content-center align-items-center table-row-height"
															key={index}
														>
															<div className="mb-3">
																<span>{d[attribute]}</span>
															</div>
														</div>
													);
											}
										})}
									</div>
								</div>
							</div>
						))}
					</div>
				</BrowserView>
				<TabletView>
					<div className="d-none d-lg-block">
						<div className="row">
							<div className="col-md m-0 pl-1 pr-1 text-center font-size-16-lg font-size-14">
								<div className="card border shadow">
									<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
										<div
											className="d-flex flex-row justify-content-center"
											style={{ height: '50px' }}
										>
											<div className="avenirHeavy">Plans</div>
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
											Quantity
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
											SLA
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
											Monitoring
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
											Security
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
											Work Loads
										</div>
									</div>
								</div>
							</div>
							{sampleData.tierPlans.map((d, i) => (
								<div className="col-md m-0 pl-1 pr-1" key={i}>
									<div className="card border shadow">
										<div className="card-body p-3 text-center">
											<div style={{ height: '50px', overflow: 'hidden' }}>
												<div className="avenirHeavy">{d.name}</div>
											</div>
											<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
												<div className="mb-3">
													<QuantityComponent max={100} min={1} />
												</div>
											</div>
											{Object.keys(d).map(
												(attribute, index) =>
													attribute !== 'name' &&
													attribute !== 'quantity' && (
														<div
															className="d-flex flex-row justify-content-center align-items-center table-row-height"
															key={index}
														>
															<span>{d[attribute]}</span>
														</div>
													)
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="d-lg-none d-block">
						<div className="row">
							<div className="col-md-4 pr-0">
								<div className="card border shadow">
									<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
										<div className="d-flex flex-row justify-content-center table-row-height-mobile">
											<div className="sub-title-text">Plans</div>
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
											Suggest Workload
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
											Quantity
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
											Service Hours
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
											Monitoring
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
											Restore Time
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-8">
								<TierPlansTable />
							</div>
						</div>
					</div>
				</TabletView>
				<MobileOnlyView>
					{sampleData.tierPlans.map((d, i) => (
						<MobileProfileTierPlansTable
							key={i}
							tierPlans={d}
							name={d.name}
							SLA={d.SLA}
							monitoring={d.monitoring}
							patching={d.patching}
							security={d.security}
							workLoads={d.workLoads}
						/>
					))}
				</MobileOnlyView>
			</div>
		);
	}
}

class FabricPlan extends React.Component {
	render() {
		return (
			<div className="card border shadow">
				<div className="card-body p-sm-4">
					<div className="row text-sm-left text-center">
						<div className="col-sm mb-3 mb-sm-0">
							<h3 className="sub-title-text">Fabric Management</h3>
							<span className="d-none">
								Hyperledger Fabric is a platform for distributed ledger solutions, underpinned by a
								modular architecture delivering high degrees of confidentiality, resiliency, flexibility
								and scalability. It is designed to support pluggable implementations of different
								components, and accommodate the complexity and intricacies that exist across the
								economic ecosystem.
							</span>
							<span>
								A service that manages and performs configurations for AWS VPCs. Specified computer
								services are also included: networking and content delivery services, management tools
								and security/identity/compliance tools in the VPC environment.
							</span>
						</div>
						<div className="col-sm-auto">
							<div className="btn btn-singtel-go-primary">ADD</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const list = sampleData.tierPlans;

const MenuItem = ({ name, SLA, monitoring, patching, security, workLoads, selected }) => {
	return (
		<div className={`menu-item ${selected ? 'active' : ''}`} style={{ whiteSpace: 'normal' }}>
			<div className="card border shadow" style={{ width: '350px' }}>
				<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
					<div className="d-flex flex-row justify-content-center table-row-height-mobile sub-title-text">
						{name}
					</div>
					<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
						{workLoads}
					</div>
					<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
						<div className="mb-3">
							<QuantityComponent max={100} min={1} />
						</div>
					</div>
					<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
						{SLA}
					</div>
					<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
						{monitoring}
					</div>
					<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
						{security}
					</div>
				</div>
			</div>
		</div>
	);
};

export const Menu = (list) =>
	list.map((el) => {
		const { name, SLA, monitoring, patching, security, workLoads } = el;
		return (
			<MenuItem
				name={name}
				SLA={SLA}
				monitoring={monitoring}
				patching={patching}
				security={security}
				workLoads={workLoads}
				key={name}
			/>
		);
	});

class TierPlansTable extends React.Component {
	state = {
		selected: 'item1',
		itemsCount: list.length,
		hideArrows: true,
		translate: 0,
		alignCenter: true,
		dragging: true,
		clickWhenDrag: false,
		transition: 0.4,
		wheel: true
	};

	constructor(props) {
		super(props);
		this.menu = null;
		this.menuItems = Menu(list.slice(0, list.length), this.state.selected);
	}

	onUpdate = ({ translate }) => {
		// console.log(`onUpdate: translate: ${translate}`);
		this.setState({ translate });
	};

	onSelect = (key) => {
		// console.log(`onSelect: ${key}`);
		this.setState({ selected: key });
	};

	componentDidUpdate(prevProps, prevState) {
		const { alignCenter } = prevState;
		const { alignCenter: alignCenterNew } = this.state;
		if (alignCenter !== alignCenterNew) {
			this.menu.setInitial();
		}
	}

	setItemsCount = (ev) => {
		const { itemsCount = list.length, selected } = this.state;
		const val = +ev.target.value;
		const itemsCountNew = !isNaN(val) && val <= list.length && val >= 0 ? +ev.target.value : list.length;
		const itemsCountChanged = itemsCount !== itemsCountNew;

		if (itemsCountChanged) {
			this.menuItems = Menu(list.slice(0, itemsCountNew), selected);
			this.setState({
				itemsCount: itemsCountNew
			});
		}
	};

	setSelected = (ev) => {
		const { value } = ev.target;
		this.setState({ selected: String(value) });
	};

	render() {
		const {
			selected,
			translate,
			alignCenter,
			dragging,
			clickWhenDrag,
			hideArrows,
			transition,
			wheel,
			itemsCount
		} = this.state;

		const menu = this.menuItems;

		return (
			<ScrollMenu
				ref={(el) => (this.menu = el)}
				data={menu}
				hideArrows={hideArrows}
				transition={+transition}
				onUpdate={this.onUpdate}
				onSelect={this.onSelect}
				selected={selected}
				translate={translate}
				alignCenter={alignCenter}
				dragging={dragging}
				clickWhenDrag={clickWhenDrag}
				wheel={wheel}
			/>
		);
	}
}

const MobileProfileTierPlansTable = ({ tierPlans, name, SLA, monitoring, patching, security, workLoads }) => {
	return (
		<div>
			<TierPlansCollapsible
				title={name}
				subtitle={`Quantity`}
				expandDetails={
					<div>
						<span className="pt-2">Expand to view details</span>
					</div>
				}
			>
				{/* collapsible content here */}
				<div className="addon-mobile-card-body-title text-center">
					<strong>Suggest Workload</strong>
				</div>
				<div className="addon-mobile-card-body">
					<div className="d-flex flex-row justify-content-center align-items-center">{workLoads}</div>
				</div>
				<div className="addon-mobile-card-body-title text-center">
					<strong>Service Hours</strong>
				</div>
				<div className="addon-mobile-card-body">
					<div className="d-flex flex-row justify-content-center align-items-center">{SLA}</div>
				</div>
				<div className="addon-mobile-card-body-title text-center">
					<strong>Monitoring</strong>
				</div>
				<div className="addon-mobile-card-body">
					<div className="d-flex flex-row justify-content-center align-items-center">{monitoring}</div>
				</div>
				<div className="addon-mobile-card-body-title text-center">
					<strong>Restore Time</strong>
				</div>
				<div className="addon-mobile-card-body">
					<div className="d-flex flex-row justify-content-center align-items-center">{security}</div>
				</div>
			</TierPlansCollapsible>
		</div>
	);
};
