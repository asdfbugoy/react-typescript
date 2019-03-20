import React from 'react'
import PropTypes from 'prop-types'
import { MobileView, isMobileOnly, BrowserView } from 'react-device-detect'

class BannerComponent extends React.PureComponent {
	render() {
		const { mobileBackground, background, title, textcolor } = this.props;
		const mobileBkg = mobileBackground ? mobileBackground : background;

		return (
			<React.Fragment>
				<BrowserView>
					<section
						className={`hero d-flex align-items-center ${textcolor}`}
						style={{ backgroundImage: `url('${background}')` }}
					>
						<div className="container">
							<h2 className="leading-text mb-0">{title}</h2>
						</div>
					</section>
				</BrowserView>
				<MobileView>
					<section
						className={`hero-${isMobileOnly ? 'mobile' : 'tablet'} d-flex align-items-center ${textcolor}`}
						style={{ backgroundImage: `url('${mobileBkg}')` }}
					>
						<div className="container">
							<div className="row">
								<div className="col-7">
									<h2 className={`hero-${isMobileOnly ? 'mobile' : 'tablet'}-title mb-0`}>{title}</h2>
								</div>
								<div className="col-auto" />
							</div>
						</div>
					</section>
				</MobileView>
			</React.Fragment>
		)
	}
}

export default BannerComponent

BannerComponent.propTypes = {
	background: PropTypes.string.isRequired,
	mobileBackground: PropTypes.string,
	title: PropTypes.string,
	textcolor: PropTypes.string
}
