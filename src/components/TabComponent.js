import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ROUTER_SD_BASE, ROUTER_SD_CART } from '../stores/global';
import { BrowserView, TabletView } from 'react-device-detect';

class TabComponent extends React.PureComponent {
	state = {
		currentIndex: 0
	};

	componentDidMount() {
		this.setState({
			currentIndex: this.props.productStore.packages.profiles[0].pid
		});
	}

	setCurrentIndex = (currentIndex) => {
		this.setState({ currentIndex: currentIndex });
	};

	render() {
		const { productStore, siteStatus } = this.props;
		return (
			<div>
				<div className="nav nav-tabs" id="nav-tab" role="tablist">
					{productStore.packages.profiles.map((profile, index) => (
						<TabHeader
							key={index}
							index={index}
							profilePid={profile.pid}
							profile={profile}
							currentIndex={this.state.currentIndex}
							setCurrentIndex={this.setCurrentIndex}
						/>
					))}
				</div>
				{/* siteAddressStore={ this.props.packages.pid }  
                    profile={ this.storeName.getPackageByUid( this.state.selectedPid )} 
                   siteAddressStore={ selectedPackage } 
                   profileId={ selectedPackage.pid }*/}
				<TabContent
					productStore={this.props.productStore}
					index={this.state.currentIndex}
					currentIndex={this.state.currentIndex}
				/>
			</div>
		);
	}
}

export default TabComponent;

TabComponent.propTypes = {
	productStore: PropTypes.array,
	tabActiveValue: PropTypes.string,
	siteProfileNumber: PropTypes.string,
	siteProfileName: PropTypes.string,
	siteAddressList: PropTypes.array,
	siteStatus: PropTypes.string
};

class TabHeader extends React.Component {
	componentDidMount() {
		window.scroll({
			top: 0,
			behavior: 'smooth'
		});
	}
	render() {
		// console.log(this.props);
		const { index, currentIndex, setCurrentIndex, profilePid } = this.props;
		const { name } = this.props.profile;
		const profileTitle = `${name} Profile # ${this.props.index + 1}`;
		const onClickSetIndex = () => (e) => {
			e.preventDefault();
			setCurrentIndex(profilePid);
		};
		return (
			<a
				className={`nav-item nav-link ${profilePid === currentIndex ? 'active' : ''}`}
				width="350px"
				id={`nav-${index}-tab`}
				data-toggle="tab"
				onClick={onClickSetIndex()}
				role="tab"
				aria-controls={`nav-${index}`}
				aria-selected="true"
			>
				{name} &nbsp;&nbsp;&nbsp;
				<span className={`badge badge-pill badge-warning`}>&nbsp;</span>
				<br />
				Profile #{`${this.props.index + 1}`}
			</a>
		);
	}
}

