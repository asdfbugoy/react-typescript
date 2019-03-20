import { types } from 'mobx-state-tree'

const OptionList = types.model('OptionList', {
    description: '',
    isSelected: false,
    label: '',
    selectable: true,
    tooltip: '',
    value: '',
})

const SourceList = types.model('SourceList', {
    isSelected: false,
    label: '',
    optionList: types.array(OptionList,[]),
    selectable: true,
    tooltip: '',
    value: ''
}).actions(self => ({
    toggleSelected() {
        self.isSelected = !self.isSelected
    }
}))

const Question = types.model('Question', {
    dataType: '',
    id: 0,
    question: '',
    sourceList: types.array(SourceList, []),
    selectable: true,
    title: ''
})

const Product = types.model('Product', {
    dataType: '',
    description: '',
    isSelected: false,
    pid: '',
    qty: 0,
    questions: types.array(Question, []),
    selectable: true,
    title: ''
}).actions(self => ({
    toggleSelected() {
        self.isSelected = !self.isSelected
    }
}))

const Recommendation = types.model('ProductCategory', {
    productType: '',
    products: types.array(Product, [])
}).views(self => ({

})).actions(self => ({
    afterCreate() {
        //self.getQuestions()
    }
}))

export default Recommendation