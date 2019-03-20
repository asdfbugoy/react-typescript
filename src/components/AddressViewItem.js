import React from 'react';
import { observer } from 'mobx-react';

const siteAddressStyle = {
	paddingRight: '0px',
	paddingTop: '5px'
};

class AddressViewItem extends React.Component {
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
			<div className="row m-3">
				<div className="col-lg mb-3" style={siteAddressStyle}>
					<b>Site # {this.props.indexNo}</b>
				</div>
				<div className="col-lg-2 mb-3">
					<div>
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
				<div className="col-lg-5 mb-3">
					<input
						readOnly="readOnly"
						className="form-control"
						placeholder="e.g: 31 Exeter Rd ComCentre"
						value={address}
					/>
				</div>
				<div className="col-lg-3 mb-3">
					<input
						className="form-control"
						type="text"
						placeholder="e.g: #01-01"
						name="unitNo"
						value={unitNo}
						onChange={this.handleChange.bind(this)}
					/>
				</div>
				{/* <div className="col-lg-1 mb-3">
					<button
						type="button"
						onClick={ this.props.address.onRemove }
						className="btn action-btn-trash">
						<i 
							className="fa fa-trash-alt" 
							style={{
								position:'absolute',
								top:'7px',
								right:'8px'}} />
					</button>
                </div> */}
			</div>
		);
	}
}

export default observer(AddressViewItem);
