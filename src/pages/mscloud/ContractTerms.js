import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { ROUTER_MS_CUSTOMER_INFORMATION, ROUTER_MS_ADDONS } from 'stores/global';
import Banner from 'components/BannerComponent';
import { Collapsable, CollapsableContent, CollapsableButton } from 'components/Collapsable';
import * as Components from 'components/contract-terms';
import ProgressStep from 'components/ProgressStep';
import { CardLoading, OverlayLoading, ContentLoading } from 'components/common/Loading';
import "abortcontroller-polyfill"

const tempState = {
	banner: {
		background: 'img/hero4.jpg',
		mobileBackground: 'img/hero4-mobile.jpg',
		textcolor: '',
		title: 'Contract Terms & Conditions'
	}
};

class PriceSummary extends React.Component {
	constructor(){
		super();
		this.state = {
			isLoading: false,
			priceSummary: []
		}
		this.abortController = new window.AbortController();
	}
	componentDidMount() {
        this.getPriceSummary()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.duration !== this.props.duration) this.getPriceSummary()
	}
	componentWillUnmount(){
		this.abortController.abort();
	}
    getPriceSummary() {
		this.setState(({isLoading: true}))
		this.props.productStore
			.getPriceSummary({
				signal: this.abortController.signal
			})
			.then( data => {
				this.setState({
					priceSummary: data.priceSummary, 
					isLoading: false
				});
			})
    }
    render() {
        const styleFix = {
            height: '100px',
            overflow: 'hidden'
		};
		const {duration } = this.props;
		return <React.Fragment> 
			<OverlayLoading open={this.state.isLoading} transparent={true} scrollable={true} /> 
			{ this.state.isLoading ? <CardLoading /> : <section className="price-summary">
				<div className="card shadow mb-4 border p-0">
					<div className="card-body p-sm-0 p-2">
						<CollapsableButton className="read-details dark-blue d-block p-3 no-underline" collapse={this.props.collapse}>
							<h4 className="museo mb-0">Price Summary ( for {duration} Months contract )</h4>
						</CollapsableButton>
						<CollapsableContent collapse={this.props.collapse}>
							<div className="pt-3 table-responsive">
								<table className="table table-bordered">
									<thead className="thead-light">
										<tr>
											<th scope="col" />
											<th scope="col" className="text-center">Upfront cost</th>
											<th scope="col" className="text-center">Monthly cost</th>
											<th scope="col" className="text-center">Quantity</th>
											<th scope="col" className="text-center">Grand total</th>
										</tr>
									</thead>
									<tbody>
										{ this.state.priceSummary.length > 0 && this.state.priceSummary.map( (product, index) =>
											<tr key={index}>
												<th scope="row">{product.name}</th>
												<td align="right">
													{ product.upfrontCost > 0 ? 
														`${product.currency} ${product.upfrontCost.toLocaleString('en')}` :
														'-'
													}
												</td>
												<td align="right">
													{ product.monthlyCost > 0 ? 
														`${product.currency} ${product.monthlyCost.toLocaleString('en')}` :
														'-'
													}
												</td>
												<td align="center">{product.qty}</td>
												<td align="right">{`${product.currency} ${product.grandTotal.toLocaleString('en')}`}</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</CollapsableContent>
					</div>
				</div>
			</section> }
		</React.Fragment>
	}
}

class ContractTerms extends React.Component {
	constructor(){
		super();
		this.state = {
			isLoading: false,
			contracts: [],
			isSaving: false,
			isPriceReady: false,
		}
		this.onProceedCustomerPage = this.onProceedCustomerPage.bind(this);
		//
		this.abortController = new window.AbortController();
	}

	componentDidMount(){
		if ( this.props.rootStore.productMSCloud.__isStep_Term_Ready ){
			this.setState({
				isLoading: true
			})
			this.props.rootStore.productMSCloud
				.getContractTerms({
					signal: this.abortController.signal
				})
				.then( () => {
					this.setState({
						isLoading: false,
						isPriceReady: true
					});
				})
				.catch( error => {
					this.setState({
						isLoading: false
					});
				})
		}
		
	}

	componentWillUnmount(){
		this.abortController.abort();
	}

	onProceedCustomerPage(){
		this.setState({ isSaving: true });
		this.props.rootStore.productMSCloud
			.saveSelectedTerm()
			.then( result => {
				this.setState({ isSaving: false });
				if ( result ) this.props.route.history.push( ROUTER_MS_CUSTOMER_INFORMATION );
			})
			.catch( error => {
				this.setState({ isSaving: false });
			})
	}

	render() {
		const { productMSCloud } = this.props.rootStore;
		const { __selectedTerm } = productMSCloud;
		return (
			<article className="main background-very-light-gray pb-5">
				<Banner {...tempState.banner} />
				<div className="container">
					<ProgressStep />
					{!this.state.isLoading && productMSCloud.__isStep_Term_Ready && 
					<React.Fragment>
						<div>
							<h2 className="title-text text-center mb-5 mt-5">Available Contract Duration</h2>
							<section className="mb-4">
								<div className="row">
									{productMSCloud.__sortedContractTerms.map((term, i) => (
										<div key={i} className="col-md mb-3">
											<Components.TermOption
												term={term}
												selectedDuration={productMSCloud.selectedDuration}
											/>
										</div>
									))}
								</div>
							</section>
						</div>
					</React.Fragment> }

					{ this.state.isPriceReady && <React.Fragment>
						<Collapsable>
							<PriceSummary
								productStore={productMSCloud}
								duration={productMSCloud.selectedDuration}
							/>
						</Collapsable>


						<section className="mb-5">
							<div className="card shadow mb-4 border">
								<div className="card-body">
									<div className="row align-items-center">
										<div className="col-sm">
											<div className="title-text text-center">Total</div>
										</div>
										<div className="col-sm border-left-sm border-0">
											<div className="row text-center">
												<div className="col">
													<div>
														Estimated <br /> Upfront Cost <br />(excludes GST)
													</div>
													<div className="font-size-32 museoMedium blue">
														{__selectedTerm.__otcWithCurrency}
													</div>
												</div>
												<div className="col">
													<div>
														Estimated <br /> Monthly Payment <br />(excludes GST)
													</div>
													<div className="font-size-32 museoMedium blue">
														{__selectedTerm.__rcWithCurrency}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
						<div className="row align-items-center text-center text-sm-left">
							<div className="col-sm-auto">
								<button 
									disabled={ this.state.isSaving }
									onClick={ this.onProceedCustomerPage }
									type="button" 
									className="btn btn-singtel-go-primary">
									{this.state.isSaving ?
										<span><i className="fas fa-spinner fa-pulse fa-lg" /> Saving ...</span> :
										'Next'}
								</button>
							</div>
							{/* <div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0">
								<span>or</span>
							</div>
							<div className="col-sm-auto">
								{ this.state.isSaving ?
									<a href={null} className="avenirHeavy">Back to Add-ons</a> :
									<Link to={ROUTER_MS_ADDONS} className="avenirHeavy">Back to Add-ons</Link>
								}
							</div> */}
						</div>
						</React.Fragment>
					}

					{ this.state.isLoading && !this.state.isPriceReady && <Components.ContentLoading /> }
				</div>
			</article>
		);
	}
}

export default observer(ContractTerms);

