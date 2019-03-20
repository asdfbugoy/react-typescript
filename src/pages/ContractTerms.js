import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { ROUTER_SD_CUSTOMER, ROUTER_SD_ADDON } from './../stores/global';
import { BrowserView, TabletView, MobileOnlyView } from 'react-device-detect';
import * as Components from './../components/contract-terms';

class ContractTerms extends Component {
	state = {
		isFetching: false,
		isSaving: false
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		const { productStore } = this.props;
		this.setState({ isFetching: true });
		productStore.getContractTerms().then(() => {
			this.setState({ isFetching: false });
		});
	}

	onSaveSelection() {
		this.setState({
			isFetching: true,
			isSaving: true
		});

		this.props.productStore
			.saveQuoteProfile()
			.then(() => {
				this.props.history.push(ROUTER_SD_CUSTOMER);
			})
			.catch((e) => {
				this.setState({
					isFetching: false,
					isSaving: false
				});
			});
	}

	render() {
		const { productStore } = this.props;
		const banner = {
			background: 'img/hero4.jpg',
			mobileBackground: 'img/hero4-mobile.jpg',
			textcolor: '',
			title: 'Contract Terms & Conditions'
		};
		return (
			<article className="main background-very-light-gray pb-2">
				<Components.Banner {...banner} />
				<div className="container">
					<Components.ProgressStep />
					{!this.state.isFetching &&
					productStore.contracts.length > 0 && (
						<React.Fragment>
							<div>
								<h2 className="title-text text-center mb-5 mt-5">Available Contract Duration</h2>
								<section className="mb-4">
									<div className="row">
										{productStore.contracts.map((term, i) => (
											<div key={i} className="col-md mb-3">
												<Components.TermOption
													term={term}
													selectedDuration={productStore.selectedDuration}
												/>
											</div>
										))}
									</div>
								</section>
							</div>
							<Components.Collapsable><Components.BOMList productStore={productStore} duration={productStore.selectedDuration} /></Components.Collapsable>
							<Components.Collapsable>
								<Components.PriceSummary
									productStore={productStore}
									duration={productStore.selectedDuration}
								/>
							</Components.Collapsable>
							<Components.SliderContainer>
								<Components.FinancialPlanner
									productStore={productStore}
									duration={productStore.selectedDuration}
								/>
							</Components.SliderContainer>

							<BrowserView>
								<div className="row align-items-center mb-3">
									<div className="col-auto">
										<button
											type="button"
											onClick={this.onSaveSelection.bind(this)}
											disabled={this.state.isFetching}
											className="btn btn-singtel-go-primary mr-2"
										>
											{this.state.isSaving ? (
												<span>
													<i className="fas fa-spinner fa-pulse fa-lg" /> Saving selection
												</span>
											) : (
												'Next'
											)}
										</button>
									</div>
									<div className="col-auto">or</div>
									<div className="col mt-2 mt-sm-0">
										<Link to={ROUTER_SD_ADDON} className="avenirHeavy">
											Back to Add-ons
										</Link>
									</div>
								</div>
							</BrowserView>
							<TabletView>
								<div className="row align-items-center mb-3">
									<div className="col-auto">
										<button
											type="button"
											onClick={this.onSaveSelection.bind(this)}
											disabled={this.state.isFetching}
											className="btn btn-singtel-go-primary mr-2"
										>
											{this.state.isSaving ? (
												<span>
													<i className="fas fa-spinner fa-pulse fa-lg" /> Saving selection
												</span>
											) : (
												'Next'
											)}
										</button>
									</div>
									<div className="col-auto">or</div>
									<div className="col mt-2 mt-sm-0">
										<Link to={ROUTER_SD_ADDON} className="avenirHeavy">
											Back to Add-ons
										</Link>
									</div>
								</div>
							</TabletView>
							<MobileOnlyView>
								<div className="text-center mb-3">
									<div className="col-auto p-2">
										<button
											type="button"
											onClick={this.onSaveSelection.bind(this)}
											disabled={this.state.isFetching}
											className="btn btn-singtel-go-primary mr-2"
										>
											{this.state.isSaving ? (
												<span>
													<i className="fas fa-spinner fa-pulse fa-lg" /> Saving selection
												</span>
											) : (
												'Next'
											)}
										</button>
									</div>
									<div className="col-auto p-2">or</div>
									<div className="col-auto p-2">
										<Link to={ROUTER_SD_ADDON} className="avenirHeavy">
											Back to Add-ons
										</Link>
									</div>
								</div>
							</MobileOnlyView>
						</React.Fragment>
					)}
					{this.state.isFetching && <Components.ContentLoading />}
				</div>
			</article>
		);
	}
}

export default observer(ContractTerms);
