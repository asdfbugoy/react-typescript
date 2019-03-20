import React from 'react';
import { ROUTER_SD_BASE, ROUTER_HOME, ROUTER_MS_TIERPLANS } from '../stores/global';
import { Link } from 'react-router-dom';
import {
	isMobile,
	isTablet,
	isBrowser,
	BrowserView,
	MobileView,
	isMobileOnly,
	MobileOnlyView,
	TabletView
} from 'react-device-detect'
import Benefits from 'components/Benefits'

class MSCloud extends React.Component {
	state = {
		benefits: [
			{
				img: 'mscloud-list-carousel0.png',
				title: 'Quick and elastic deployment',
				description: `Businesses can provision IT resources within minutes, compared to the few months that it could take if they were to set up their own infrastructure. Servers and other IT resources can be scaled up or down anytime easily depending on the business's workload and performance requirements.`
			},
			{
				img: 'mscloud-list-carousel1.png',
				title: 'High availability and robust security',
				description: `Delivers high service availability and automatically captures snapshots of the servers for instant recovery.`
			},
			{
				img: 'mscloud-list-carousel2.png',
				title: 'Greater insights and interaction with your end customers',
				description: `No upfront capital expenditure.
                Businesses only pay for what they use, on a monthly basis.`
			}
		]
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<article className="index main">
				<section className="text-center background-very-light-gray pt-5 pb-5">
					<div className="container">
						<h1 className="leading-text mb-3">Managed Public Cloud</h1>
						<p className="col-lg-10 ml-auto mr-auto">
							Singtel Managed Public Cloud supports enterprises in their business transformation by
							offering the most advanced and widely-used public cloud technology in the industry. This is
							backed by strong cloud expertise and an in-depth understanding of IT needs. With this,
							enterprises today can just look to a single cloud service provider and choose the managed
							public cloud infrastructure services that best fit their business.
						</p>
						<h4 className="museo mb-3">Supported Cloud Providers</h4>
						<img className="m-3" src="img/aws-logo.png" style={{ height: '50px', width: '140px' }} />
						<img className="m-3" src="img/microsoft-logo.png" style={{ height: '29px', width: '132px' }} />
						<div className="mt-3 mb-3">
							<Link to={ROUTER_MS_TIERPLANS} className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0">
								See Plans
							</Link>
							<Link to="" className="d-none btn btn-singtel-go-primary-inverted">
								<i className="far fa-file-pdf mr-2 special-text" />
								<span>Managed Public Cloud Fact Sheet</span>
							</Link>
						</div>
					</div>
				</section>
				<section
					className="bg-img mb-4"
					style={{ backgroundImage: 'url(img/mscloud-banner.jpg)', backgroundSize: '100%' }}
				>
					<div className="container">
						<h2 className="title-text white text-center pt-sm-5 pt-3 pb-5 text-shadow-black">
							How It Works
						</h2>
						<HowItWorks />
					</div>
				</section>
				<section
					className="bg-img p-sm-5 p-2"
					style={{ backgroundImage: 'url(img/feature-background.jpg)', backgroundSize: '100%' }}
				>
					<div className="container">
						<Features />
						<Benefits data={this.state.benefits} />
					</div>
				</section>
				<RecommendedFor />
				<section className="before-footer mb-2 d-none" />
			</article>
		);
	}
}

