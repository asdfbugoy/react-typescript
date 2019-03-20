import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ROUTER_SD_TERMS } from '../../stores/global';
import { Link } from 'react-router-dom';
import { OverlayLoading } from './../common/Loading'

class CustomerSearch extends React.Component {
	constructor(){
		super();
		this.state = {
			isLoading: false,
			customers: [],
			inputValue: '',
			pageSize: 12,
			pageNo: 1,
			totalCount: 0,
			isInitialSearch: true
		};
		this.onClickBack = this.onClickBack.bind(this);
	}
	
	componentDidMount() {
		window.scrollTo(0, 0);
		this.setState({ isInitialSearch: true });
	}
	fetchCustomer = (isLoadMore) => {
		this.setState({ isInitialSearch: false });
		this.setState({ isLoading: true });
		let newPageNo = isLoadMore ? this.state.pageNo + 1 : 1;

		this.props.customer
			.fetchCustomer({
				keyword: this.state.inputValue,
				pageSize: this.state.pageSize,
				pageNo: newPageNo
			})
			.then(({ result, totalCount }) =>
				this.setState((prevState) => ({
					customers: isLoadMore ? [ ...prevState.customers, ...result ] : result,
					totalCount: totalCount,
					pageNo: newPageNo,
					isLoading: false
				}))
			);
	};
	onKeyDownSearch = () => (e) => {
		if (!this.state.isLoading && e.keyCode === 13 && this.state.inputValue && this.state.inputValue.trim()) {
			e.preventDefault();
			this.fetchCustomer(false);
		}
	};
	onClickSearch = () => (e) => {
		e.preventDefault();
		if (!this.state.isLoading && this.state.inputValue && this.state.inputValue.trim()) this.fetchCustomer(false);
	};

	onChangeSearch = () => (e) => {
		this.setState({ inputValue: e.target.value });
	};

	onClickLoadMore = () => (e) => {
		this.fetchCustomer(true);
	};

	onClickCreate = () => (e) => {
		e.preventDefault();
		this.props.customer.resetCustomer();
		this.props.onChangePage('create');
	};

	onClickView = (data) => (e) => {
		e.preventDefault();
		this.props.customer.setCustomer(data);
		this.props.onChangePage('view');
	};
	onClickBack(){
		this.props.history.goBack();
	}
	isLoadMorable() {
		const { pageSize, pageNo, totalCount } = this.state;
		return pageSize * pageNo < totalCount ? true : false;
	}
	render() {
		return (
			<React.Fragment>
				<section className="pb-4">
					<div className="card shadow">
						<div className="card-body">
							<div className="row">
								<div className="col-md">
									<input
										ref={this.searchRef}
										onChange={this.onChangeSearch()}
										onKeyDown={this.onKeyDownSearch()}
										className="form-control h-100"
										type="search"
										placeholder="Type and enter to search"
									/>
									<a href="javascript:void(0)" onClick={this.onClickSearch()}>
										<i
											className={`icons qdl-icon-search ${this.state.isLoading
												? 'fas fa-spinner fa-spin'
												: 'fa fa-search'}`}
											style={{ position: 'absolute', right: '30px', top: '8px' }}
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{this.state.customers.length > 0 && (
					<section className="pb-5">
						<div className="card shadow border">
							<div className="card-body">
								<h4 className="title-text-inside m-3 text-center">
									Search Result {this.state.isLoading && (
										<i className="fas fa-spinner fa-spin" />
									)}{' '}
								</h4>
								<div className="row">
									{this.state.customers.map((d, i) => (
										<div className="col-sm-4 p-2 d d" key={i}>
											<a
												href="javascript:void(0)"
												className="card border h-100"
												onClick={this.onClickView(d)}
											>
												<div className="position-absolute ml-2 mt-2">
													<i className="fas fa-check-circle" />
												</div>
												<div className="card-body">
													<div className="pt-3 pb-2 text-left">
														{d.accountName}
														<br />
														{d.uen}
													</div>
												</div>
											</a>
										</div>
									))}
								</div>
								<div className="m-3 text-center">
									{this.isLoadMorable() && (
										<button
											type="button"
											className="btn btn-singtel-go-primary-black"
											onClick={this.onClickLoadMore()}
										>
											Load More
											{this.state.isLoading && <i className="fas fa-spinner fa-spin" />}
										</button>
									)}
								</div>
							</div>
						</div>
					</section>
				)}
				{!this.state.isInitialSearch &&
				!this.state.customers.length > 0 &&
				!this.state.isLoading && <h4 className="museo text-center pb-5 m-0">No Record Found</h4>}
				<section className="pb-3">
					<div className="row">
						<div className="col-lg-auto col-md-auto col-sm-auto">
							<a
								href="/UCRM/CreateAccount_Basic.aspx"
								target="_blank"
								className="btn btn-singtel-go-primary w-100"
							>
								Create New Customer
							</a>
						</div>
						<div className="col-lg-auto  col-md-auto col-sm-auto">
							{this.props.editMode ? 
								<button
									type="button"
									className="btn btn-link w-100 avenirHeavy"
									onClick={this.props.onCancel}>CANCEL</button>
								: <button
									type="button"
									className="btn btn-link w-100 avenirHeavy"
									onClick={this.onClickBack }
									>BACK</button>
							}
						</div>
					</div>
				</section>
				<OverlayLoading open={this.state.isLoading} />
			</React.Fragment>
		);
	}
}

CustomerSearch.propTypes = {
	onCancel: PropTypes.func,
	editMode: PropTypes.bool
};

export default withRouter(CustomerSearch);
