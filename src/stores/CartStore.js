import { types, getParent, destroy, getSnapshot, isAlive } from 'mobx-state-tree';
import { STORAGE_NAME } from './global';
import { QuestionModel } from './QuestionModels';

const ProductItemModel = types
	.model({
		quantity: 1,
		questions: types.array( QuestionModel, []),
	})
	.views( self => ({
		get primaryName(){
			let primaryName = '';
			self.questions.map( question => {
				if ( question.sn === 1 ) primaryName = question.sourceList.find( answer => answer.value === question.selectedValue ).label;
			});
			return primaryName;
		},
		get profile(){
			let result = {
				name: self.primaryName,
				qty: self.quantity,
				answers: []
			};
			self.questions.map( question => {
				result.answers.push({
					questionId: question.id,
					answer: question.selectedValue
				})
			});
			return result;
		},
		get profileCaptions(){
			let result = [];
			self.questions.map( question => {
				const answer = question.sourceList.find( answer => answer.value === question.selectedValue );
				result.push(answer.label);
			});
			return result
		},
		get isValidated(){
			if ( isAlive(self.questions) ) {
				for ( var i = 0; i< self.questions.length; i++){
					if ( self.questions[i].selectedValue === '' ) return false;
				}
			}
			return true;
		},
		get profileContent(){
			let primaryName = '';
			self.questions.map( question => {
				if ( question.sn === 1 ) primaryName = question.sourceList.find( answer => answer.value === question.selectedValue ).label;
			})
			return Object.assign(
				{}, 
				getSnapshot( self ),
				{
					primaryName: primaryName
				}
			);
		}
	}))
	.actions( self => ({
		removeByIndex(indexNo){
			getParent( self, 2 ).removeItemByIndex(indexNo);
		},
		decrementQty(){
			self.quantity -= 1;
		},
		increaseQty(){
			self.quantity += 1;
		},
		changeQty(newValue){
			self.quantity = newValue;
		}
	}));

const ProductCartStore = types
	.model('ProductCartStore', {
		remark: '',
		maxItems: 10,
		profiles: types.array(ProductItemModel, []),
		errorMessage: ''
	})
	.actions( self => ({
		addToCart({name, selectedOptions}){
			// let currentCart = JSON.parse ( )
		},
		removeItemByIndex(indexNo){
			self.profiles.splice(indexNo, 1);
		}
	}));

export { ProductItemModel, ProductCartStore };