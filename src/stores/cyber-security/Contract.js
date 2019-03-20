import { types, flow, applySnapshot, getParent } from 'mobx-state-tree'
import * as Globals from 'stores/global'

const Terms = types.model('Terms', {
    currency: "SGD",
    default: false,
    duration: 12,
    otc: 0,
    rc: 0,
    unit: "Month"
}).actions(self => ({
    doCheck() {
        getParent(self, 2).setDuration(self.duration)
    }
}))

const Bom = types.model('Bom', {
    name: '',
    qty: 0,
    subProductType: ''
})

const Profile = types.model('Profile', {
    name: '',
    package: '',
    pid: '',
    qty: 0,
    sn: 0,
    boms: types.array(Bom, [])
})

const Price = types.model('Price', {
    pid: '',
    name: '',
    upfrontCost: 0,
    monthlyCost: 0,
    quantity: 0,
    grandTotal: 0,
    currency: 'SGD'
})

const Summary = types.model('Summary', {
    currency: 'SGD',
    grandTotal: 0,
    upfrontCostTotal: 0,
    priceSummary: types.array(Price, [])
})

const Contract = types.model('Contract', {
    terms: types.array(Terms, []),
    boms: types.array(Profile, []),
    summary: types.maybe(Summary),
    selectedDuration: 0
}).views(self => ({
    // refresh() {
    //     if(self.selectedDuration) self.getBom()
    // }
    get contractParams() {
        const data = {
            "duration": "12",
            "products": [
                {
                    "pid": "CYBERSEC_000001",
                    "qty": "51",
                    "answerList": [
                        {
                            "questionId": "1",
                            "value": "OFF-HR"
                        }
                    ],
                    "addOns": []
                },
                {
                    "pid": "CYBERSEC_000002",
                    "qty": "16",
                    "answerList": [
                        {
                            "questionId": "1",
                            "value": "OFF-HR"
                        }
                    ],
                    "addOns": []
                },
                {
                    "pid": "CYBERSEC_000003",
                    "qty": "10",
                    "answerList": [
                        {
                            "questionId": "1",
                            "value": "SEG-SP-PKG"
                        },
                        {
                            "questionId": "1",
                            "value": "OFF-HR"
                        }
                    ],
                    "addOns": [
                        {
                            "id": "addon-sandbox",
                            "qty": "1"
                        },
                        {
                            "id": "addon-encrypt",
                            "qty": "1"
                        }
                    ]
                },
                {
                    "pid": "CYBERSEC_000004",
                    "qty": "1",
                    "answerList": [],
                    "addOns": []
                },
                {
                    "pid": "CYBERSEC_000005",
                    "qty": "16",
                    "answerList": [
                        {
                            "questionId": "1",
                            "value": "Ethernet"
                        },
                        {
                            "questionId": "2",
                            "value": "10 mbps"
                        }
                    ],
                    "addOns": []
                }
            ]
        }
        return data
    }
})).actions(self => ({
    afterCreate() {
        //self.getTerms()
        //self.getBom()
        //self.getSummary()
    },
    setDuration(value) {
        self.selectedDuration = value;
    },
    getTerms: flow(function* getTerms() {
        if (self.terms.length > 0) return
        try {
            const response = yield window.fetch(
                Globals.REST_CYBER_SECURITY_CONTRACT_TERMS,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(self.contractParams.products)
                }
            )
            const result = yield response.json()
            result.map((d, i) => d.default ? self.selectedDuration = d.duration : d)
            applySnapshot(self.terms, result)
            return response
        } catch (err) {
            console.error(err);
            //throw new Error('There is unexpected issue from your request')
        }
    }),
    getBom: flow(function* getBom() {
        //if (self.boms.length > 0) return
        try {
            const response = yield window.fetch(
                Globals.REST_CYBER_SECURITY_CONTRACT_BOM,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify({ "product": value })
                }
            )
            const result = yield response.json()
            applySnapshot(self.boms, result)
        } catch (err) {
            console.error(err);
            //throw new Error('There is unexpected issue from your request')
        }
    }),
    getSummary: flow(function* getSummary() {
        //if (self.summary) return
        try {
            const response = yield window.fetch(
                Globals.REST_CYBER_SECURITY_CONTRACT_SUMMARY,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(self.contractParams)
                }
            )
            const result = yield response.json()
            self.summary = Summary.create(result)
            //applySnapshot(self.summary, result)
        } catch (err) {
            console.error(err);
            //throw new Error('There is unexpected issue from your request')
        }
    })
}))

export default Contract