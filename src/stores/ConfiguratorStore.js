import { types, flow, isAlive, getSnapshot, getParent, getRoot } from 'mobx-state-tree';
import { REST_API_QUESTION, REST_CREDENTIALS } from './global';
import { QuestionModel } from './QuestionModels';

const ConfiguratorStore = types
	.model({
        productName: types.string,
        questions:  types.array( QuestionModel, []),
        maxProfileSize: 10,
        isReady: false,
	})
	.views( self => ({
        get configurationQuestions(){
            const snap = getSnapshot( self );
            return snap.questions;
        }
	}))
	.actions( self => ({
		afterCreate(){
			self.fetchQuestions();
        },
		fetchQuestions: flow(function* fetchQuestions() {
			try {
				const response = yield window.fetch( 
					REST_API_QUESTION,
					{
						method: 'POST',
						credentials: REST_CREDENTIALS,
						headers:{
							'Content-Type': 'application/json'
						},
						body: self.productName
					}
				);
                const result = yield response.json();

                if ( isAlive(self.questions) ){
                    self.questions.push( ...result.questions );
                    self.maxProfileSize = result.maxProfileSize;
                    getParent(self, 1).setMaxCartItem( result.maxProfileSize );
                    getParent(self, 1).setProductStoreActive();
					self.isReady = true;
                }
			} catch (err) {
				console.error( err );
			}
        })
	}))

export {ConfiguratorStore};