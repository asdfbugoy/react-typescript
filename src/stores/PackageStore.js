import { types, flow, getParent, applySnapshot} from 'mobx-state-tree';
import { REST_API_BOM, REST_API_RETRIEVEADDRESS, REST_CREDENTIALS } from '../stores/global';
import { CompactQuestionModel, AddonQuestionModel } from './QuestionModels';
import { AddressModel } from './LocationStore';

import sampleStore from './sampleStore';

const ContentModel = types
	.model('ContentModel', {
		title: '',
		content: '',
		more: '',
		pic_type: ''
	})
	.views( self => ({
		get hasMore(){
			if (self.more !== '') return true;
			return false;
		},
		get hasImage(){
			if (self.pic_type !== '') return true;
			return false;
		}
	}));

const ContractModel = types
	.model('ContractModel',{ 
		duration: 36, 
		unit: 'month', 
		rc: 0, 
		currency: 'SGD', 
		default: false,
		planner: types.array(
			types.model({
				uc: 0,
				rc: 0,
				currency: 'SGD',
				default: false
			}),
			[]
		),
		priceSummary: types.optional( types.frozen(), {}),
	})
	.actions( self => ({
		doCheck(){
			getParent(self, 2).setDuration( self.duration );
		},
	}));

const PackageProfile = types
	.model('PackageProfile',{
		pid: types.string,
		sn: 0,
		qty: 1,
		name: '',
		package: '',
		components: types.array( types.string, []),
		selectedAddons: types.array( AddonQuestionModel, []),
		siteAddresses: types.array( AddressModel, []),
		validationFormula: '',
	})
	.views( self => ({
		get totalAddresses(){
			return self.siteAddresses.length;
		},
		get isAddressesValid(){
			return self.siteAddresses.reduce( (currentState, address) => currentState && address.isValid, true );
		},
		get profileAddresses(){
			return self.siteAddresses.reduce( (result, address)=>{
				result.push({
					unitNo: address.unitNo,
					postalCode: address.postalCode
				});
				return result;
			}, []);
		},
		get profileValue(){
			return {
				pid: self.pid,
				siteAddresses: self.profileAddresses
			}
		},
		get availablePorts(){
			let formula = self.validationFormula.toString();
			self.selectedAddons.map( addon => {
				const addonName = '#'+addon.id;
				if ( formula.indexOf( addonName ) >= 0 ) { 
					formula = formula.replace( addonName, addon.countValue );
				}
			});
			return Math.floor( eval( formula ) );
		}
	}))
	.actions( self => ({
		afterCreate(){
			//
		},
		getBom: flow(function* getBom() {
			try { 
				const response = yield window.fetch(
					REST_API_BOM,
					{
						method: 'POST',
						credentials: REST_CREDENTIALS,
						headers:{
							'Content-Type': 'application/json'
						},
						body: self.pid
					}
				)
				return yield response.json();
			} catch (e) {
				console.error(e);
			}
		}),
		generateAddresses(){
			self.siteAddresses = [];
			for (var index = 0; index < self.qty; index ++){
				self.siteAddresses.push(
					AddressModel.create({})
				)
			}
		},
		retrieveAddresses: flow ( function* retrieveAddressFromPostalCode(addresses){
			const postalCodes = addresses.reduce( (result, address) => {
				result.push( address.postalCode );
				return result;
			}, [])
			try { 
				const response = yield window.fetch(
					REST_API_RETRIEVEADDRESS,
					{
						method: 'POST',
						credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(postalCodes)
					});
				const result = yield response.json();
				let formattedResult = [];
				result.map( (address, index) => formattedResult.push({
					...address,
					unitNo: addresses[index].unitNo,
					isValid: address.found
				}))
				self.siteAddresses.map( (address, index) => {
					if ( typeof formattedResult[index] !== 'undefined' )
						applySnapshot( address, formattedResult[index] )
				})
				return true;	
			} catch (e) {
				throw 'Your request has some issue';
				console.error( e );
				return false;
			}
		}),
	}))

const PackageStore = types
	.model('PackageStore', {
		isReady: false,
		uuid: '',
		profiles: types.array( PackageProfile, []),
		misc: types.array( CompactQuestionModel, []),
		addonConfiguration: types.array(
			types.model({
				id: '',
				name: '',
				type: '',
				group: ''
			})
			,[]),
		//addonGroup: types.array(types.string, []),
		packageContent: types.array( ContentModel, []),
		addonContent: types.array( ContentModel, []),
	})
	.views( self => ({
		get packageValue(){
			let request = {
				uuid: self.uuid.toString(),
				profiles: [],
				params: []
			}
			// selectedAddons
			self.profiles.map( profile => {
				let addonResult = [];
				profile.selectedAddons.map( addon => {
					addonResult.push({
						id: addon.id,
						value: addon.value
					})
				});
				request.profiles.push({
					pid: profile.pid,
					selectedAddons: addonResult
				});
			});
			// misc configuration
			self.misc.map( item => {
				request.params.push({
					name: item.name,
					value: item.value
				})
			})
			return request;
		}
	}))
	.actions( self => ({
		afterCreate(){
			// applySnapshot( self, sampleStore.packages );
		},
		getAddonNameById(id){
			const result = self.addonConfiguration.find( addon => addon.id === id );
			return result.name;
		},
		getAddonTypeById(id){
			const result = self.addonConfiguration.find( addon => addon.id === id );
			return result.type;
		},
		getProfileById(id){
			const result = self.profiles.find( profile => profile.pid === id);
			return result;
		},
		applyAddons(result){
			applySnapshot( self.addonConfiguration, result.addons );
			//applySnapshot( self.addonGroup, result.addonGroup )
			result.profiles.map( profile => {
				const currentProfile = self.getProfileById(profile.pid);
				if ( currentProfile ) {
					applySnapshot( currentProfile.selectedAddons, profile.selectedAddons );
					
					currentProfile.qty = profile.qty;
					currentProfile.validationFormula = profile.validationFormula;
					currentProfile.generateAddresses();
				}
			})
		},
	}))

export {PackageStore, ContractModel};