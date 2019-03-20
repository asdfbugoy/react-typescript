import { types, applySnapshot, getSnapshot, flow } from 'mobx-state-tree';
import * as DownloadJS from 'downloadjs';

import { 
	STORAGE_NAME, 
	REST_API_QUOTE_SAVE,
	REST_CLOUD_QUOTE_SAVE,
	REST_API_QUOTE_CREATE,
	REST_CLOUD_QUOTE_CREATE,
	REST_API_QUOTE_PDF,
	REST_API_QUOTE_SEARCH,
	REST_API_QUOTE_DETAIL,
	REST_CLOUD_QUOTE_DETAIL,
	REST_KEEPALIVE,
	REST_CREDENTIALS
} from './global';
import { ProductStore } from './ProductStore';
import { CustomerStore } from './CustomerStore';
import { QuoteStore } from './QuoteStore';
import { PackageStore } from './PackageStore';


import { Product as ProductMSCloud } from 'stores/mscloud/Product'

import { Product as ProductCyberSecurity } from 'stores/cyber-security/Product'

const RootStore = types
	.model('RootStore',{
		// cart: types.optional( types.frozen(), {}), using for multiple product
		// products: using for next phase
		product: types.maybe( ProductStore ),
		productMSCloud: types.maybe(ProductMSCloud),
		productCyberSecurity: types.maybe(ProductCyberSecurity),
		customer: types.maybe( CustomerStore ),
		quote: types.maybe( QuoteStore),
	})
	.views(self => ({
		get storeValue() {
			const { customer, product } = self;
			let profileAddresses = [];
			product.packages.profiles.map(profile => profileAddresses.push(profile.profileValue));

			const params = {
				uuid: self.product.packages.uuid.toString(),
				accountId: customer.accountBRN.toString(),
				//uen: customer.accountBRN.toString(),
				primaryAddress: customer.primaryAddress.addressValue,
				correspondenceAddress: customer.isSameAddress ? customer.primaryAddress.addressValue : customer.correspondenceAddress.addressValue,
				contactDetail: customer.contactDetail.toJSON(),
				authorizedContactDetail: customer.isSameContact ? customer.contactDetail.toJSON() : customer.authorizedContactDetail.toJSON(),
				profiles: profileAddresses,
				comments: customer.comments
			}

			return params;
		},
		get __cloudCustomerSnapshot(){
			const { customer, productMSCloud } = self;

			const params = {
				// uuid: productMSCloud.uuid.toString(),
				accountId: customer.accountBRN.toString(),
				primaryAddress: customer.primaryAddress.addressValue,
				correspondenceAddress: customer.isSameAddress ? customer.primaryAddress.addressValue : customer.correspondenceAddress.addressValue,
				contactDetail: customer.contactDetail.toJSON(),
				authorizedContactDetail: customer.isSameContact ? customer.contactDetail.toJSON() : customer.authorizedContactDetail.toJSON(),
				comments: customer.comments,
				profiles: [],
			}

			return params;
		},
		getCartCount() {
			let count = 0
			count = self.product.cart.profiles.length > 0 ? count + 1 : count
			count = self.productMSCloud.getProductWithQtyCount() > 0 ? count + 1 : count
			return count
		}
	}))
	.actions(self => ({
		afterCreate(){
			// self.initialCart()
			self.customer = CustomerStore.create()
			self.quote = QuoteStore.create()
			self.productMSCloud = ProductMSCloud.create()
			self.productCyberSecurity = ProductCyberSecurity.create()
		},
		initialCart(){
			if ( localStorage.getItem(STORAGE_NAME) !== null && localStorage.getItem(STORAGE_NAME) !== '' ){
				const storage = JSON.parse( localStorage.getItem(STORAGE_NAME) );
				// console.log( storage );
				if(storage.length > 0) applySnapshot( self, storage );
			}
		},
		saveToLocalStorage(){
			const storage = getSnapshot(self);
			localStorage.setItem(STORAGE_NAME, JSON.stringify( storage ));
		},
		createNewProduct({productName}){
			self.product = ProductStore.create({'productName': productName});
		},
		createNewCloudProduct({uuid}){
			self.productMSCloud = ProductMSCloud.create({
				'productName': 'MS Cloud',
				uuid: typeof uuid !== 'undefined' ? uuid : ''
			});
		},
		saveQuote: flow (function* saveQuote({isValidation}){
			try {
				const response = yield window.fetch(
					REST_API_QUOTE_SAVE,
					{
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify( Object.assign(
								{},
								self.storeValue,
								{ validate: typeof isValidation === 'boolean' ? isValidation : true }
							)
						)
					}
				)
				// successful
				if ( response.ok ) 
					return { status: response.status };
				// fail with server message
				const result = yield response.json();
				return {
					status: response.status,
					body: result
				};
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		saveCloudQuote: flow (function* saveCloudQuote({isValidation, uuid}){

			const submitData = Object.assign(
				{},
				self.__cloudCustomerSnapshot,
				{ uuid: uuid },
				{ validate: typeof isValidation === 'boolean' ? isValidation : true }
			);
		
			try {
				const response = yield window.fetch(
					REST_CLOUD_QUOTE_SAVE,
					{
						method: 'POST', 
						credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify( submitData )
					}
				)
				// successful
				if ( response.ok ) 
					return { status: response.status };
				// fail with server message
				const result = yield response.json();
				return {
					status: response.status,
					body: result
				};
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		createQuote: flow (function* createQuote(){
			try {
				const response = yield window.fetch(
					REST_API_QUOTE_CREATE,
					{
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify( Object.assign(
								{},
								self.storeValue,
								{ validate: true}
							)
						)
					}
				)
				if ( response.ok ) 
					return { status: response.status };

				const result = yield response.json();
				return {
					status: response.status,
					body: result
				};
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		createCloudQuote: flow (function* createCloudQuote({uuid}){
			const submitData = Object.assign(
				{},
				self.__cloudCustomerSnapshot,
				{ uuid: uuid },
				{ validate: true }
			);

			try {
				const response = yield window.fetch(
					REST_CLOUD_QUOTE_CREATE,
					{
						method: 'POST', 
						credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify( submitData )
					}
				)
				if ( response.ok ) 
					return { status: response.status };

				const result = yield response.json();
				return {
					status: response.status,
					body: result
				};
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		retrieveQuoteById: flow ( function* retriveQuoteById(uuid){
			try {
				const response = yield window.fetch(
					REST_API_QUOTE_DETAIL,
					{
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: uuid.toString()
					}
				)

				const result = yield response.json();
				applySnapshot( self.customer, {
					...result,
					accountBRN: result.accountUEN,
					isSameAddress: result.correspondenceAddressSameWithPrimary,
					isSameContact: result.authorizedContactSameWithContact,
					isReady: true,
				});
				if ( typeof self.product === 'undefined' ){
					self.createNewProduct({productName: 'SD LAN'});
				}
				self.product.packages = PackageStore.create({
					...result,
					isReady: true,
				})
				if ( response.ok ) 
					return { status: response.status };
					
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		retrieveMSQuoteById: flow ( function* retrieveMSQuoteById(uuid){
			try {
				const response = yield window.fetch(
					REST_API_QUOTE_DETAIL, //REST_CLOUD_QUOTE_DETAIL,
					{
						method: 'POST',
						credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: uuid.toString() //JSON.stringify({ uuid: uuid.toString() })
					}
				)

				const result = yield response.json();
				applySnapshot( self.customer, {
					...result,
					accountBRN: result.accountUEN,
					isSameAddress: result.correspondenceAddressSameWithPrimary,
					isSameContact: result.authorizedContactSameWithContact,
					isReady: true,
				});
				
				if ( response.ok ) 
					return { status: response.status };
					
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		downloadBlob: flow( function* downloadBlob({url, fileName, mineType}){
			try {
				const downloadResponse = yield window.fetch(url);
				//
				if ( !downloadResponse.ok ) return { statusCode: downloadResponse.status };
				//
				const blobData = yield downloadResponse.blob();
				DownloadJS(
					blobData,
					fileName,
					mineType
				);
				return { statusCode: 200};
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
		keepAlive: flow ( function* keepAlive(){
			try {
				const response = yield window.fetch(
					REST_KEEPALIVE,
					{
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
					}
				);
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
		}),
	}));

export default RootStore;