import React from 'react';
import { observer } from 'mobx-react';
import InstallationAddressList from './InstallationAddressList';
import { BrowserView, TabletView, MobileOnlyView, isMobile, isMobileOnly } from 'react-device-detect';

const TabProfile = (props) => {
	const { qty, active, title, index, status } = props;
	return (
		<a
			className={`nav-item nav-link ${active ? 'active' : ''}`}
			href="javascript:void(0);"
			data-toggle="tab"
			onClick={props.onClick}
			role="tab"
			style={{
				width: `${isMobile
					? `${isMobileOnly ? `${active ? '132px' : '65px'}` : `${active ? '181px' : 'auto'}`}`
					: '222px'}`
			}}
		>
			<BrowserView>
				<div className="row">
					<div className="col-lg col-md">
						{title}
						<br />Profile #{index}
					</div>
					<div className="col-lg-2 col-md-2 pl-0">
						<span className={`badge badge-pill badge-${status}`}>&nbsp;</span>
					</div>
				</div>
			</BrowserView>
			<TabletView>
				{active ? (
					<div className="row">
						<div className="col-lg col-md">
							{title}
							<br />Profile #{index}
						</div>

						<div className="col-lg-2 col-md-2 pl-0">
							<span className={`badge badge-pill badge-${status}`}>&nbsp;</span>
						</div>
					</div>
				) : (
					<div className="col-lg col-md p-0 pt-2">
						<span className="pr-2">Profile #{index}</span>
						<span className={`badge badge-pill badge-${status}`}>&nbsp;</span>
					</div>
				)}
			</TabletView>
			<MobileOnlyView>
				{active ? (
					<div className="row">
						<div className="col-lg col-md">
							Profile #{index} &nbsp;<span className={`badge badge-pill badge-${status}`}>&nbsp;</span>
						</div>
					</div>
				) : (
					<div className="col-lg-2 col-md-2 p-0 text-center">
						<span className={`badge badge-pill badge-${status}`}>&nbsp;</span>
					</div>
				)}
			</MobileOnlyView>
		</a>
	);
};

class InstallationAddressComponent extends React.Component {
	state = {
		selectedPid: ''
	};

	componentWillMount() {
		const { productStore } = this.props;
		if (productStore.packages.profiles.length > 0) {
			this.setState({
				selectedPid: productStore.packages.profiles[0].pid
			});
		}
	}

	changeProfile(e) {
		e.preventDefault();
		// console.log(e.currentTarget);
	}

	render() {
		const { productStore } = this.props;
		return (
			<React.Fragment>
				<div
					className="nav nav-tabs"
					id="nav-tab"
					role="tablist"
					style={{ flexWrap: `${isMobileOnly ? 'nowrap' : 'wrap'}` }}
				>
					{productStore.packages.profiles.length > 0 &&
						productStore.packages.profiles.map((profile, index) => (
							<TabProfile
								qty={productStore.packages.profiles.length}
								active={this.state.selectedPid === profile.pid ? true : false}
								title={profile.name}
								index={index + 1}
								status={profile.isAddressesValid ? 'success' : 'warning'}
								key={profile.pid}
								onClick={() => this.setState({ selectedPid: profile.pid })}
								// onClick={ }
							/>
						))}
				</div>
				<InstallationAddressList profile={productStore.getProfileByPid(this.state.selectedPid)} />
			</React.Fragment>
		);
	}
}

export default observer(InstallationAddressComponent);
