import React from 'react';
import { ROUTER_SD_BASE, ROUTER_HOME, ROUTER_MS_CLOUD_BASE, ROUTER_SD_SOLUTION } from '../stores/global';
import { Link } from 'react-router-dom';
import {
	isMobile,
	isTablet,
	isBrowser,
	BrowserView,
	MobileView,
	isMobileOnly,
	MobileOnlyView,
	TabletView,
	mobileModel
} from 'react-device-detect';

class Home extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<article className="index main">
				<MainBanner />
				<section
					className="pb-3"
					style={{
						backgroundImage: 'url(img/index-background.jpg)',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						width: '100%',
						backgroundRepeat: 'repeat-y'
					}}
				>
					<div className="container">
						<SDLanAndMSCloud />
						<h2 className="title-text text-center mt-4 mb-4">Features</h2>
						<Features />
					</div>
				</section>
				<Benefits />
			</article>
		);
	}
}

export default Home;

class MainBanner extends React.Component {
	render() {
		return (
			<section className={`main-banner`}>
				<div className="container">
					<div className={`row ${isMobile ? 'p-3' : 'pt-5 pb-5'}`}>
						<div className={`${isMobile ? `${isTablet ? 'col' : 'col'}` : 'col'}`}>
							<h1 className="banner-text text-shadow-white leading-text">
								Seamless ICT Solutions<br /> For Growing Enterprise<br />
							</h1>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

class SDLanAndMSCloud extends React.Component {
	render() {
		return (
			<div>
				<div className="row pb-3 pt-5">
					<div className="col-lg-4 pb-3">
						<div
							className="img-container"
							style={{
								backgroundImage:
									'linear-gradient(to bottom, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%),  url(img/sdlan-img.jpg)'
							}}
						>
							<h2
								className="img-content title-text text-left"
								style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.6)' }}
							>
								SD-LAN
							</h2>
						</div>
						<div className="card shadow">
							<div className={`card-body p-sm-4 ${isMobile ? 'text-center' : ''}`}>
								<p className="text-left">
									Singtel GO SD-LAN is a comprehensive networking solution that covers both your Local
									Area Network (LAN) and Wide Area Network (WAN).
								</p>
								<p>
									You can manage firewall, anti-malware, switches, access points, and security cameras
									through a single touch point.
								</p>
								<Link to={ROUTER_SD_BASE} className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0">
									Learn More
								</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-4 pb-3">
						<div
							className="img-container"
							style={{
								backgroundImage:
									'linear-gradient(to bottom, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%) ,  url(img/cloud-img.jpg)'
							}}
						>
							<h2
								className="img-content title-text white text-left"
								style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.6)' }}
							>
								MANAGED <br />PUBLIC CLOUD
							</h2>
						</div>
						<div className="card shadow">
							<div className={`card-body p-sm-4 ${isMobile ? 'text-center' : ''}`}>
								<p className="text-left">
									Singtel GO Cloud allows user to manage Windows and Linux servers. <br />With a
									secured native cloud tooling approach, the management tool can be deployed within
									minutes.
								</p>
								<p>
									This service includes 24x7 operation support, patch management, monitoring of
									thresholds and fault resolutions.
								</p>
								<Link
									to={ROUTER_MS_CLOUD_BASE}
									className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0"
								>
									Learn More
								</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-4 pb-3">
						<div
							className="img-container"
							style={{
								backgroundImage:
									'linear-gradient(to bottom, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%) ,  url(img/cloud-img.jpg)'
							}}
						>
							<h2
								className="img-content title-text white text-left"
								style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.6)' }}
							>
								CYBER <br />SECURITY
							</h2>
						</div>
						<div className="card shadow">
							<div className={`card-body p-sm-4 ${isMobile ? 'text-center' : ''}`}>
								<p className="text-left">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<Link
									to={ROUTER_MS_CLOUD_BASE}
									className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0"
								>
									Learn More
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class Features extends React.Component {
	render() {
		return (
			<div>
				<BrowserView>
					<div className={`row text-left pt-4 pb-4`}>
						<div className={`col-lg-6 col-md-6 mb-3`}>
							<img src="img/icons/light-bulb.png" style={{ height: '50px', width: '50px' }} />
							<h4 className="museo title pt-2">Simple and robust solutions</h4>
							<p className="mt-2">
								Carefully designed based on our in-depth experience of network solutioning.
							</p>
						</div>
						<div className="col-lg-6 col-md-6 mb-3">
							<img src="img/icons/aeroplane.png" style={{ height: '50px', width: '50px' }} />
							<h4 className="museo title pt-2">Proactive management</h4>
							<p className="mt-2">
								All Singtel GO solutions are proactively managed by us. Singtel will take ownership
								andbe responsible for the deployed assets.
							</p>
						</div>
						<div className="col-lg-6 col-md-6 mb-3">
							<img src="img/icons/scalable.png" style={{ height: '50px', width: '60px' }} />
							<h4 className="museo title pt-2">Flexible pricing model</h4>
							<p className="mt-2">
								We provide you with the flexibility to manage and plan your budget. Pick your balance
								between upfront fees and recurring fees.
							</p>
						</div>
						<div className="col-lg-6 col-md-6 mb-3">
							<img src="img/icons/person.png" style={{ height: '50px', width: '50px' }} />
							<h4 className="museo title pt-2">Fast track service</h4>
							<p className="mt-2">
								Get your customised quote and order instantly with our single touchpoint platform.
							</p>
						</div>
					</div>
				</BrowserView>
				<TabletView>
					<div className="d-none d-lg-block">
						<div className={`row text-left pt-4 pb-4`}>
							<div className={`col-lg-6 col-md-6 mb-3`}>
								<img src="img/icons/light-bulb.png" style={{ height: '50px', width: '50px' }} />
								<h4 className="museo title pt-2">Simple and robust solutions</h4>
								<p className="mt-2">
									Carefully designed based on our in-depth experience of network solutioning.
								</p>
							</div>
							<div className="col-lg-6 col-md-6 mb-3">
								<img src="img/icons/aeroplane.png" style={{ height: '50px', width: '50px' }} />
								<h4 className="museo title pt-2">Proactive management</h4>
								<p className="mt-2">
									All Singtel GO solutions are proactively managed by us. Singtel will take ownership
									andbe responsible for the deployed assets.
								</p>
							</div>
							<div className="col-lg-6 col-md-6 mb-3">
								<img src="img/icons/scalable.png" style={{ height: '50px', width: '60px' }} />
								<h4 className="museo title pt-2">Flexible pricing model</h4>
								<p className="mt-2">
									We provide you with the flexibility to manage and plan your budget. Pick your
									balance between upfront fees and recurring fees.
								</p>
							</div>
							<div className="col-lg-6 col-md-6 mb-3">
								<img src="img/icons/person.png" style={{ height: '50px', width: '50px' }} />
								<h4 className="museo title pt-2">Fast track service</h4>
								<p className="mt-2">
									Get your customised quote and order instantly with our single touchpoint platform.
								</p>
							</div>
						</div>
					</div>
					<div className="d-lg-none d-block">
						<div className={`row pt-2 pb-2 align-items-center`}>
							<div className={`col-md-2 offset-md-1 text-right pr-0`}>
								<img src="img/icons/light-bulb.png" style={{ height: '50px', width: '50px' }} />
							</div>
							<div className={`col-md-7 mr-md-auto text-left`}>
								<h4 className="museo title pt-2">Simple and robust solutions</h4>
								<p className="mt-2">
									Carefully designed based on our in-depth experience of network solutioning.
								</p>
							</div>
						</div>
						<div className={`row pt-2 pb-2 align-items-center`}>
							<div className={`col-md-2 offset-md-1 text-right pr-0`}>
								<img src="img/icons/aeroplane.png" style={{ height: '50px', width: '50px' }} />
							</div>
							<div className={`col-md-7 mr-md-auto text-left`}>
								<h4 className="museo title pt-2">Proactive management</h4>
								<p className="mt-2">
									All Singtel GO solutions are proactively managed by us. Singtel will take ownership
									and be responsible for the deployed assets.
								</p>
							</div>
						</div>
						<div className={`row pt-2 pb-2 align-items-center`}>
							<div className={`col-md-2 offset-md-1 text-right pr-0`}>
								<img src="img/icons/scalable.png" style={{ height: '40px', width: '50px' }} />
							</div>
							<div className={`col-md-7 mr-md-auto text-left`}>
								<h4 className="museo title pt-2">Flexible pricing model</h4>
								<p className="mt-2">
									We provide you with the flexibility to manage and plan your budget. Pick your
									balance between upfront fees and recurring fees.
								</p>
							</div>
						</div>
						<div className={`row pt-2 pb-2 align-items-center`}>
							<div className={`col-md-2 offset-md-1 text-right pr-0`}>
								<img src="img/icons/person.png" style={{ height: '50px', width: '50px' }} />
							</div>
							<div className={`col-md-7 mr-md-auto text-left`}>
								<h4 className="museo title pt-2">Fast track service</h4>
								<p className="mt-2">
									Get your customised quote and order instantly with our single touchpoint platform.
								</p>
							</div>
						</div>
					</div>
				</TabletView>
				<MobileOnlyView>
					<div className={`row text-${isMobile ? 'center' : 'left'} pt-4 pb-4`}>
						<div className={`col-lg-6 col-md-6 mb-3`}>
							<img src="img/icons/light-bulb.png" style={{ height: '50px', width: '50px' }} />
							<h4 className="museo title pt-2">Simple and robust solutions</h4>
							<p className="mt-2">
								Carefully designed based on our in-depth experience of network solutioning.
							</p>
						</div>
						<div className="col-lg-6 col-md-6 mb-3">
							<img src="img/icons/aeroplane.png" style={{ height: '50px', width: '50px' }} />
							<h4 className="museo title pt-2">Proactive management</h4>
							<p className="mt-2">
								All Singtel GO solutions are proactively managed by us. Singtel will take ownership
								andbe responsible for the deployed assets.
							</p>
						</div>
						<div className="col-lg-6 col-md-6 mb-3">
							<img src="img/icons/scalable.png" style={{ height: '50px', width: '60px' }} />
							<h4 className="museo title pt-2">Flexible pricing model</h4>
							<p className="mt-2">
								We provide you with the flexibility to manage and plan your budget. Pick your balance
								between upfront fees and recurring fees.
							</p>
						</div>
						<div className="col-lg-6 col-md-6 mb-3">
							<img src="img/icons/person.png" style={{ height: '50px', width: '50px' }} />
							<h4 className="museo title pt-2">Fast track service</h4>
							<p className="mt-2">
								Get your customised quote and order instantly with our single touchpoint platform.
							</p>
						</div>
					</div>
				</MobileOnlyView>
			</div>
		);
	}
}
class Benefits extends React.Component {
	render() {
		return (
			<section className="benefits-banner">
				<div className="container">
					<div className="row">
						<div className="col">
							<h2 className="title-text text-center mt-4">Benefits</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 col-md-7">
							<h5 className="museo title pt-2">- Optimised for your business</h5>
							<p className="mb-3">
								Carefully designed based on our in-depth experience of network solutioning.
							</p>
							<h5 className="museo title pt-2">- Hassle-free</h5>
							<p className="mb-3">
								Enjoy hassle-free service with round the clock support. This leaves you with more time
								to focus on things that drives your business.
							</p>
							<h5 className="museo title pt-2">- Take charge of your budget</h5>
							<p className="mb-3">
								Have more control of your spending expenditure. Say no to unexpected capital expenses
								that impede your business plans.
							</p>
							<h5 className="museo title pt-2">- Fast and effective engagements</h5>
							<p className="mb-5">
								Save time and effort without the need for multiple engagmements. Make a quick and
								informed decision with pricing stated upfront.
							</p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
