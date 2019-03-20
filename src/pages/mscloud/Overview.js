import React from 'react';
import Banner from '../../components/BannerComponent';
import { QuantityComponent } from '../../components/QuantityComponent';
import Checkbox from '@material-ui/core/Checkbox';
import { BrowserView, TabletView, MobileOnlyView, isMobileOnly } from 'react-device-detect';
import { Collapsable, CollapsableContent, CollapsableButton } from '../../components/Collapsable';
import { ROUTER_MS_CONTRACT_TERMS, ROUTER_MS_ADDONS, ROUTER_MS_TIERPLANS } from '../../stores/global';
import { Link } from 'react-router-dom';
import ProgressStep from './../../components/ProgressStep';
import { observer } from 'mobx-react'

class Overview extends React.Component {
	state = {
		banner: {
			background: 'img/hero4.jpg',
			mobileBackground: 'img/hero4-mobile.jpg',
			textcolor: '',
			title: 'Overview'
		}
	}
	componentDidMount() {
		this.props.rootStore.productMSCloud.sortPackageOffers()
	}

	onClickContractTerms = () => (e) => {
		this.props.history.push(ROUTER_MS_CONTRACT_TERMS);
	}

	onClickTierPlans = () => (e) => {
		this.props.route.history.push(ROUTER_MS_TIERPLANS);
	}

	render() {
		const packageOffer = this.props.rootStore.productMSCloud.packageOffers
		return (
			<article className="main background-very-light-gray pb-5">
				<Banner {...this.state.banner} />
				<div className="container">
					<ProgressStep />
					<h2 className="title-text text-center mb-5">My Selected Services</h2>
					<section>
						{packageOffer.map((d, i) =>
							<React.Fragment key={i}>
								{d.products.map((dProducts, iProducts) => dProducts.qty ? <div key={iProducts} className="card border shadow mb-4">
									<div className="card-body">
										<div className="row m-2">
											<span className="mr-5 sub-title-text">{d.name} - {dProducts.name}</span>
										</div>
										<div className="row m-2 align-items-center">
											<div className="col-lg-1 col-md-1 col-sm-1 text-center p-0 d-none d-sm-block">
												<DeleteButton products={dProducts} />
											</div>
											<div className="col-lg-9 col-md-9 col-sm-auto mb-3 mb-sm-0">
												<div className="card background-very-light-gray">
													<div className="card-body p-4">
														<div className="row">
															<div className="col-sm">
																<ul className="list-unstyled row mb-0">
																	{dProducts.features.length > 0 ?
																		dProducts.features.map((dFeatures, iFeatures) =>
																			iFeatures > 0 && <li key={iFeatures} className="col-lg-6 col-md-12 col-sm-12 mb-2">- {dFeatures.label}</li>
																		)
																		:
																		<li className="col-sm-12">{d.description}</li>
																	}
																</ul>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div className="col-lg-2 col-md-2 col-sm-3 mb-4 p-md-0">
												<div className="text-center">
													{dProducts.dataType === 'number' ? <React.Fragment>
														<small>No. of VMs</small>
														<QuantityComponent
															quantity={dProducts.qty}
															onDecrementQuantity={dProducts.decrementQty}
															onChangeQuantity={dProducts.changeQty}
															onIncrementQuantity={dProducts.increaseQty}
															min={1}
															max={50}
														/>
													</React.Fragment> : null}
													{dProducts.dataType === 'checkbox' ? <i className="fa fa-check"></i> : null}
												</div>
											</div>
										</div>
										<div className="d-sm-none text-center">
											<div className="">
												<button type="button" className="btn btn-icon">
													<i className="fa fa-trash-alt" />
												</button>
											</div>
										</div>
									</div>
								</div> : null)}
							</React.Fragment>
						)}
						<div className="card border shadow mb-5">
							<div className={`card-body ${isMobileOnly ? 'text-center' : ''}`}>
								<button onClick={this.onClickTierPlans()} type="button" className="btn btn-singtel-go-primary-inverted">
									Add Another Plan
								</button>
							</div>
						</div>
					</section>

					<div className="row align-items-center text-center text-sm-left">
						<div className="col-sm-auto">
							{ this.props.rootStore.productMSCloud.__isStep_Addon_Ready ?
								<Link 
									to={ROUTER_MS_ADDONS} 
									className="btn btn-singtel-go-primary">Next</Link> : 
								<button 
									disabled
									type="button" 
									className="btn btn-singtel-go-primary btn-disabled">Next</button>
							}
						</div>
						<div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0">
							<span />
						</div>
						<div className="col-sm-auto">
							<a href="" className="avenirHeavy" />
						</div>
					</div>
				</div>
			</article>
		);
	}
}

export default observer(Overview)

const DeleteButton = observer((props) => {
	const { changeQty } = props.products
	const onClick = (e) => {
		e.preventDefault()
		changeQty(0)
	}
	return <button type="button" className="btn btn-icon" onClick={onClick}>
		<i className="fa fa-trash-alt" />
	</button>
})

const NewView = (props) => {
	const { product } = props
	return (
		<section className="mb-5">
			{product.map((d, i) => (
				<div key={i} className="card border shadow mb-2">
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col text-center text-sm-left">
								<div className="avenirHeavy">{d.name}</div>
								<div className="">{d.description}</div>
								<div className="">{d.caption}</div>
							</div>
							<div className="col-md-3 col-lg-2 text-center">
								{d.type === 'checkbox' && <Checkbox />}
								{d.type === 'quantity' && <QuantityComponent />}
							</div>
						</div>
					</div>
				</div>
			))}
		</section>
	)
}
