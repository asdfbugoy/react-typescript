import { types, flow, applySnapshot } from 'mobx-state-tree';
import { REST_API_SEARCH_CUSTOMER_CONTACT, REST_API_SEARCH_CUSTOMER, REST_CREDENTIALS } from './global';
import { AddressModel } from './LocationStore';

const ContactModel = types
	.model('ContactModel', {
		firstName: '',
		lastName: '',
		contactNumber: '',
		contactEmail: '',
		mobileNumber: ''
	})
	.views(self => ({
		get isValid() {
			return (
				self.firstName !== '' && 
				self.lastName !== '' && 
				self.contactNumber !== '' && 
				self.contactEmail !== '') ? true : false;
		},
		isValidContactEmail() {
			if(self.contactEmail) return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(self.contactEmail)
			return true
		}
	}))
	.actions(self => ({
		onChange({name, value}) {
			self[name] = value;
		},
		fetchContact: flow(function* fetchContact({accountId, query}) {
			try {
				const response = yield window.fetch(
					REST_API_SEARCH_CUSTOMER_CONTACT, {
						method: 'POST',
						credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"accountId": accountId, // "STQfxKGkwrY5Ea3D75nNFA==",
							"query": query
						})
					})
				return yield response.json();
			} catch (e) {
				console.error(e);
				throw 'There is unexpected issue from your request';
			}
		}),
		onSelectContact(detail){
			applySnapshot( self, detail );
		}
	}))

const CustomerStore = types
	.model('CustomerStore', {
		isReady: false,
		// uuid: '',
		accountId: '',
		accountName: '',
		accountBRN: '',
		primaryAddress: types.optional(AddressModel, {}),
		correspondenceAddress: types.optional(AddressModel, {}),
		isSameAddress: true,
		contactDetail: types.optional(ContactModel, {}),
		authorizedContactDetail: types.optional(ContactModel, {}),
		isSameContact: true,
		isTechnicalTermsCondition: false,
		comments: ''
	})
	.views(self => ({
		get isValidated() {
			if (self.accountName === '' || self.accountBRN === '') return false;
			if (!self.primaryAddress.isValid) return false;
			if (!self.isSameAddress && !self.correspondenceAddress.isValid) return false;
			if (!self.contactDetail.isValid) return false;
			if (!self.isSameContact && !self.authorizedContactDetail.isValid) return false;
			return true;
		}
	}))
	.actions(self => ({
		toggleSameAddress(stat) {
			self.isSameAddress = stat
		},
		toggleSameContact(stat) {
			self.isSameContact = stat
		},
		toggleTechnicalTermsCondition(stat) {
			self.isTechnicalTermsCondition = stat
		},
		onChange({name, value}) {
			self[name] = value;
		},
		setCustomer(data) {
			applySnapshot(self, {
				...data,
				accountBRN: data.uen
			})
		},
		resetCustomer() {
			applySnapshot(self, {})
		},
		fetchCustomer: flow(function* fetchCustomer({keyword, pageSize, pageNo}) {
			try {
				const response = yield window.fetch(
					REST_API_SEARCH_CUSTOMER, {
						method: 'POST',
						credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json',
							'pageSize': pageSize,
							'pageNo': pageNo
						},
						body: keyword
					});

				const data = yield response.json();
				const totalCount = response.headers.get('TotalCount');
				return { totalCount: totalCount, result: data };
			} catch (e) {
				console.error(e);
				throw 'There is unexpected issue from your request';
			}
		})
	}))

export { CustomerStore };