import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { observer } from 'mobx-react';
import { ROUTER_SD_ADDON } from '../stores/global';
import * as Components from './../components/recommended-package';

const RecommendedPackage = ({ productStore, history }) => {
	const onClickAddons = () => (e) => {
		e.preventDefault();
		history.push(ROUTER_SD_ADDON);
	};
	const banner = {
		background: 'img/hero4.jpg',
		mobileBackground: 'img/hero4-mobile.jpg',
		textcolor: '',
		title: 'Quotation Creation'
	};
	return (
		<article className="main background-very-light-gray pb-2">
			<Components.Banner {...banner} />
			<div className="container">
				<Components.ProgressStep />
				{productStore.packages &&
				productStore.packages.isReady && (
					<div>
						<h2 className="title-text text-center mb-5">Recommended Packages</h2>
						{productStore.packages.profiles.map((profile, index) => (
							<Components.SiteProfile key={index} index={index} profile={profile} />
						))}
					</div>
				)}
				<div className={`${isMobileOnly ? 'text-center' : ''} mb-5`}>
					<button type="button" className="btn btn-singtel-go-primary" onClick={onClickAddons()}>
						Continue to Select Add-Ons
					</button>
				</div>
				{productStore.packages &&
				productStore.packages.isReady && (
					<Components.InsidePackages packageContent={productStore.packages.packageContent} />
				)}
			</div>
		</article>
	);
};

export default observer(RecommendedPackage);