class TabContent extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = { toggle: false };
		this.batchImportAddressLines = [];
		this.handleBatchImportAddressInput = this.handleBatchImportAddressInput.bind(this);
		this.retrieveAddress = this.retrieveAddress.bind(this);
	}

	toggle(e) {
		this.setState((prevState) => ({
			toggle: !prevState.toggle
		}));
	}

	handleBatchImportAddressInput(e) {
		const batchImportAddressLines = e.target.validity.valid ? e.target.value : this.state.batchImportAddressLines;
		this.setState({
			batchImportAddressLines
		});
	}

	retrieveAddress() {
		this.setState((prevState) => ({
			toggle: !prevState.toggle
		}));
		// console.log(this.state.batchImportAddressLines);
	}

	render() {
		const { index, currentIndex, productStore } = this.props;
		// const { name, siteStatus, noofsite } = this.props.profile;
		// console.log(this.props);

		const display = {
			display: 'block'
		};
		const hide = {
			display: 'none'
		};
		const numberOfAddressStyle = {
			fontFamily: 'Museo',
			fontSize: '24px'
		};
		const spanStyle = {
			fontFamily: 'museo',
			fontSize: '24px'
		};

		return (
			<div
				className={`tab-pane fade ${index === currentIndex ? 'show active' : ''}`}
				id={`nav-${index}-tab`}
				role="tabpanel"
				aria-labelledby={`nav-profile${index}-tab`}
			>
				<div className="m-3">
					<div className="d-flex justify-content-center">
						<div className="alert alert-warning">
							You have not <b>filled in all addresses.</b> Kindly input all addresses before saving.
						</div>
					</div>
					<div className="row mb-3">
						<div className="col special-text">
							<span className="special-text" style={numberOfAddressStyle}>
								Number of Addresses: <span className="red">0/{index}</span> Sites
							</span>
						</div>
						<div className="col-auto text-right">
							<a
								onClick={this.toggle}
								className="btn text-right"
								data-toggle="modal"
								data-target="#profile1Modal"
							>
								<i className="fa fa-random" />
								&nbsp; Batch Import Mode
							</a>
						</div>
						<div className="modal" style={this.state.toggle ? display : hide}>
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="text-center pl-sm-5 pr-sm-5 m-3">
										<span className="special-text" style={spanStyle}>
											Batch Import Installation Address
										</span>
									</div>
									<div className="pl-sm-5 pr-sm-5 mb-3">
										<p>
											Kindly enter your address in the following format: "Postal Code / Unit
											Number, Building Name"
										</p>
										<textarea
											className="form-control"
											rows="10"
											id="batchImportAddresses"
											placeholder="i.e, 123456 / #02-02, NUS Hub"
											value={this.state.batchImportAddressLines}
											onInput={this.handleBatchImportAddressInput.bind(this)}
										/>
									</div>
									<div className="text-center mb-4">
										<button
											type="button"
											id="retrieveButton"
											className="btn btn-singtel-go-primary"
											onClick={this.retrieveAddress}
										>
											Retrieve
										</button>
										<a className="btn btn-singtel-go-primary-inverted" onClick={this.toggle}>
											Cancel
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<BrowserView>
					<div className="row m-3">
						<div className="col-lg mb-3" />
						<div className="col-lg-2 mb-3">
							<b>Postal Code</b>
						</div>
						<div className="col-lg-5 mb-3">
							<b>Address Details</b>
						</div>
						<div className="col-lg-3 mb-3">
							<b>Unit No, Building Name</b>
						</div>
						<div className="col-lg-1 mb-3">
							<b>Action</b>
						</div>
					</div>
					{/*map the number of site addresses into TabContentAddresses Component to generate rows*/}
					{productStore.packages.profiles.map((data, index) => (
						<TabContentAddresses key={index} index={this.state.currentIndex} />
					))}
				</BrowserView>
				<TabletView>
					<div className="row m-3">
						<div className="col-lg mb-3" />
						<div className="col-lg-2 mb-3">
							<b>Postal Code</b>
						</div>
						<div className="col-lg-5 mb-3">
							<b>Address Details</b>
						</div>
						<div className="col-lg-3 mb-3">
							<b>Unit No, Building Name</b>
						</div>
						<div className="col-lg-1 mb-3">
							<b>Action</b>
						</div>
					</div>
					{/*map the number of site addresses into TabContentAddresses Component to generate rows*/}
					{productStore.packages.profiles.map((data, index) => (
						<TabContentAddresses key={index} index={this.state.currentIndex} />
					))}
				</TabletView>
				<MobileOnlyView>
					{productStore.packages.profiles.map((data, index) => (
						<MobileTabContentAddresses key={index} index={this.state.currentIndex} />
					))}
				</MobileOnlyView>
			</div>
		);
	}
}

class TabContentAddresses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// postalCode: '',
			// addressDetails: 'ex: 1 Punggol Field #01-23',
			// unitNumberNBuildingName: '',
			data: [],
			data: {
				postalCode: '',
				addressDetails: '',
				unitNumberNBuildingName: ''
			}
		};
		this.postalCodeGenerator = this.postalCodeGenerator.bind(this);
	}

	handlePostalCodeTextChange(e) {
		const postalCode = e.target.validity.valid ? e.target.value : this.state.postalCode;
		this.setState({
			postalCode
		});
	}

	handleUnitNoTextChange(e) {
		const unitNumberNBuildingName = e.target.validity.valid ? e.target.value : this.state.unitNumberNBuildingName;
		this.setState({
			unitNumberNBuildingName
		});
	}

	postalCodeGenerator(e) {
		// console.log('Postal Code Entered: ' + this.state.postalCode);
		// console.log('Address Detail: ' + this.state.addressDetails);
		// console.log('Unit Number & Building Name Entered: ' + this.state.unitNumberNBuildingName);
		e.preventDefault();
	}

	render() {
		const { name, siteStatus, noofsite, index } = this.props;
		const iconSearchStyle = {
			position: 'absolute',
			color: 'red',
			marginLeft: '120px',
			border: '0',
			bottom: '10px'
		};
		const iconTrashStyle = {
			display: 'inline-block',
			borderRadius: '60px',
			boxShadow: '0px 0px 2px red',
			padding: '0.5em 0.6em',
			color: 'red'
		};
		const siteAddressStyle = {
			paddingRight: '0px',
			paddingTop: '5px'
		};

		return (
			<div className="row m-3">
				<div className="col-lg mb-3" style={siteAddressStyle}>
					<b>Site # {index + 1}</b>
				</div>
				<div className="col-lg-2 mb-3">
					<div>
						<input
							id="profile1Postal"
							className="form-control"
							type="text"
							placeholder="ex: 123456"
							value={this.state.data[index].postalCode}
							onInput={this.handlePostalCodeTextChange.bind(this)}
							pattern="[0-9]*"
						/>
						<a>
							<i className="fa fa-search" style={iconSearchStyle} onClick={this.postalCodeGenerator} />
						</a>
					</div>
				</div>
				<div className="col-lg-5 mb-3">
					<div>
						<input
							readOnly="readOnly"
							className="form-control"
							placeholder={this.state.data[index].addressDetails}
						/>
					</div>
				</div>
				<div className="col-lg-3 mb-3">
					<div>
						<input
							id="profile1Address"
							className="form-control"
							type="text"
							placeholder="ex: #02-02, NUS Hub"
							value={this.state.data[index].unitNumberNBuildingName}
							onInput={this.handleUnitNoTextChange.bind(this)}
						/>
					</div>
				</div>
				<div className="col-lg-1 mb-3">
					<a href="#">
						<i className="fa fa-trash" style={iconTrashStyle} />
					</a>
				</div>
			</div>
		);
	}
}

