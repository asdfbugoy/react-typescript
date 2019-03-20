import React from 'react';
import Banner from './../components/BannerComponent';
import ProgressSteps from './../components/ProgressStep';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import AddOnsCollapsible from './../components/AddOnsCollapsible';
import { Alert } from '../components/common';
import { ROUTER_SD_TERMS, ROUTER_SD_PACKAGES } from './../stores/global';
import AnswerViewItem from '../components/AnswerViewItem';
import { QuantityComponent } from '../components/QuantityComponent';
import Checkbox from '@material-ui/core/Checkbox';
import { BrowserView, TabletView, MobileOnlyView } from 'react-device-detect';
import { ContentLoading } from '../components/common/Loading'

class Addons extends React.Component {
	state = {
		addonContent: [],
		banner: {
			background: 'img/hero4.jpg',
			mobileBackground: 'img/hero4-mobile.jpg',
			textcolor: '',
			title: 'Add-ons'
		}
	};

	componentWillMount() {}

	componentDidMount() {
		window.scrollTo(0, 0);

		const { productStore } = this.props;
		if (productStore.packages && productStore.packages.addonContent.length === 0) {
			productStore.getAddonContent();
			productStore.getPriceParams();
		}
	}

	render() {
		const { packages } = this.props.productStore;
		let isPortValid =
			packages &&
			packages.profiles.reduce((result, profile) => {
				result = result && profile.availablePorts >= 0;
				return result;
			}, true);

		let error = null;
		if (packages && !isPortValid)
			error = { message: 'Please upgrade switch for your demand devices', type: 'danger' };

		return (
			<article className="main background-very-light-gray pb-2">
				<Banner {...this.state.banner} />
				<div className="container">
					<ProgressSteps />
					<h2 className="title-text text-center mb-5">Available Add-ons</h2>
					{packages && packages.addonConfiguration.length > 0 &&<React.Fragment>
							<section className="mb-5">
								{/* <CommonAddon /> */}
								<SiteProfileList packages={packages} />
							</section>
							<NavLinks error={error} history={this.props.history} />
					</React.Fragment>}
					{packages && !packages.addonConfiguration.length > 0 && <ContentLoading />}
				</div>
			</article>
		);
	}
}

export default observer(Addons);

