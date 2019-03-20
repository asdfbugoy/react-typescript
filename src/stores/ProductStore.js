import { types, getSnapshot, flow, isAlive, applySnapshot } from 'mobx-state-tree';
import {
	REST_API_RECOMMENDEDPACKAGE,
	REST_API_PRODUCT_CONTENT,
	REST_API_QUOTE_BOM,
	REST_API_ADDON_CONTENT,
	REST_API_MISC,
	REST_API_ADDON,
	REST_API_TERMS,
	REST_API_PRICE_SUMMARY,
	REST_API_PRICE_PLANNER,
	REST_API_PRICE_SAVE,
	REST_CREDENTIALS
} from './global';
import { ConfiguratorStore } from './ConfiguratorStore';
import { ProductCartStore, ProductItemModel } from './CartStore';
import { PackageStore, ContractModel } from './PackageStore';
import sampleStore from './sampleStore';

const ProductStore = types
	.model('ProductStore', {
		isReady: false,
		productName: types.string,
		cart: types.maybe( ProductCartStore ),
		configurator: types.maybe(ConfiguratorStore ),
		packages: types.maybe( PackageStore ),
		contracts: types.array( ContractModel, []),
		selectedDuration: 0,
		selectedPlanner: ''
	})
	.views(self => ({
		get totalProductCart() {
			return self.cart.profiles.length;
		},
		get maxItems() {
			return self.configurator && self.configurator.maxProfileSize;
		}
	}))
	.actions(self => ({
		afterCreate() {
			self.cart = ProductCartStore.create({});
			self.configurator = ConfiguratorStore.create({
				productName: self.productName
			});
			// applySnapshot( self.contracts, sampleStore.contracts );
			// below 3 are for developmen
			// self.cart = ProductCartStore.create( sampleStore.cart );
			// self.configurator = ConfiguratorStore.create( sampleStore.configurator );
			// self.packages = PackageStore.create( );
		},
		createBlankProfile() {
			return ProductItemModel.create({
				questions: self.configurator.configurationQuestions
			});
		},
		getProfileByIndex(indexNo) {
			if (indexNo >= self.cart.profiles.length) return ProductItemModel.create();
			return self.cart.profiles[indexNo];
		},
		addProfile(content) {
			if (self.cart.profiles >= self.cart.maxItems) {
				self.cart.errorMessage = 'You have added maximum Site Profiles inside your cart!';

			} else {
				self.cart.profiles.push(
					ProductItemModel.create({ ...content })
				)
			}
		},
		setProductStoreActive() {
			self.isReady = true;
		},
		setMaxCartItem(value) {
			self.cart.maxItems = value;
		},
		addStory(content) {
			self.story = content;
		},
		setDuration(value) {
			self.selectedDuration = value;
		},
		setPlanner(id) {
			self.selectedPlanner = id
		},
		getAddonContent: flow(function* getAddonContent() {
			try {
				const response = yield window.fetch(
					REST_API_ADDON_CONTENT, {
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: self.productName
					})
				// return yield response.json();
				applySnapshot(self.packages.addonContent, yield response.json())
			} catch (e) {
				console.error(e);
				throw 'There is unexpected issue from your request';
			}

		}),
		getContent: flow(function* getContent() {
			try {
				const response = yield window.fetch(REST_API_PRODUCT_CONTENT, {
					method: 'POST', credentials: REST_CREDENTIALS,
					headers: {
						'Content-Type': 'application/json'
					},
					body: self.productName
				})
				applySnapshot(self.packages.packageContent, yield response.json())
			} catch (e) {
				console.error(e);
				throw 'There is unexpected issue from your request';
			}
		}),
		getPackages: flow(function* getPackages() {
			let profiles = [];
			self.cart.profiles.map(item => profiles.push(item.profile));
			const requestQuery = {
				product: self.productName,
				story: self.story,
				profiles: profiles
			}
			// preloading
			self.isFetching = true;
			try {
				const response = yield window.fetch(
					REST_API_RECOMMENDEDPACKAGE,
					{
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(requestQuery)
					}
				);
				const result = yield response.json();

				// console.log( 'requestQuery', result);
				self.packages = PackageStore.create({
					...result,
					isReady: true
				});
				// hidding loading bar
				self.isFetching = false;
				self.getContent().then(() => {
					self.getPriceParams();
					self.getAddonContent();
					self.getAddons();
				});
				return result.uuid;
			} catch (err) {
				self.isFetching = false;
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		getPriceParams: flow(function* getPriceParams() {
			if (self.packages && self.packages.uuid !== '') {
				try {
					const response = yield window.fetch(
						REST_API_MISC,
						{
							method: 'POST', credentials: REST_CREDENTIALS,
							headers: {
								'Content-Type': 'application/json'
							},
							body: self.packages.uuid //'478e2adb-52e3-4a7d-a791-df6a2be009f3'
						})
					applySnapshot(self.packages.misc, yield response.json());
					// return yield response.json();
				} catch (err) {
					console.error(err);
					throw 'There is unexpected issue from your request';
				}
			}
		}),
		getAddons: flow(function* getAddons() {
			if (self.packages && self.packages.uuid !== '') {
				try {
					const response = yield window.fetch(
						REST_API_ADDON,
						{
							method: 'POST', credentials: REST_CREDENTIALS,
							headers: {
								'Content-Type': 'application/json'
							},
							body: self.packages.uuid //'478e2adb-52e3-4a7d-a791-df6a2be009f3'
						})
					// applySnapshot(self.packages.misc, yield response.json() );
					//self.packages.applyAddons(yield response.json());
					
					const data = yield response.json()
					
					data.profiles.map(dProfile => {
						dProfile.selectedAddons.map(selectedAddon => {
							selectedAddon.group = data.addons.find(addon => addon.id === selectedAddon.id).group
							return selectedAddon
						})
						return dProfile
					})
					self.packages.applyAddons(data)
				} catch (err) {
					console.error(err);
					throw 'There is unexpected issue from your request';
				}
			}
		}),
		getContractTerms: flow(function* getContractTerms() {
			if (self.packages && self.packages.uuid !== '') {
				try {
					const response = yield window.fetch(
						REST_API_TERMS,
						{
							method: 'POST', credentials: REST_CREDENTIALS,
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(self.packages.packageValue)
						})
					let terms = yield response.json();
					terms.sort((a, b) => b.duration - a.duration);
					applySnapshot(self.contracts, terms);
					terms.map(term => {
						if (term.default) self.selectedDuration = term.duration;
					});

				} catch (err) {
					console.error(err);
					throw 'There is unexpected issue from your request';
				}
			}
		}),
		getPriceSummary: flow( function* getPriceSummary(){
			if ( self.packages && self.packages.uuid !== ''){
				try {
					const response = yield window.fetch(
						REST_API_PRICE_SUMMARY,
						{
							method: 'POST', credentials: REST_CREDENTIALS,
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								uuid: self.packages.uuid.toString(),
								duration: self.selectedDuration.toString()
							})
						})
					return yield response.json();
				} catch (err) {
					console.error(err);
					throw 'There is unexpected issue from your request';
				}
			}
		}),
		getPricePlanner: flow(function* getPricePlanner() {
			if (self.packages && self.packages.uuid !== '') {
				try {
					const response = yield window.fetch(
						REST_API_PRICE_PLANNER,
						{
							method: 'POST', credentials: REST_CREDENTIALS,
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								uuid: self.packages.uuid.toString(),
								duration: self.selectedDuration.toString()
							})
						})
					return yield response.json();
				} catch (err) {
					console.error(err);
					throw 'There is unexpected issue from your request';
				}
			}
		}),
		getBOM: flow ( function* getBOM() {
			if (self.packages && self.packages.uuid !== '') {
				try {
					const response = yield window.fetch(
						REST_API_QUOTE_BOM,
						{
							method: 'POST', credentials: REST_CREDENTIALS,
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								uuid: self.packages.uuid,
								duration: self.selectedDuration
							})
						})
					return yield response.json()
				} catch (err) {
					console.error(err);
					throw 'There is unexpected issue from your request';
				}
			}
		}),
		getProfileByPid(Pid){
			return self.packages.profiles.find( profile => profile.pid === Pid)
		},
		saveQuoteProfile: flow(function* saveQuoteProfile() {
			try {
				const response = yield window.fetch(
					REST_API_PRICE_SAVE,
					{
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							uuid: self.packages.uuid,
							duration: self.selectedDuration,
							pricePlannerId: self.selectedPlanner,
						})
					}
				);
				return response;
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		})
	}));

export { ProductStore };