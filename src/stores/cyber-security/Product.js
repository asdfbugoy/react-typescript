import { types, flow, applySnapshot } from 'mobx-state-tree'
import * as Globals from 'stores/global'
import Question from 'stores/cyber-security/Question'
import Recommendation from 'stores/cyber-security/Recommendation'
import Contract from 'stores/cyber-security/Contract'

const Overview = types.model('Overview', {
    items: types.array(types.frozen(), []),
    inputType: '',
    name: '',
}).actions(self => ({

}))

const Product = types.model('Product', {
    contract: types.maybe(Contract),
    name: 'cyber-security',
    maxProfileSize: 0,
    overview: types.array(Overview , []),
    questions: types.array(Question, []),
    recommendations: types.array(Recommendation, []),
}).views(self => ({
    get totalSelected() {
        let total = 0
        self.questions.map(d => total = d.totalSelected ? total + 1 : total)
        return total
    },
    get recommendationParams() {
        const data = {
            product: "cyber-security",
            profiles: []
        }
        self.questions.map((d, i) =>
            d.sourceList.map((dSourceList, iSourceList) =>
                dSourceList.isSelected
                    ? data.profiles.push({
                        questionId: d.id,
                        value: dSourceList.value
                    })
                    : dSourceList
            )
        )
        return data
    }
})).actions(self => ({
    afterCreate() {
        //self.getQuestions()
        self.contract = Contract.create()
    },
    getQuestions: flow(function* getQuestions() {
        if (self.questions.length > 0) return
        try {
            const response = yield window.fetch(
                Globals.REST_CYBER_SECURITY_QUESTIONS,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify({ "product": value })
                }
            )
            const result = yield response.json()
            self.maxProfileSize = result.maxProfileSize
            applySnapshot(self.questions, result.questions)
        } catch (err) {
            console.error(err);
            //throw new Error('There is unexpected issue from your request')
        }
    }),
    getRecommendations: flow(function* getRecommendations() {
        //if (self.recommendations.length > 0) return
        try {
            const response = yield window.fetch(
                Globals.REST_CYBER_SECURITY_RECOMMENDATIONS,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(self.recommendationParams)
                }
            )
            const result = yield response.json()
            applySnapshot(self.recommendations, result)
        } catch (err) {
            console.error(err);
            //throw new Error('There is unexpected issue from your request')
        }
    })
}))

export { Product }