class MobileTabContentAddresses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// postalCode: '',
			// addressDetails: 'ex: 1 Punggol Field #01-23',
			// unitNumberNBuildingName: '',
			data: [],
			data: {
				postalCode: '',
				addressDetails: '',
				unitNumberNBuildingName: ''
			}
		};
		this.postalCodeGenerator = this.postalCodeGenerator.bind(this);
	}

	handlePostalCodeTextChange(e) {
		const postalCode = e.target.validity.valid ? e.target.value : this.state.postalCode;
		this.setState({
			postalCode
		});
	}

	handleUnitNoTextChange(e) {
		const unitNumberNBuildingName = e.target.validity.valid ? e.target.value : this.state.unitNumberNBuildingName;
		this.setState({
			unitNumberNBuildingName
		});
	}

	postalCodeGenerator(e) {
		// console.log('Postal Code Entered: ' + this.state.postalCode);
		// console.log('Address Detail: ' + this.state.addressDetails);
		// console.log('Unit Number & Building Name Entered: ' + this.state.unitNumberNBuildingName);
		e.preventDefault();
	}

	render() {
		const { name, siteStatus, noofsite, index } = this.props;
		const iconSearchStyle = {
			position: 'absolute',
			color: 'red',
			marginLeft: '120px',
			border: '0',
			bottom: '10px'
		};
		const iconTrashStyle = {
			display: 'inline-block',
			borderRadius: '60px',
			boxShadow: '0px 0px 2px red',
			padding: '0.5em 0.6em',
			color: 'red'
		};
		const siteAddressStyle = {
			paddingRight: '0px',
			paddingTop: '5px'
		};

		return (
			<div className="row m-3">
				<div className="col-lg mb-3" style={siteAddressStyle}>
					<b>Site # {index + 1}</b>
				</div>
				<div className="col-lg-2 mb-3">
					<div>
						<b>Postal Code</b>
						<input
							id="profile1Postal"
							className="form-control"
							type="text"
							placeholder="ex: 123456"
							value={this.state.data[index].postalCode}
							onInput={this.handlePostalCodeTextChange.bind(this)}
							pattern="[0-9]*"
						/>
						<a>
							<i className="fa fa-search" style={iconSearchStyle} onClick={this.postalCodeGenerator} />
						</a>
					</div>
				</div>
				<div className="col-lg-5 mb-3">
					<div>
						<b>Address Details</b>
						<input
							readOnly="readOnly"
							className="form-control"
							placeholder={this.state.data[index].addressDetails}
						/>
					</div>
				</div>
				<div className="col-lg-3 mb-3">
					<div>
						<b>Unit No, Building Name</b>
						<input
							id="profile1Address"
							className="form-control"
							type="text"
							placeholder="ex: #02-02, NUS Hub"
							value={this.state.data[index].unitNumberNBuildingName}
							onInput={this.handleUnitNoTextChange.bind(this)}
						/>
					</div>
				</div>
				<div className="col-lg-1 mb-3">
					<b>Action</b>
					<a href="#">
						<i className="fa fa-trash" style={iconTrashStyle} />
					</a>
				</div>
			</div>
		);
	}
}
