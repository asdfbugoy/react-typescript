import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Alert } from './common';
import AddressViewItem from './AddressViewItem';
import { BrowserView, TabletView, MobileOnlyView, isMobileOnly, MobileView, isMobile } from 'react-device-detect';
import { Tab } from '@material-ui/core';

class InstallationAddressList extends React.Component {
	state = {
		isModalOpen: false,
		batchImportAddresses: '',
		isFetching: false
	};

	onOpenModal() {
		this.setState({
			isModalOpen: true
		});
	}

	onCloseModal() {
		this.setState({
			isModalOpen: false
		});
	}

	onBatchImportChange(e) {
		this.setState({
			batchImportAddresses: e.target.value
		});
	}

	onRetrieveAddresses() {
		if (this.state.batchImportAddresses === undefined) return false;
		this.setState({
			isFetching: true
		});
		let addressStr = this.state.batchImportAddresses;
		let addressArr = [];
		addressStr.split('\n').map((address) => {
			let addressContents = address.split('|');
			addressArr.push({
				postalCode: addressContents[0].trim(),
				unitNo: addressContents[addressContents.length - 1].trim()
			});
		});
		this.props.profile.retrieveAddresses(addressArr).then((valid) => {
			this.setState({ isFetching: false });
			if (valid) {
				this.setState({
					batchImportAddresses: '',
					isModalOpen: false
				});
			} else {
				this.setState({
					importMessage: 'Your input is not in correct format, please following the instruction.'
				});
			}
		});
	}

	renderModalBox() {
		return (
			<Modal
				open={this.state.isModalOpen}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className="container" style={{ height: '100%' }}>
					<div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
						<div className="col-lg-9 bg-white">
							<div className="text-center pl-sm-5 pr-sm-5 m-3">
								<span className="special-text">Batch Import Installation Address</span>
							</div>
							<div className="pl-sm-5 pr-sm-5 mb-3">
								<p>
									Kindly enter your address in the following format: "Postal Code | Unit Number,
									Building Name"
								</p>
								<textarea
									className="form-control"
									rows="10"
									value={this.state.batchImportAddresses}
									onChange={this.onBatchImportChange.bind(this)}
									placeholder="i.e, 569141 | #02-02, NUS Hub"
									disabled={this.state.isFetching}
								/>
							</div>
							<div className="text-center mb-4">
								<button
									type="button"
									className="btn btn-singtel-go-primary"
									onClick={this.onRetrieveAddresses.bind(this)}
									disabled={this.state.isFetching}
								>
									{this.state.isFetching ? 'Retrieving...' : 'Retrieve'}
								</button>
								<button
									type="button"
									className="btn btn-singtel-go-primary-inverted"
									onClick={this.onCloseModal.bind(this)}
									disabled={this.state.isFetching}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}

	render() {
		const { name, siteAddresses, pid, qty, isAddressesValid } = this.props.profile;
		return (
			<div className="tab-pane show active">
				<MobileOnlyView>
					<div className="museo font-size-20 m-3">{name}</div>
				</MobileOnlyView>
				{this.renderModalBox()}
				<div className="m-3">
					{!isAddressesValid && (
						<div className="d-flex justify-content-center">
							<Alert type="warning" closable={false}>
								You have not <b>filled in all addresses.</b> Kindly input all addresses before generate
								quote.
							</Alert>
						</div>
					)}

					<div className="row mb-3">
						<div className={`col${isMobileOnly ? '-sm-12 col-auto pt-1 pb-1' : ''}`}>
							<span className={`museo font-size-20`}>
								Number of Addresses: <span>{`${qty} ${qty > 1 ? 'Sites' : 'Site'}`}</span>
							</span>
						</div>
						<div className={`col-auto ${isMobileOnly ? 'p-0' : ''} text-right`}>
							<a
								onClick={this.onOpenModal.bind(this)}
								className={`btn text-right`}
								data-toggle="modal"
								style={{ color: '#19A0D2' }}
							>
								<i className="fa fa-random" />
								&nbsp; Batch Import Mode
							</a>
						</div>
					</div>
					<hr />
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
							<b>Unit No, Building Name</b> <span className="red avenirHeavy">*</span>
						</div>
						{/* <div className="col-lg-1 mb-3"><b>Action</b></div> */}
					</div>
					{siteAddresses &&
						siteAddresses.map((address, index) => (
							<AddressViewItem address={address} indexNo={index + 1} key={`${pid}_${index}`} />
						))}
				</BrowserView>
				<TabletView>
					<div className="d-none row m-3">
						<div className="col-lg-3 col-md-3 mb-3">
							<b>Postal Code</b>
						</div>
						<div className="col-lg-5 col-md-5 mb-3">
							<b>Address Details</b>
						</div>
						<div className="col-lg-3 col-md-4 mb-3 pr-0">
							<b>Unit No, Building Name</b> <span className="red avenirHeavy">*</span>
						</div>
					</div>
					{siteAddresses &&
						siteAddresses.map((address, index) => (
							<TabletAddressViewItem
								address={address}
								qty={qty}
								indexNo={index + 1}
								key={`${pid}_${index}`}
							/>
						))}
				</TabletView>
				<MobileOnlyView>
					{siteAddresses &&
						siteAddresses.map((address, index) => (
							<MobileAddressViewItem
								address={address}
								qty={qty}
								indexNo={index + 1}
								key={`${pid}_${index}`}
							/>
						))}
				</MobileOnlyView>
			</div>
		);
	}
}

export default InstallationAddressList;

const siteAddressStyle = {
	paddingRight: '0px',
	paddingTop: '5px'
};

class TabletAddressViewItem extends React.Component {
	state = {
		postalCode: ''
	};

