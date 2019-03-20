import { types } from 'mobx-state-tree'

const SourceList = types.model('SourceList', {
    value: '',
    label: '',
    isSelected: false
}).actions(self => ({
    setSelected(flag) {
        self.isSelected = flag
    },
    toggleSelected() {
        self.setSelected(!self.isSelected)
    }
}))

const Question = types.model('Question', {
    id: 0,
    sn: 0,
    question: '',
    dataType: '',
    sourceList: types.array(SourceList, []),
    questionParts: types.array(types.frozen(), [])
}).views(self => ({
    get totalSelected() {
        let total = 0
        self.sourceList.map(d => total = d.isSelected ? total + 1 : total)
        return total
    }
})).actions(self => ({
    setSelected(id) {
        self.sourceList.map((d, i) => id !== i ? d.setSelected(false) : d.toggleSelected())
    }
}))

export default Question