import { types, getParent} from 'mobx-state-tree';

const AnswerModel = types
	.model('AnswerModel',{
		value: '',
		label: '',
		tooltip: '',
		port: '',
	})
	.views( self => ({
		get styleChecked(){
			return getParent(self, 2).selectedValue === self.value ? 'active' : '';
		},
	}))
	.actions( self => ({
		doCheck(){
			getParent(self, 2).doSelectAnswer(self.value);
		},
	}));

const QuestionModel = types
	.model({
        id: types.number,
        sn: 0,
		question: types.optional( types.string, ''),
		dataType: types.optional( types.string, ''),
		sourceList: types.array( AnswerModel, []),
		selectedValue: ''
	})
	.actions( self => ({
		doSelectAnswer(value){
			self.selectedValue = value;
		}
	}));

const CompactQuestionModel = types
	.model({
		name: '',
		value: '',
		selectedValue: '',
		options: types.array( AnswerModel, []),
	})
	.actions( self => ({
		afterCreate(){
			if ( self.selectedValue !== self.value) {
				self.selectedValue = self.value.toString();
			}
		},
		doSelectAnswer(value){
			self.value = value;
			self.selectedValue = value;
		}
	}));

const AddonQuestionModel = types
	.model({
		id: '',
		value: '',
		type: '',
		quantity: 0,
		port: '',
		options: types.array( AnswerModel, []),
		group: '',
		disabled: false
	})
	.views( self => ({
		get booleanValue(){
			return ( self.type === 'checkbox' && self.value === 'true') ? true : false;
		},
		get countValue(){
			switch( self.type ){
				case 'number':
					return parseInt(self.port) * parseInt(self.value);
				case 'dropdown':
					let foundIndex = self.options.findIndex( opt => opt.value === self.value )
					if ( foundIndex >= 0 )
						return parseInt(self.options[foundIndex].port);
					return 0;
				default:
					return 0;
			}
		}
	}))
	.actions( self => ({
		decrementQty(){
			if (self.type === 'number') {
				let intValue = parseInt(self.value);
				self.value = (intValue-1).toString();
			}
		},
		increaseQty(){
			if (self.type === 'number') {
				let intValue = parseInt(self.value);
				self.value = (intValue+1).toString();
			}
		},
		changeQty(newValue){
			if (self.type === 'number') {
				let intValue = parseInt(newValue);
				self.value = intValue.toString();
			}
		},
		changeValue( newValue ){
			self.value = newValue;
		},
		toggleCheckbox( value ){
			self.value = ( self.type === 'checkbox' && value) ? 'true' : 'false';
		}
	}));
	
export { AnswerModel, QuestionModel, CompactQuestionModel, AddonQuestionModel };