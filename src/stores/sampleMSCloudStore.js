const sampleMSCloudStore = {
	tierPlans: [
		{
			name: 'Stateless',
			workLoads: 'Production / DR workloads in auto-scaling, self-healing architecture',
			quantity: true,
			SLA: '10 Hours Restore (unless impacting of the underlying service, then 2-hour restoration)',
			monitoring: 'No Proactive Management',
			//patching: 'Monthly',
			security: "4 hours SLA on Urgent Security Patch's",
		},
		{
			name: 'Essential',
			workLoads: 'Non-critical business servers - development / tests, etc.',
			quantity: true,
			SLA: '10 Hours Restore, 10 Hours SLA on P1 events. (Clock stops for after-hours)',
			monitoring: 'Full Proactive Management',
			//patching: 'Monthly',
			security: "12 hours SLA on Urgent Security Patch's"
		},
		{
			name: 'Advanced',
			workLoads: 'Less business critical servers - some development / test',
			quantity: true,
			SLA: '4 Hours Restore, 4 Hours SLA on P1 events. (Clock stops for after-hours)',
			monitoring: 'Full Proactive Management',
			//patching: 'Monthly',
			security: "6 hours SLA on Urgent Security Patch's"
		},
		{
			name: 'Premium',
			workLoads: 'Mission critical production / business critical servers',
			quantity: true,
			SLA: '2 Hours Restore, 2 Hours SLA on P1 events.',
			monitoring: 'Full Proactive Management',
			//patching: 'Monthly',
			security: "4 hours SLA on Urgent Security Patch's"
		}
	],
	selectedPlanner: 'GZQISLRjqVwA6eh1Ys4Bmg=='
};

export default sampleMSCloudStore;
