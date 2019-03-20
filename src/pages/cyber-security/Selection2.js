import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { ROUTER_SD_BASE, ROUTER_SD_CART } from 'stores/global'
import { Alert } from 'components/common'
import Banner from 'components/BannerComponent'
import QuestionViewItem from 'components/QuestionViewItem'
import { isMobile, isTablet, BrowserView, MobileView, isMobileOnly } from 'react-device-detect'

const ordinaryIndex = [ '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th' ]

const banner = {
	background: 'img/hero1.jpg',
	mobileBackground: 'img/hero1-mobile.png',
	textcolor: 'white',
	title: 'Tell Us Your Story'
}

const ProfileHeading = observer(({ productStore, isEdit, currentIndex }) => {
	return (
		<React.Fragment>
			{isEdit && (
				<h2 className={`title-text-inside ${isMobile ? 'mb-3' : 'mb-5'} text-center`}>
					Editing your <span className="red">{ordinaryIndex[currentIndex]} Site Profile</span>
				</h2>
			)}
			{!isEdit && (
				<h2 className={`title-text-inside ${isMobile ? 'mb-3' : 'mb-5'} text-center`}>
					Let's create your{' '}
					<span className="red">{ordinaryIndex[productStore.totalProductCart]} Site Profile</span>
				</h2>
			)}
		</React.Fragment>
	);
});

class SolutionBuilder extends Component {
	constructor() {
		super()
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {
		window.scrollTo(0, 0)
		this.props.rootStore.productCyberSecurity.getQuestions()
	}

	onSubmit() {
		this.props.productStore.addProfile(this.props.configurator.profileContent)
		this.props.history.push(ROUTER_SD_CART)
	}

	render() {
		console.log(this.props)
		const { configurator, currentIndex, isEdit, ready, productStore } = this.props

		return (
			<div>
				<article className="main background-very-light-gray pb-5">
					<Banner {...banner} />
					<div className="container">
						<article className="">
							<section className="card shadow">
								{ready && (
									<div className="card-body p-sm-5">
										<ProfileHeading
											productStore={productStore}
											currentIndex={currentIndex}
											isEdit={isEdit}
										/>

										{!isEdit && (
											<p className={`text-${isMobileOnly ? 'center' : 'right'} avenirHeavy`}>
												<Link to={ROUTER_SD_BASE}>Back to SD-LAN</Link>
											</p>
										)}
										{configurator.questions.map((question) => (
											<QuestionViewItem question={question} key={`q_${question.id}`} />
										))}
										<div className="text-center mt-2">
											<Alert type="primary" closable={false} visible={!configurator.isValidated}>
												Please complete all questions before saving your profile configuration
											</Alert>
											{isEdit && (
												<Link
													to={ROUTER_SD_CART}
													className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0"
												>
													Next
												</Link>
											)}
											{!isEdit && (
												<button
													type="button"
													className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0"
													disabled={!configurator.isValidated}
													onClick={this.onSubmit}
												>
													SAVE
												</button>
											)}
										</div>
									</div>
								)}
							</section>
						</article>
					</div>
				</article>
			</div>
		);
	}
}

export default observer(SolutionBuilder);