const SiteProfileList = observer(({ packages }) => {
	const commonClasses = 'col-md m-0 p-0';
	return (
		<React.Fragment>
			<BrowserView>
				<div className="row">
					<div className={`${commonClasses} font-size-16-lg font-size-14`}>
						<div className="card border shadow">
							<div className="card-body p-0 pt-3">
								<div className="invisible" style={{ height: '60px', overflow: 'hidden' }}>
									<div className="avenirHeavy">Addon Name Without Legend</div>
								</div>
								<div
									className="d-flex flex-row justify-content-start align-items-center pl-3 pr-3"
									style={{ height: '90px', overflow: 'hidden' }}
								>
									Average Available Ports Per Floor
								</div>

								{packages.addonConfiguration.map((addon, index) => {
									return index > 0 ? (
										<div key={index}>
											<div
												className={
													addon.group !== packages.addonConfiguration[index - 1].group ? (
														'border-top text-center avenirHeavy pt-3'
													) : (
														'd-none'
													)
												}
												style={{ height: '60px', overflow: 'hidden' }}
											>
												{addon.group}
											</div>
											<div
												className="d-flex flex-row justify-content-start align-items-center pl-3 pr-3"
												style={{ height: '90px', overflow: 'hidden' }}
											>
												{addon.name}
											</div>
										</div>
									) : (
										<div key={index}>
											<div
												className="border-top text-center avenirHeavy pt-3"
												style={{ height: '60px', overflow: 'hidden' }}
											>
												{addon.group}
											</div>
											<div
												className="d-flex flex-row justify-content-start align-items-center pl-3 pr-3"
												style={{ height: '90px', overflow: 'hidden' }}
											>
												{addon.name}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					{packages.profiles.map((profile, index) => (
						<div key={`addonProfile_${index}`} className={commonClasses}>
							<ProfileAddon
								profile={profile}
								siteIndex={index + 1}
								profile={profile}
								siteName={profile.name}
								addons={profile.selectedAddons}
								pid={profile.pid}
								availablePorts={profile.availablePorts}
								addonGroup={packages.addonGroup}
							/>
						</div>
					))}
				</div>
			</BrowserView>
			<TabletView>
				<div className="row">
					<div className={`${commonClasses} font-size-16-lg font-size-14`}>
						<div className="card border shadow">
							<div className="card-body p-0 pt-3">
								<div className="invisible" style={{ height: '60px', overflow: 'hidden' }}>
									<div className="avenirHeavy">Addon Name Without Legend</div>
								</div>
								<div
									className="d-flex flex-row justify-content-start align-items-center pl-3 pr-3"
									style={{ height: '90px', overflow: 'hidden' }}
								>
									<span className="lead">Available Ports</span>
								</div>

								{packages.addonConfiguration.map((addon, index) => {
									return index > 0 ? (
										<div key={index}>
											<div
												className={
													addon.group !== packages.addonConfiguration[index - 1].group ? (
														'border-top text-center avenirHeavy pt-3'
													) : (
														'd-none'
													)
												}
												style={{ height: '60px', overflow: 'hidden' }}
											>
												{addon.group}
											</div>
											<div
												className="d-flex flex-row justify-content-start align-items-center pl-3 pr-3"
												style={{ height: '90px', overflow: 'hidden' }}
											>
												{addon.name}
											</div>
										</div>
									) : (
										<div key={index}>
											<div
												className="border-top text-center avenirHeavy pt-3"
												style={{ height: '60px', overflow: 'hidden' }}
											>
												{addon.group}
											</div>
											<div
												className="d-flex flex-row justify-content-start align-items-center pl-3 pr-3"
												style={{ height: '90px', overflow: 'hidden' }}
											>
												{addon.name}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					{packages.profiles.map((profile, index) => (
						<div key={`addonProfile_${index}`} className={commonClasses}>
							<ProfileAddon
								profile={profile}
								siteIndex={index + 1}
								profile={profile}
								siteName={profile.name}
								addons={profile.selectedAddons}
								pid={profile.pid}
								availablePorts={profile.availablePorts}
								addonGroup={packages.addonGroup}
							/>
						</div>
					))}
				</div>
			</TabletView>
			<MobileOnlyView>
				{packages.profiles.map((profile, index) => (
					<MobileProfileAddon
						key={index}
						packages={packages}
						siteIndex={index + 1}
						siteName={profile.name}
						addons={profile.selectedAddons}
						pid={profile.pid}
						availablePorts={profile.availablePorts}
						addonGroup={packages.addonGroup}
					/>
				))}
			</MobileOnlyView>
		</React.Fragment>
	);
});

const MobileProfileAddon = ({ packages, addons, siteIndex, siteName, pid, availablePorts }) => {
	return (
		<AddOnsCollapsible title={`${siteName} Profile #${siteIndex}`} subtitle={siteName}>
			{/* collapsible content here */}
			<div>
				<div className="addon-mobile-card-body-title text-center">Average Available Ports Per Floor</div>
				<div className="addon-mobile-card-body">
					<div className="d-flex flex-row justify-content-center align-items-center">
						{availablePorts > 0 && (
							<div className="lead">
								{availablePorts} {availablePorts > 1 ? 'ports' : 'port'}
							</div>
						)}
						{availablePorts === 0 && <div className="lead">No port Available</div>}
						{availablePorts < 0 && (
							<div className="red">
								<i className="fas fa-exclamation-circle" /> Exceed available ports
							</div>
						)}
					</div>
				</div>
			</div>
			{addons.map((addon, index) => (
				<div key={index}>
					{packages.addonConfiguration.map(
						(addOnConfigurator, index) =>
							addOnConfigurator.id === addon.id && (
								<div key={`addonlabel_${index}`} className="addon-mobile-card-body-title text-center">
									{addOnConfigurator.name}
								</div>
							)
					)}
					<div className="addon-mobile-card-body">
						<div
							key={`addon_${addon.id}_${index}`}
							className="d-flex flex-row justify-content-center align-items-center"
						>
							<ProfileInput addon={addon} pid={pid} />
						</div>
					</div>
				</div>
			))}
		</AddOnsCollapsible>
	);
};
const ProfileAddon = ({ siteIndex, profile, addonGroup }) => {
	const { selectedAddons, name, pid, availablePorts } = profile;
	return (
		<div className="card border">
			<div className="card-body p-0 pt-3 text-center">
				<div style={{ height: '60px', overflow: 'hidden' }}>
					<div className="avenirHeavy">
						{name} Profile #{siteIndex}
					</div>
				</div>
				<div
					className="d-flex flex-row justify-content-center align-items-center pl-3 pr-3"
					style={{ height: '90px', overflow: 'hidden' }}
				>
					{availablePorts > 0 && (
						<div className="lead">
							{availablePorts} {availablePorts > 1 ? 'ports' : 'port'}
						</div>
					)}
					{availablePorts === 0 && <div className="lead">No port Available</div>}
					{availablePorts < 0 && (
						<div className="red">
							<i className="fas fa-exclamation-circle" /> Exceed available ports
						</div>
					)}
				</div>

				{selectedAddons.map((addon, index) => {
					return index > 0 ? (
						<div key={index}>
							<div
								className={
									addon.group !== selectedAddons[index - 1].group ? (
										'border-top text-center avenirHeavy pt-3'
									) : (
										'd-none'
									)
								}
								style={{ height: '60px', overflow: 'hidden' }}
							/>
							<div
								className="d-flex flex-row justify-content-center align-items-center pl-3 pr-3"
								style={{ height: '90px', overflow: 'hidden' }}
							>
								{addon.disabled ? <div className="avenirHeavy">N / A</div> : <ProfileInput addon={addon} pid={pid} />}
							</div>
						</div>
					) : (
						<div key={index}>
							<div
								className="border-top text-center avenirHeavy pt-3"
								style={{ height: '60px', overflow: 'hidden' }}
							/>
							<div
								className="d-flex flex-row justify-content-center align-items-center pl-3 pr-3"
								style={{ height: '90px', overflow: 'hidden' }}
							>
								{addon.disabled ? <div className="avenirHeavy">N / A</div> : <ProfileInput addon={addon} pid={pid} /> }
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const ProfileInput = observer(({ addon, pid }) => {
	const renderElement = () => {
		switch (addon.type) {
			case 'number':
				return (
					<QuantityComponent
						quantity={addon.value}
						onDecrementQuantity={addon.decrementQty}
						onChangeQuantity={addon.changeQty}
						onIncrementQuantity={addon.increaseQty}
						min={0}
					/>
				);
			case 'checkbox':
				return (
					<React.Fragment>
						<Checkbox
							onChange={(e) => addon.toggleCheckbox(e.currentTarget.checked)}
							checked={addon.booleanValue}
						/>
					</React.Fragment>
				);
			case 'dropdown':
				return (
					<select
						className="form-control"
						defaultValue={addon.value}
						onChange={(e) => addon.changeValue(e.currentTarget.value)}
					>
						{addon.options.map((option, index) => (
							<option key={`option_addon_${addon.id}_${index}`} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				);
			default:
				return (
					<QuantityComponent
						quantity={addon.value}
						onDecrementQuantity={addon.decrementQty}
						onChangeQuantity={addon.changeQty}
						onIncrementQuantity={addon.increaseQty}
						min={0}
					/>
				);
		}
	};

	return renderElement();
});

const NavLinks = ({ history, error }) => {
	const onClickNext = () => {
		history.push(ROUTER_SD_TERMS);
	};
	return (
		<div className="mb-4">
			{error && (
				<Alert type={error.type} closable={false} visible={error}>
					{error.message}
				</Alert>
			)}
			<div className="row align-items-center text-center text-sm-left">
				<div className="col-sm-auto">
					<button type="button" disabled={error} onClick={onClickNext} className="btn btn-singtel-go-primary">
						Contract Terms
					</button>
				</div>
				<div className="col-sm-auto">
					<span>or</span>
				</div>
				<div className="col-sm-auto">
					<Link to={ROUTER_SD_PACKAGES} className="avenirHeavy">
						Back to Recommended Packages
					</Link>
				</div>
			</div>
		</div>
	);
};

const CommonAddon = () => {
	return (
		<div className="card border shadow mb-4 bg-light">
			<div className="card-body">
				<div className="row align-items-center">
					<div className="col-lg-10 col-sm-9">
						<div className="mb-2 row align-items-center">
							<div className="col-sm">
								<span className="mr-5 sub-title-text">HUB feature</span>
							</div>
						</div>
						<div className="row align-items-center">
							<div className="col-sm mb-3 mb-sm-0">
								<div className="alert alert-info">
									<p>If you have more than 1 profile, we suggest you should try the HUB etc.... </p>
									<small>Some description for the hub...</small>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-2 col-sm-3">
						<div className="mb-4 text-center mb-3">
							<small>No. of VPN</small>
							<QuantityComponent
								quantity={0}
								onDecrementQuantity={() => console.log()}
								onChangeQuantity={() => console.log()}
								onIncrementQuantity={() => console.log()}
								max={100}
								min={0}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