	handleChange(e) {
		this.props.address.onChange({
			name: e.target.name,
			value: e.target.value
		});
	}

	handlePostalCode(e) {
		this.setState({
			postalCode: e.target.value
		});
	}

	postalCodeGenerator(e) {
		e.preventDefault();
		if (this.state.postalCode !== '' && this.state.postalCode !== this.props.address.postalCode)
			this.props.address.retrieveAddressFromPostalCode(this.state.postalCode);
	}
	render() {
		const { address, unitNo } = this.props.address;
		return (
			<div>
				<div className="row m-3">
					<div className="col-lg-12 col-md-12 mb-3" style={siteAddressStyle}>
						<b>Site # {this.props.indexNo}</b>
					</div>
					<div className="col-lg-3 col-md-3 mb-3">
						<div>
							<b>Postal Code</b>
							<input
								className="form-control"
								type="number"
								maxLength="6"
								placeholder="e.g: 239732"
								value={this.state.postalCode}
								onChange={this.handlePostalCode.bind(this)}
								pattern="[0-9]*"
							/>
							<button
								type="button"
								className="btn customer-info-btn-search"
								disabled={this.props.address.isFetching}
								onClick={this.postalCodeGenerator.bind(this)}
							>
								<i
									className={`icons customer-info-search fa ${this.props.address.isFetching
										? 'fa-spinner fa-pulse'
										: 'fa-search'}`}
								/>
							</button>
						</div>
					</div>
					<div className="col-lg-5 col-md-5 mb-3">
						<b>Address Details</b>
						<input
							readOnly="readOnly"
							className="form-control"
							placeholder="e.g: 31 Exeter Rd ComCentre"
							value={address}
						/>
					</div>
					<div className="col-lg-4 col-md-4 pr-0 mb-3">
						<b>Unit No, Building Name</b> <span className="red avenirHeavy">*</span>
						<input
							className="form-control"
							type="text"
							placeholder="e.g: #01-01"
							name="unitNo"
							value={unitNo}
							onChange={this.handleChange.bind(this)}
						/>
					</div>
				</div>
				{this.props.indexNo < this.props.qty ? <hr /> : ''}
			</div>
		);
	}
}
class MobileAddressViewItem extends React.Component {
	state = {
		postalCode: ''
	};

	handleChange(e) {
		this.props.address.onChange({
			name: e.target.name,
			value: e.target.value
		});
	}

	handlePostalCode(e) {
		this.setState({
			postalCode: e.target.value
		});
	}

	postalCodeGenerator(e) {
		e.preventDefault();
		if (this.state.postalCode !== '' && this.state.postalCode !== this.props.address.postalCode)
			this.props.address.retrieveAddressFromPostalCode(this.state.postalCode);
	}
	render() {
		const { address, unitNo } = this.props.address;
		return (
			<div>
				<div className="row m-3" style={siteAddressStyle}>
					<b>Site #{this.props.indexNo}</b>
				</div>
				<div className="row m-3">
					<div className="col-sm-12 mb-2 pl-0">
						<b>Postal Code</b>
						<input
							className="form-control"
							type="number"
							maxLength="6"
							placeholder="e.g: 239732"
							value={this.state.postalCode}
							onChange={this.handlePostalCode.bind(this)}
							pattern="[0-9]*"
						/>
						<button
							type="button"
							className="btn customer-info-btn-search"
							disabled={this.props.address.isFetching}
							onClick={this.postalCodeGenerator.bind(this)}
						>
							<i
								className={`icons customer-info-search fa ${this.props.address.isFetching
									? 'fa-spinner fa-pulse'
									: 'fa-search'}`}
							/>
						</button>
					</div>
					<div className="col-sm-12 mt-2 mb-2 pl-0">
						<b>Address Details</b>
						<input
							readOnly="readOnly"
							className="form-control"
							placeholder="e.g: 31 Exeter Rd ComCentre"
							value={address}
						/>
					</div>
					<div className="col-sm-12 mt-2 mb-2 pl-0">
						<b>Unit No, Building Name</b> <span className="red avenirHeavy">*</span>
						<input
							className="form-control"
							type="text"
							placeholder="e.g: #01-01"
							name="unitNo"
							value={unitNo}
							onChange={this.handleChange.bind(this)}
						/>
					</div>
				</div>
				{this.props.indexNo < this.props.qty ? <hr /> : ''}
			</div>
		);
	}
}
