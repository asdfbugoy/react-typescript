import React from 'react';
import { ROUTER_SD_BASE, ROUTER_SD_SOLUTION } from '../stores/global';
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

class SDLan extends React.Component {
	state = {
		benefits: [
			{
				img: 'list-carousel0.png',
				title: 'Simplicity',
				description: 'One simple solution for all your networking needs. No interoperability and compability issues due to components from different brand names.'
			},
			{
				img: 'list-carousel1.png',
				title: 'Data-Driven Network Optimization',
				description: 'Identify key bottlenecks through our analytics, insights and optimize your network through out portal. (e.g. reduce priority of social media traffic)'
			},
			{
				img: 'list-carousel2.png',
				title: 'Greater insights and interaction with your end customers',
				description: "Direct your end customers to your company's website, Facebook page when they sign in to your guest wifi network. Gain inisghts of average dwell time, heat map of visitors to your premise."
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
						<h1 className="leading-text mb-3">Software-Defined LAN</h1>
						<p className="col-lg-10 ml-auto mr-auto">
							Singtel SD-LAN is a comprehensive suite of Software-Defined LAN networking solution that
							includes Security Appliance, Switches, Wireless Access Points and Security camer and is
							controlled and managed over the Cloud. The solution equip users with insights on their
							network utilization via an intuitive dashboard.
						</p>
						<div className="text-center mb-5">
							<img src={`img/SDLan-diagram.png`} style={{ width: '80%' }} />
						</div>
						<div>
							<Link to={ROUTER_SD_SOLUTION} className="btn btn-singtel-go-primary mb-2 mr-sm-3">
								Build Your Solution
							</Link>
							<a
								href="https://www.singtel.com/content/dam/singtel/business/products-and-services/data-center/Singtel-SD-LAN-Factsheet.pdf"
								target="_blank"
								className="btn btn-singtel-go-primary-inverted mb-2"
							>
								<i className="far fa-file-pdf mr-2 special-text" />
								<span>Singtel SD-LAN Fact Sheet</span>
							</a>
						</div>
					</div>
				</section>
				<section
					className="bg-img mb-4"
					style={{ backgroundImage: 'url(img/index-background1.jpg)', backgroundSize: '100%' }}
				>
					<div className="container">
						<h2 className="title-text white text-center pt-sm-5 pt-3 pb-5 text-shadow-black">
							How It Works
						</h2>
						<HowItWorks />
						<div className="col-lg-8 ml-auto mr-auto text-center">
							<div className="videoWrapper">
								<iframe
									width="853"
									height="480"
									src="https://www.youtube-nocookie.com/embed/wn0g8ctJyls?rel=0&amp;controls=0"
									frameBorder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
							<div className="special-text">Introduction Video for SD-LAN</div>
						</div>
					</div>
				</section>
				<section
					className="bg-img p-sm-5 p-2"
					style={{ backgroundImage: 'url(img/feature-background.jpg)', backgroundSize: '100%' }}
				>
					<div className="container">
						<Features />
						<AdvancedFeatures />
						<Benefits data={this.state.benefits} />
					</div>
				</section>
				<RecommendedFor />
				<OurPartner />
				<section className="before-footer mb-2 d-none" />
			</article>
		);
	}
}

export default SDLan;
class HowItWorks extends React.Component {
	render() {
		return (
			<React.Fragment>
				<BrowserView>
					<div className="card shadow mb-5">
						<div className="card-body pt-5 pb-5">
							<div className="row" style={{ minHeight: '205px' }}>
								<div className="col-sm text-center">
									<img src="img/icons/box.png" style={{ height: '50px', width: '50px' }} />
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Equipment such as LAN switches, wireless AP are deployed within your premise.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<img src="img/icons/star.png" style={{ height: '50px', width: '40px' }} />
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Enjoy a network that is configured based on your business needs.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<img src="img/icons/cursor.png" style={{ height: '50px', width: '50px' }} />
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Access our dashboard to gain insights on how your network is utilized.
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
									<img src="img/icons/box.png" style={{ height: '50px', width: '50px' }} />
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Equipment such as LAN switches, wireless AP are deployed within your premise.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<img src="img/icons/star.png" style={{ height: '50px', width: '40px' }} />
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Enjoy a network that is configured based on your business needs.
									</div>
								</div>
								<div className="col-sm border-left-sm border-0 text-center">
									<img src="img/icons/cursor.png" style={{ height: '50px', width: '50px' }} />
									<div className="special-text text-center mt-4 mb-4 mb-sm-0">
										Access our dashboard to gain insights on how your network is utilized.
									</div>
								</div>
							</div>
						</div>
					</div>
				</TabletView>
				<MobileOnlyView>
					<div className="row pt-5 pb-5">
						<div className="col-sm text-center">
							<img src="img/icons/box.png" style={{ height: '50px', width: '50px' }} />
							<div className="special-text text-center mt-4 mb-4 mb-sm-0">
								Equipment such as LAN switches, wireless AP are deployed within your premise.
							</div>
						</div>
						<div className="col-sm border-left-sm border-0 text-center">
							<img src="img/icons/star.png" style={{ height: '50px', width: '40px' }} />
							<div className="special-text text-center mt-4 mb-4 mb-sm-0">
								Enjoy a network that is configured based on your business needs.
							</div>
						</div>
						<div className="col-sm border-left-sm border-0 text-center">
							<img src="img/icons/cursor.png" style={{ height: '50px', width: '50px' }} />
							<div className="special-text text-center mt-4 mb-4 mb-sm-0">
								Access our dashboard to gain insights on how your network is utilized.
							</div>
						</div>
					</div>
				</MobileOnlyView>
			</React.Fragment>
		);
	}
}
class Features extends React.Component {
	render() {
		return (
			<div>
				<h2 className="title-text text-center mb-5">Features</h2>
				<div className="d-none d-lg-block">
					<div className="row pl-sm-5 pr-sm-5 pb-3">
						<div className="col-lg-5 mr-auto">
							<div className={`number-icon${isMobile ? '-center' : ''} mb-4`}>1</div>
							<p className={`mt-2 ${isMobile ? 'text-center' : ''}`}>
								Comprehensive set of devices for your networking needs ( SD-WAN / Security. Switches,
								Wireless Access Points, Security Camera)
							</p>
						</div>
						<div className="col-lg-5 ml-auto">
							<div className={`number-icon${isMobile ? '-center' : ''} mb-4`}>2</div>
							<p className={`mt-2 ${isMobile ? 'text-center' : ''}`}>
								Control all your devices from anywhere, anytime through our cloud based solution.
							</p>
						</div>
					</div>
					<div className="row pl-sm-5 pr-sm-5 pb-3">
						<div className="col-lg-5 col-md-12 mr-auto">
							<div className={`number-icon${isMobile ? '-center' : ''} mb-4`}>3</div>
							<p className={`mt-2 ${isMobile ? 'text-center' : ''}`}>
								Gain greater usage insights, including the applications that is utilizing the bandwidth
								via our user friendly web portal.
							</p>
						</div>
						<div className="col-lg-5 ml-auto">
							<div className={`number-icon${isMobile ? '-center' : ''} mb-4`}>4</div>
							<p className={`mt-2 ${isMobile ? 'text-center' : ''}`}>
								Provide guest wifi to your contractor and end customers and gain insights to their usage
								behaviour.
							</p>
						</div>
					</div>
					<div className="text-center">
						<img src="img/feature-diagram.jpg" style={{ width: '80%' }} />
					</div>
				</div>
				<div className="d-lg-none d-block">
					<div className={`row pt-2 pb-2 align-items-center`}>
						<div className={`col-md-1 offset-md-2 text-right p-3 mr-2`}>
							<div className={`number-icon${isMobile ? '-center' : ''}`}>1</div>
						</div>
						<div className={`col-md-7 mr-md-auto text-left`}>
							<p className="pt-3">
								Comprehensive set of devices for your networking needs ( SD-WAN / Security. Switches,
								Wireless Access Points, Security Camera)
							</p>
						</div>
					</div>
					<div className={`row pt-2 pb-2 align-items-center`}>
						<div className={`col-md-1 offset-md-2 text-right p-3 mr-2`}>
							<div className={`number-icon${isMobile ? '-center' : ''}`}>2</div>
						</div>
						<div className={`col-md-7 mr-md-auto text-left`}>
							<p className="pt-3">
								Control all your devices from anywhere, anytime through our cloud based solution.
							</p>
						</div>
					</div>
					<div className={`row pt-2 pb-2 align-items-center`}>
						<div className={`col-md-1 offset-md-2 text-right p-3 mr-2`}>
							<div className={`number-icon${isMobile ? '-center' : ''}`}>3</div>
						</div>
						<div className={`col-md-7 mr-md-auto text-left`}>
							<p className="pt-3">
								Gain greater usage insights, including the applications that is utilizing the bandwidth
								via our user friendly web portal.
							</p>
						</div>
					</div>
					<div className={`row pt-2 pb-2 align-items-center`}>
						<div className={`col-md-1 offset-md-2 text-right p-3 mr-2`}>
							<div className={`number-icon${isMobile ? '-center' : ''}`}>4</div>
						</div>
						<div className={`col-md-7 mr-md-auto text-left`}>
							<p className="pt-3">
								Provide guest wifi to your contractor and end customers and gain insights to their usage
								behaviour.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class AdvancedFeatures extends React.Component {
	render() {
		return (
			<div className={`${isMobile ? 'text-center' : ''}`}>
				<h2 className="title-text text-center mt-5 mb-5">Advanced Features with SD-LAN</h2>
				<div className="row pl-sm-5 pr-sm-5">
					<div
						className={`${isMobile
							? 'advancedFeatureBox pt-0 col-sm-12'
							: 'advancedFeatureBox col-lg-6 mr-auto'}`}
					>
						<img src="img/icons/advanced-security.png" style={{ height: '50px', width: '50px' }} />
						<h5 className="museoMedium title red pt-2">Advanced Security Appliance</h5>
						<p className="mt-2">
							Our Advanced Security License upgrade provides users access to Cisco AMP (Advanced Malware
							Protection) to protect their net work. Intrusion prevention (IPS) is performed via daily
							refreshed rule sets to ensure protection against the latest vulnerabilities-including
							exploits, viruses, rootkits. These updates are pushed via the cloud to MX customers within
							an hour-no manual staging or patching needed.
						</p>
					</div>
					<div
						className={`${isMobile
							? 'advancedFeatureBox pt-0 col-sm-12'
							: 'advancedFeatureBoxGray col-lg-6 mr-auto'}`}
					>
						<img src="img/icons/camera-analytics.png" style={{ height: '40px', width: '50px' }} />
						<h5 className="museoMedium title red pt-2">Camera Analytics</h5>
						<p className="mt-2">
							Our Security Camera is equipped with useful analytics. Dynamically select areas of interest
							in a video stream to find that missing laptop. Gain valuable insights to customer behaviour,
							facility utilization rate with our Motion Heat map. All Video Footage is stored directly in
							the Security Cameras, minimizing bandwith consumption from your network.
						</p>
					</div>
				</div>
				<div className="row pl-sm-5 pr-sm-5 mb-5">
					<div
						className={`${isMobile
							? 'advancedFeatureBox pt-0 col-sm-12'
							: 'advancedFeatureBoxGray col-lg-6 mr-auto'}`}
					>
						<img src="img/icons/shield.png" style={{ height: '50px', width: '40px' }} />
						<h5 className="museoMedium title red pt-2">PCI Compliance</h5>
						<p className="mt-2">
							Our security features address all of the PCI DSS requirements. This is important as it
							provides customer with the assurance of a secure network that protects cardholder data.
						</p>
					</div>
					<div
						className={`${isMobile
							? 'advancedFeatureBox pt-0 col-sm-12'
							: 'advancedFeatureBox col-lg-6 mr-auto'}`}
					>
						<img src="img/icons/24hour.png" style={{ height: '50px', width: '50px' }} />
						<h5 className="museoMedium title red pt-2">Managed Services with Active Monitoring</h5>
						<p className="mt-2">
							Allow Singtel to help you manage your network configurations while you focus on the
							operations needs of your business. Singtel SD-LAN is also equipped with 24x7 Active
							Monitoring service to ensure any network issue is attended to immediately. Remember, human
							neeeds to rest but your network never sleeps.
						</p>
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
								Recommended for organisations who:
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
							<ul className="list-unstyled custom-list">
								<li>
									<span>
										- Businesses with multiple sites who want to transition to mixed network models
										that are easier to scale to changing business demands.
									</span>
								</li>
								<li>
									<span>
										- Businesses who are planning to undergo digital transformation to future-proof
										their networks.
									</span>
								</li>
								<li>
									<span>
										- Businesses who want to streamline their operations by centralising control for
										routine administration tasks.
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

class OurPartner extends React.Component {
	render() {
		return (
			<section className="bg-img p-sm-5 p-2 d-none" style={{ backgroundImage: 'url()' }}>
				<div className="container">
					<h2 className="title-text text-center mb-5">Our Partner</h2>
					<div className="row text-center mb-5 pl-sm-5 pr-sm-5">
						<div className="col-lg-6">
							<div className="videoWrapper">
								<iframe
									width="560"
									height="315"
									src="https://www.youtube-nocookie.com/embed/v5ICdHsiNKU"
									frameBorder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						</div>
						<div className="col-lg-6 ml-auto" style={{ margin: 'auto' }}>
							<div className="row pb-2">
								<img className="ciscoMerakiLogo" src="img/cisco-meraki-logo.png" />
							</div>
							<span>
								Identify with network and configuration are done seamlessly based on business
								objectives.
							</span>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
