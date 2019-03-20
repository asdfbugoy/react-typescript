import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { isMobileOnly, isTablet, isBrowser } from 'react-device-detect'
import PropTypes from 'prop-types'
import * as Globals from 'stores/global'
import Question from 'components/mscloud/tierplans/Question'
import { QuantityComponent } from 'components/QuantityComponent'
import { Collapsable, CollapsableButton, CollapsableContent } from 'components/Collapsable'
import Banner from 'components/BannerComponent'
import { ContentLoading } from './../../components/common/Loading'

class TierPlans extends React.Component {

	constructor(){
		super();
		this.state = {
			banner: {
				background: 'img/hero4.jpg',
				mobileBackground: 'img/hero4-mobile.jpg',
				textcolor: '',
				title: 'Tell Us Your Story'
			},
			isLoading: false
		}
		this.onReset = this.onReset.bind(this);
	}
	
	componentDidMount() {
		this.props.rootStore.productMSCloud.getQuestion()
	}

	toggleLoading = (state) => {
		this.setState(({isLoading: state}))
	}

	onReset() {
		this.props.rootStore.productMSCloud.resetCart()
	}

	renderPackageOffer = () => ({
		'MS-CLOUD-VM': <ManagedPlan packageOffer={this.props.rootStore.productMSCloud.getPackageOfferByName('MS-CLOUD-VM')} />,
		'MS-CLOUD-FBR': <FabricPlan packageOffer={this.props.rootStore.productMSCloud.getPackageOfferByName('MS-CLOUD-FBR')} />
	}[this.props.rootStore.productMSCloud.question.selectedValue])

	render() {
		const product = this.props.rootStore.productMSCloud
		return (
			<article className="main background-very-light-gray pb-2">
				<Banner {...this.state.banner} />
				<div className="container">
					{product.question ? <React.Fragment>
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
														<img src="img/aws-logo.png" />
													</div>
												</div>
											</a>
										</div>
										<div className="col-lg-4 col-md-4 mb-3">
											<div
												// href="javascript:void(0);"
												className="card border h-100"
												data-toggle="tooltip"
												data-placement="top"
												title=""
											>
												<div className="card-body">
													<div className="d-block text-center ">
														<img src="img/microsoft-logo-comming-soon.png" />
														<div className="d-block">Coming soon</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<Question product={product} toggleLoading={this.toggleLoading} />
								</div>
							</section>
						</section>
						{product.packageOffers && <React.Fragment>
							<h2 className="title-text text-center mt-5 mb-5">
								{product.getPackageOfferTitleByName()}
							</h2>
							<section className="mb-5">{this.state.isLoading ? <ContentLoading /> : this.renderPackageOffer()}</section>
						</React.Fragment>}
						<div className="mb-4">
							<div className="row align-items-center text-center text-sm-left">
								<div className="col-sm-auto">
									<Link to={Globals.ROUTER_MS_OVERVIEW} className="btn btn-singtel-go-primary">
										Save
								</Link>
								</div>
								<div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0">
									<span>or</span>
								</div>
								<div className="col-sm-auto">
									<button
										onClick={this.onReset}
										type="button"
										className="btn btn-link">Reset Order Cart</button>
								</div>
							</div>
						</div>
					</React.Fragment> : <ContentLoading />}
				</div>
			</article>
		)
	}
}

TierPlans.propTypes = {
	route: PropTypes.object,
	rootStore: PropTypes.object
}

export default observer(TierPlans)

