import { types, flow, applySnapshot, getSnapshot} from 'mobx-state-tree';
import { REST_API_RETRIEVEADDRESS, REST_CREDENTIALS } from './global';

const AddressModel = types
	.model('AddressModel', {
		unitNo: '',
		blockNo: '',
		streetName: '',
		buildingName: '',
		postalCode: '',
		country: 'SINGAPORE',
		isFetching: false,
	})
	.views( self => ({
		get address(){
			const {buildingName, blockNo, streetName, country, postalCode} = self;
			return `${buildingName} ${blockNo} ${streetName} ${country} ${postalCode}`.trim();
		},
		get addressSnapshot(){
			return getSnapshot(self);
		},
		get addressValue(){
			return {
				postalCode: self.postalCode,
				unitNo: self.unitNo
			}
		},
		get isValid(){
			return ( self.unitNo !== '' && self.postalCode !== '') ? true : false;
		}
	}))
	.actions( self => ({
		onChange({name, value}){
			if ( typeof self[name] !== 'undefined' ) self[name] = value;
		},
		cloneFrom( snap ){
			applySnapshot( self, snap );
		},
		retrieveAddressFromPostalCode: flow ( function* retrieveAddressFromPostalCode(postalCode){
			self.isFetching = true;
			try { 
				// console.log('JSON.stringify([self.postalCode])', JSON.stringify([self.postalCode]));
				const response = yield window.fetch(
					REST_API_RETRIEVEADDRESS,
					{
						method: 'POST',
						credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify([postalCode])
					});
				const result = yield response.json();
				applySnapshot( self, Object.assign({}, {
					...result[0],
					unitNo: self.unitNo.toString(),
					isValid: result[0].found
				}));
				self.isFetching = false;			
			} catch (e) {
				throw 'Your request has some issue';
				console.error( e );
				self.isFetching = false;
			}
		})
    }));

export{ AddressModel }