export default MSCloud;
class HowItWorks extends React.Component {
	render() {
		return (
			<div>
				<BrowserView>
					<div className="card shadow mb-5">
						<div className="card-body pt-5 pb-5">
							<div className="row" style={{ minHeight: '205px' }}>
								<div className="col-sm text-center">
									<div className="number-icon-center mb-4">1</div>
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Share with us your AWS account details.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<div className="number-icon-center mb-4">2</div>
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Enable your environment to become connected to our management infrastructure.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<div className="number-icon-center mb-4">3</div>
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Set up a monitoring and patching schedule to make sure your cloud needs are
										stable and secure.
									</div>
								</div>
							</div>
						</div>
					</div>
				</BrowserView>
				<TabletView>
					<div className="card shadow mb-5">
						<div className="card-body pt-5 pb-5">
							<div className="row">
								<div className="col-sm text-center">
									<div className="number-icon-center mb-4">1</div>
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Share with us your AWS account details.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<div className="number-icon-center mb-4">2</div>
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Enable your environment to become connected to our management infrastructure.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<div className="number-icon-center mb-4">3</div>
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Set up a monitoring and patching schedule to make sure your cloud needs are
										stable and secure.
									</div>
								</div>
							</div>
						</div>
					</div>
				</TabletView>
				<MobileOnlyView>
					<div className="row pt-5 pb-5">
						<div className="col-sm text-center">
							<div className="number-icon-center mb-4">1</div>
							<div className="special-text text-center mt-4 mb-4 mb-sm-0">
								Share with us your AWS account details.
							</div>
						</div>
						<div className="col-sm border-left-sm border-0 text-center">
							<div className="number-icon-center mb-4">2</div>
							<div className="special-text text-center mt-4 mb-4 mb-sm-0">
								Enable your environment to become connected to our management infrastructure.
							</div>
						</div>
						<div className="col-sm border-left-sm border-0 text-center">
							<div className="number-icon-center mb-4">3</div>
							<div className="special-text text-center mt-4 mb-4 mb-sm-0">
								Set up a monitoring and patching schedule to make sure your cloud needs are stable and
								secure.
							</div>
						</div>
					</div>
				</MobileOnlyView>
			</div>
		);
	}
}
class Features extends React.Component {
	render() {
		return (
			<div>
				<h2 className="title-text text-center mb-5">Features</h2>
				<div className="row text-center mb-4">
					<div className="col-lg-3 col-md-3 col-6 mb-3">
						<img src="img/icons/shield.png" style={{ height: '50px', width: '40px' }} />
						<p className="pt-3">Patching</p>
					</div>
					<div className="col-lg-3 col-md-3 col-6 mb-3">
						<img src="img/icons/settings.png" style={{ height: '50px', width: '50px' }} />
						<p className="pt-3">Fault Resolution</p>
					</div>
					<div className="col-lg-3 col-md-3 col-6 mb-3">
						<img src="img/icons/eye.png" style={{ height: '50px', width: '70px' }} />
						<p className="pt-3">Proactive Monitoring</p>
					</div>
					<div className="col-lg-3 col-md-3 col-6 mb-3">
						<img src="img/icons/24hour.png" style={{ height: '50px', width: '50px' }} />
						<p className="pt-3">24/7 Operations Support</p>
					</div>
				</div>
			</div>
		);
	}
}

class RecommendedFor extends React.Component {
	render() {
		return (
			<section
				className="bg-img p-sm-5 p-2"
				style={{
					backgroundImage: `url(img/index-background3${isMobile
						? `${isTablet ? '-tablet' : '-mobile'}`
						: ''}.jpg)`,
					backgroundSize: `${isBrowser ? 'cover' : ''}`,
					height: `${isMobile ? `${isTablet ? '100%' : '721px'}` : '438px'}`,
					backgroundPosition: `center center`
				}}
			>
				<div className="container">
					<div className={`row ${isMobileOnly ? 'pl-3' : ''}`} style={{ paddingBottom: '30px' }}>
						<div className={`${isMobile ? '' : 'col-lg-12 col-md-8 col-sm-8'}`}>
							<h2 className={`title-text mt-3 ${isMobile ? 'mb-3' : 'mb-0'}`}>
								Recommended for
							</h2>
						</div>
					</div>

					<div
						className="row"
						style={{
							paddingTop: `${isBrowser ? '30px' : ''}`,
							paddingBottom: `${isBrowser ? '30px' : ''}`
						}}
					>
						<div className={`${isMobileOnly ? 'col-sm-12' : 'col-lg-6 col-md-6 col-sm-8'}`}>
							<ul>
								<li className="pt-2 pb-2">
									<span>Businesses looking for a partner to support them on the cloud journey.</span>
								</li>
								<li className="pt-2 pb-2">
									<span>
										Businesses who want to streamline their operations by centralising patching and
										monitoring of their AWS infrastructure.
									</span>
								</li>
								<li className="pt-2 pb-2">
									<span> Businesses who want to migrate their existing virtual machines to AWS.</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
