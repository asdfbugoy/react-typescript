import React from 'react'
import Error from '../pages/Error'
import * as Global from '../stores/global'

const RouteConfiguration = [
	{
		name: 'Home',
		path: Global.ROUTER_HOME,
		filePath: 'Home',
		loadingType: 'home'
	},
	{
		name: 'SDLan',
		path: Global.ROUTER_SD_BASE,
		filePath: 'SDLan',
		loadingType: 'product'
	},
	{
		name: 'SDLanSolutionBuilder',
		path: Global.ROUTER_SD_SOLUTION,
		filePath: 'SolutionBuilder',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady}
					configurator={rootStore.product.createBlankProfile()}
					productStore={rootStore.product}
					history={route.history}
				/>
			)
		}
	},
	{
		name: 'SDLanSolutionBuilderEdit',
		path: Global.ROUTER_SD_SOLUTION + '/edit/:indexNo',
		filePath: 'SolutionBuilder',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady}
					currentIndex={route.match.params.indexNo}
					isEdit={true}
					configurator={rootStore.product.getProfileByIndex(route.match.params.indexNo)}
					productStore={rootStore.product}
					history={route.history}
				/>
			)
		}
	},
	{
		name: 'SDLanProfileList',
		path: Global.ROUTER_SD_CART,
		filePath: 'ProfileList',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady} productStore={rootStore.product} history={route.history}
				/>
			)
		}
	},
	{
		name: 'SDLanRecommendedSolution',
		path: Global.ROUTER_SD_PACKAGES,
		filePath: 'RecommendedPackage',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady} productStore={rootStore.product} history={route.history}
				/>
			)
		}
	},
	{
		name: 'SDLanAddons',
		path: Global.ROUTER_SD_ADDON,
		filePath: 'Addons',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady} productStore={rootStore.product} history={route.history}
				/>
			)
		}
	},
	{
		name: 'SDLanContractTerms',
		path: Global.ROUTER_SD_TERMS,
		filePath: 'ContractTerms',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady} productStore={rootStore.product} history={route.history}
				/>
			)
		}
	},
	{
		name: 'SDLanCustomerInformation',
		path: Global.ROUTER_SD_CUSTOMER,
		filePath: 'CustomerInformation',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady} rootStore={rootStore} history={route.history}
				/>
			)
		}
	},
	{
		name: 'SDLanQuotationDraftEdit',
		path: Global.ROUTER_SD_QUOTATION_DRAFT_EDIT + '/:quoteId',
		filePath: 'CustomerInformation',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady}
					rootStore={rootStore}
					history={route.history}
					editMode={true}
					quoteId={route.match.params.quoteId}
				/>
			)
		}
	},
	{
		name: 'MSCloud',
		path: Global.ROUTER_MS_CLOUD_BASE,
		filePath: 'MSCloud',
		loadingType: 'product'
	},
	{
		name: 'MSCloudTierPlans',
		path: Global.ROUTER_MS_TIERPLANS,
		filePath: 'mscloud/TierPlans',
		loadingType: 'page'
	},
	{
		name: 'MSCloudOverview',
		path: Global.ROUTER_MS_OVERVIEW,
		filePath: 'mscloud/Overview',
		loadingType: 'page'
	},
	{
		name: 'MSCloudAddons',
		path: Global.ROUTER_MS_ADDONS,
		filePath: 'mscloud/Addons',
		loadingType: 'page'
	},
	{
		name: 'MSCloudContractTerms',
		path: Global.ROUTER_MS_CONTRACT_TERMS,
		filePath: 'mscloud/ContractTerms',
		loadingType: 'page'
	},
	{
		name: 'MSCloudCustomerInformation',
		path: Global.ROUTER_MS_CUSTOMER_INFORMATION,
		filePath: 'mscloud/CustomerInformation',
		loadingType: 'page'
	},
	{
		name: 'MSCloudQuotationDraftEdit',
		path: Global.ROUTER_MS_QUOTATION_DRAFT_EDIT + '/:quoteId',
		filePath: 'mscloud/CustomerInformation',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady}
					rootStore={rootStore}
					route={route}
					editMode={true}
					quoteId={route.match.params.quoteId}
				/>
			)
		}
	},
	{
		name: 'QuotationDraft',
		path: Global.ROUTER_QUOTATION_DRAFT,
		filePath: 'QuotationDraft',
		loadingType: 'page',
		component: (route, rootStore, PageComponent) => {
			return (
				<PageComponent
					ready={rootStore.product.isReady}
					quoteStore={rootStore.quote}
					history={route.history}
				/>
			)
		}
	},
	{
		name: 'CyberSecurity',
		path: Global.ROUTER_CYBER_SECURITY_BASE,
		filePath: 'cyber-security',
		loadingType: 'product'
	},
	{
		name: 'CyberSecuritySelection',
		path: Global.ROUTER_CYBER_SECURITY_SELECTION,
		filePath: 'cyber-security/Selection',
		loadingType: 'product'
	},
	{
		name: 'CyberSecurityRecommendation',
		path: Global.ROUTER_CYBER_SECURITY_RECOMMENDATION,
		filePath: 'cyber-security/Recommendation',
		loadingType: 'product'
	},
	{
		name: 'CyberSecurityOverview',
		path: Global.ROUTER_CYBER_SECURITY_OVERVIEW,
		filePath: 'cyber-security/Overview',
		loadingType: 'product'
	},
	{
		name: 'CyberSecurityContract',
		path: Global.ROUTER_CYBER_SECURITY_CONTRACT,
		filePath: 'cyber-security/Contract',
		loadingType: 'product'
	},
	{
		name: 'CyberSecurityQuotation',
		path: Global.ROUTER_CYBER_SECURITY_QUOTATION,
		filePath: 'cyber-security/Quotation',
		loadingType: 'product'
	},
	{
		name: 'Cart',
		path: '/Cart',
		filePath: 'Cart',
		loadingType: 'page'
	},
	{
		name: 'ThankYou',
		path: Global.ROUTER_THANKYOU,
		filePath: 'Thankyou',
		loadingType: 'page'
	},
	{
		name: 'Error404',
		path: '*',
		filePath: 'Error',
		loadingType: 'product',
		component: () => {
			return (
				<Error />
			)
		}
	}
]

export default RouteConfiguration