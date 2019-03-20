import React from 'react';
import { observer } from 'mobx-react';

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
			<div className="row">
				<div className="col-lg-3">
					<label className="mt-2">Postal Code</label>
					<div>
						<input
							className="form-control"
							type="number"
							maxLength="6"
							placeholder="ex: 239732"
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
				<div className="col-lg-6">
					<label className="mt-2">Address</label>
					<input
						readOnly="readOnly"
						className="form-control"
						placeholder="e.g: 31 Exeter Rd ComCentre"
						value={address}
					/>
				</div>
				<div className="col-lg-3">
					<label className="mt-2">Unit No.</label>
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
		);
	}
}

export default observer(AddressViewItem);