const ManagedPlan = observer(class ManagedPlan extends React.Component {
	state = {
		screenSize: 0
	}
	componentDidMount() {
		window.addEventListener("resize", this.getScreenSize.bind(this))
		this.getScreenSize()
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.getScreenSize)
	}
	getScreenSize = () => {
		this.setState(({ screenSize: window.innerWidth }))
	}
	render() {
		const { packageOffer } = this.props
		const { productAttributes, products } = packageOffer
		return (
			<React.Fragment>
				{(isBrowser || isTablet) && <div className='table-responsive p-3'><div className="row" style={this.state.screenSize < 1280 ? { width: 1280 } : {}}>
					<div className="col m-0 pl-1 pr-1 text-center font-size-16-lg font-size-14">
						<div className="card border shadow">
							<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
								{productAttributes.map((d, i) => i > 0 ?
									<div key={i} className="d-flex flex-row justify-content-center align-items-center table-row-height">
										{d.label}
									</div>
									:
									<React.Fragment key={i}>
										<div className="d-flex flex-row justify-content-center" style={{ height: '50px' }}>
											<div className="sub-title-text">{d.label}</div>
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
											Quantity
										</div>
									</React.Fragment>
								)}
							</div>
						</div>
					</div>
					{products.map((d, i) =>
						<div className="col m-0 pl-1 pr-1" key={i}>
							<div className={`card border shadow ${d.qty ? 'selected checked' : ''}`}>
								<div className="card-body p-3 text-center">
									<div style={{ height: '50px', overflow: 'hidden' }}>
										<div className="sub-title-text">{d.label}</div>
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										<div className="mb-3">
											<QuantityComponent
												quantity={d.qty}
												onDecrementQuantity={d.decrementQty}
												onChangeQuantity={d.changeQty}
												onIncrementQuantity={d.increaseQty}
												min={0}
												max={50}
											/>
										</div>
									</div>
									{d.features.map((dFeatures, iFeatures) => iFeatures > 0 && <div key={iFeatures} className="d-flex flex-row justify-content-center align-items-center table-row-height">
										<div className="mb-3">
											<span>{dFeatures.label}</span>
										</div>
									</div>)}
								</div>
							</div>
						</div>
					)}
				</div></div>}
				{isMobileOnly && <MobilePlans packageOffer={packageOffer} />}
			</React.Fragment>
		)
	}
})

const FabricPlan = observer((props) => {
	const { packageOffer } = props
	const { title, description, products } = packageOffer

	return <React.Fragment>
		{products.map((d, i) => <div key={i} className={`card border shadow ${d.qty ? 'selected checked': ''}`}>
			<div className="card-body p-sm-4">
				<div className="row text-sm-left text-center">
					<div className="col-sm mb-3 mb-sm-0">
						<h3 className="sub-title-text">{title}</h3>
						<span>{description}</span>
					</div>
					<div className="col-sm-auto">
						<AddFabric data={d} />
					</div>
				</div>
			</div>
		</div>)}
	</React.Fragment>
})

const AddFabric = observer((props) => {
	const { data } = props
	const onClick = (e) => {
		e.preventDefault()
		data.qty > 0 ? data.changeQty(0) : data.changeQty(1)
	}
	return <div className="btn btn-singtel-go-primary" onClick={onClick}>{data.qty > 0 ? 'REMOVE' : 'ADD' }</div>
})

const MobilePlans = observer((props) => {
	const { packageOffer } = props
	const { products, productAttributes } = packageOffer
	return <React.Fragment>
		{products.map((d, i) => <Collapsable key={i}><MobilePlan d={d} productAttributes={productAttributes} /></Collapsable>)}
	</React.Fragment>
})

const MobilePlan = observer((props) => {
	const { d, productAttributes } = props
	return <div className={`card border shadow mb-5 ${d.qty ? ' checked': ''}`}>
		<div className="card-header background-very-light-gray">
			<CollapsableButton className="dark-blue no-underline" collapse={props.collapse}><h4 className="avenirHeavy">{d.label}</h4></CollapsableButton></div>
		<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
			<div className="mb-3">
				<QuantityComponent
					quantity={d.qty}
					onDecrementQuantity={d.decrementQty}
					onChangeQuantity={d.changeQty}
					onIncrementQuantity={d.increaseQty}
					min={0}
					max={50}
				/>
			</div>
		</div>
		<CollapsableContent collapse={props.collapse}>
			{d.features.map((dFeatures, iFeatures) => iFeatures > 0 ? <React.Fragment key={iFeatures}>
				<div className="card-header background-very-light-gray avenirHeavy">
					{productAttributes[iFeatures].label}
				</div>
				<div className="card-body">
					<div className="">{dFeatures.label}</div>
				</div>
			</React.Fragment> : null)}
		</CollapsableContent>
	</div>
})
