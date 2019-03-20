import React from 'react'

const ManagedPlan = (props) => {
	const { packageOffer } = props
	
	return (
		<React.Fragment>
			<BrowserView>
				<div className="row">
					<div className="col-md m-0 pl-1 pr-1 text-center font-size-16-lg font-size-14">
						<div className="card border shadow">
							<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
								<div className="d-flex flex-row justify-content-center" style={{ height: '50px' }}>
									<div className="sub-title-text">Plans</div>
								</div>
								<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
									Suggest Workload
								</div>
								<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
									Quantity
								</div>
								<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
									Service Hours
								</div>
								<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
									Monitoring
								</div>
								<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
									Restore Time
								</div>
							</div>
						</div>
					</div>
					{sampleData.tierPlans.map((d, i) => (
						<div className="col-md m-0 pl-1 pr-1" key={i}>
							<div className="card border shadow">
								<div className="card-body p-3 text-center">
									{Object.keys(d).map((attribute, index) => {
										switch (attribute) {
											case 'name':
												return (
													<div style={{ height: '50px', overflow: 'hidden' }} key={index}>
														<div className="sub-title-text">{d.name}</div>
													</div>
												);
											case 'quantity':
												return (
													<div
														className="d-flex flex-row justify-content-center align-items-center table-row-height"
														key={index}
													>
														<div className="mb-3">
															<QuantityComponent max={100} min={1} />
														</div>
													</div>
												);
											default:
												return (
													<div
														className="d-flex flex-row justify-content-center align-items-center table-row-height"
														key={index}
													>
														<div className="mb-3">
															<span>{d[attribute]}</span>
														</div>
													</div>
												);
										}
									})}
								</div>
							</div>
						</div>
					))}
				</div>
			</BrowserView>
			<TabletView>
				<div className="d-none d-lg-block">
					<div className="row">
						<div className="col-md m-0 pl-1 pr-1 text-center font-size-16-lg font-size-14">
							<div className="card border shadow">
								<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
									<div
										className="d-flex flex-row justify-content-center"
										style={{ height: '50px' }}
									>
										<div className="avenirHeavy">Plans</div>
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Quantity
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										SLA
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Monitoring
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Security
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
										Work Loads
									</div>
								</div>
							</div>
						</div>
						{sampleData.tierPlans.map((d, i) => (
							<div className="col-md m-0 pl-1 pr-1" key={i}>
								<div className="card border shadow">
									<div className="card-body p-3 text-center">
										<div style={{ height: '50px', overflow: 'hidden' }}>
											<div className="avenirHeavy">{d.name}</div>
										</div>
										<div className="d-flex flex-row justify-content-center align-items-center table-row-height">
											<div className="mb-3">
												<QuantityComponent max={100} min={1} />
											</div>
										</div>
										{Object.keys(d).map(
											(attribute, index) =>
												attribute !== 'name' &&
												attribute !== 'quantity' && (
													<div
														className="d-flex flex-row justify-content-center align-items-center table-row-height"
														key={index}
													>
														<span>{d[attribute]}</span>
													</div>
												)
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="d-lg-none d-block">
					<div className="row">
						<div className="col-md-4 pr-0">
							<div className="card border shadow">
								<div className="card-body text-center p-3" style={{ overflow: 'hidden' }}>
									<div className="d-flex flex-row justify-content-center table-row-height-mobile">
										<div className="sub-title-text">Plans</div>
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
										Suggest Workload
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
										Quantity
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
										Service Hours
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
										Monitoring
									</div>
									<div className="d-flex flex-row justify-content-center align-items-center table-row-height-mobile">
										Restore Time
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<TierPlansTable />
						</div>
					</div>
				</div>
			</TabletView>
			<MobileOnlyView>
				{sampleData.tierPlans.map((d, i) => (
					<MobileProfileTierPlansTable
						key={i}
						tierPlans={d}
						name={d.name}
						SLA={d.SLA}
						monitoring={d.monitoring}
						patching={d.patching}
						security={d.security}
						workLoads={d.workLoads}
					/>
				))}
			</MobileOnlyView>
		</React.Fragment>
	)
}