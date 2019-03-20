import { types, flow, getSnapshot, applySnapshot } from 'mobx-state-tree';
import {
    REST_CLOUD_QUESTION,
    REST_CREDENTIALS,
    REST_CLOUD_PACKAGES,
    REST_CLOUD_ADDONS,
    REST_CLOUD_TERMS,
    REST_CLOUD_PRICE_SUMMARY,
    REST_CLOUD_PRICE_SAVE,
} from 'stores/global';
import { ContractModel } from 'stores/PackageStore';

const AddonModel = types
    .model('AddonModel', {
        id: '',
        title: '',
        description: '',
        dataType: '',
        qty: 0
    })
    .views(self => ({
        get __isChecked() {
            return self.qty === 1 ? true : false;
        }
    }))
    .actions(self => ({
        decrementQty() {
            self.qty -= 1;
        },
        increaseQty() {
            self.qty += 1;
        },
        changeQty(qty) {
            self.qty = qty;
        },
        toggleCheckbox() {
            self.qty = self.qty === 0 ? 1 : 0;
        },
        reset(){
            self.qty = 0;
        }
    }))

const Features = types
    .model('Features', {
        id: 0,
        label: '',
        tooltip: ''
    })

const Products = types
    .model('ProductAttributes', {
        pid: '',
        name: '',
        sn: '',
        qty: 0,
        dataType: '',
        label: '',
        description: '',
        features: types.array(Features, [])
    })
    .actions(self => ({
        decrementQty() {
            self.qty -= 1;
        },
        increaseQty() {
            self.qty += 1;
        },
        changeQty(qty) {
            self.qty = qty;
        }
    }))

const ProductAttributes = types
    .model('Products', {
        id: 0,
        label: '',
        tooltip: ''
    })

const PackageOffer = types
    .model('PackageOffer', {
        name: '',
        title: '',
        description: '',
        displayType: '',
        products: types.array(Products, []),
        productAttributes: types.array(ProductAttributes, [])
    })
    .views( self => ({
        get __selectedProducts(){
            const selectedProducts = [];
            self.products.map( product => product.qty > 0 && selectedProducts.push({
                pid: product.pid,
                qty: product.qty
            }));
            return selectedProducts;
        }
    }))
    .actions(self => ({
        reset(){
            self.products.map( product => product.qty = 0 );
        }
    }))

const SourceList = types
    .model('SourceList', {
        value: '',
        label: '',
        tooltip: '',
        image: '',
        selectable: true,
        isSelected: false
    })
    .views(self => ({

    }))
    .actions(self => ({

    }))

const Question = types
    .model('Question', {
        id: 0,
        sn: 0,
        question: '',
        dataType: '',
        sourceList: types.array(SourceList, []),
        selectedValue: ''
    })
    .views(self => ({

    }))
    .actions(self => ({
        setSelectedValue(value) {
            self.selectedValue = value
        },
        setActive() {
            self.sourceList.map(d => d.isSelected = d.value === self.selectedValue ? true : false)
        }
    }))

const CloudContractModel = types.compose(
    ContractModel,
    types.model('CloudContractModel',{
        otc: 0
    })
    .views( self => ({
        get __otcWithCurrency(){
            return `${self.currency} ${ self.otc.toLocaleString('en') }`;
        },
        get __rcWithCurrency(){
            return `${self.currency} ${ self.rc.toLocaleString('en') }`;
        }
    }))
)


const Product = types
    .model('Product', {
        name: 'MS Cloud',
        maxProfileSize: 0,
        question: types.maybe(Question),
        packageOffers: types.array(PackageOffer,[]),
        addons: types.array(AddonModel, []),
        contracts: types.array( CloudContractModel, []),
        selectedDuration: 0,
        uuid: '',
        cartQty: 0
    })
    .views(self => ({
        get __selectedTerm(){
            const found = self.contracts.find( term => term.duration === self.selectedDuration );
            return found ? found : CloudContractModel.create()
        },
        get __isStep_Addon_Ready(){
            return self.__productValue.products.length > 0 ;
        },
        get __isStep_Term_Ready(){
            return self.__productValue.products.length > 0 ;
        },
        get __isStep_Customer_Ready(){
            return self.selectedDuration !== 0 && self.uuid !== '' ? true : false;
        },
        get __productValue(){
            const data = {
                // uuid: self.uuid.toString(),
                duration: self.selectedDuration,
                products: [],
                addOns: []
            }
            //
            let productList = [];
            self.packageOffers.map((d) => {
                productList = productList.concat(d.__selectedProducts )
            });
            data.products = productList;
            //
            let addonList = [];
            self.addons.map( item => {
                if ( item.qty > 0 ) addonList.push({
                    id: item.id,
                    qty: item.qty
                });
            })
            data.addOns = addonList;
            //
            return data;
        },
        get __sortedContractTerms(){
            return self.contracts.sort( (a,b) => b.duration - a.duration );
        },
        getPackageOfferTitleByName() {
            return self.question.selectedValue ? self.getPackageOfferByName(self.question.selectedValue).title : null
        },
        getPackageOfferByName(name) {
            return self.packageOffers.find((d) => d.name === name)
        },
        getProductWithQtyCount() {
            let count = 0
            self.packageOffers.map((d) => {
                d.products.map((dProducts) => {
                    count = dProducts.qty > 0 ? count + 1 : count
                })
            })
            return count
        },
        getAddonsWithQtyCount() {
            let count = 0
            self.addons.map((d) => {
                count = d.qty > 0 ? count + 1 : count
            })
            return count
        }
    }))
    .actions(self => ({
        afterCreate() {
            //self.getQuestion().then(() => self.question.sourceList.map(d => self.getPackageOffer(d.value)))
        },
        setCartQty() {
            let count = 0
            self.packageOffers.map((d) => {
                d.products.map((dProducts) => {
                    count = dProducts.qty > 0 ? count + 1 : count
                })
            })
            self.cartQty = count
        },
        resetCart(){
            self.packageOffers.map( item => item.reset() );
            self.addons.map( item => item.reset() );
        },
        sortPackageOffers() {
            self.packageOffers = getSnapshot(self.packageOffers).slice().sort((a, b) => {
                if (a.name > b.name)
                    return -1
                if (a.name < b.name)
                    return 1
                return 0
            })
        },
        getQuestion: flow(function* getQuestion() {
            if(self.question) return self.question
            try {
                const response = yield window.fetch(
                    REST_CLOUD_QUESTION,
                    {
                        method: 'POST', credentials: REST_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const result = yield response.json()
                self.question = result.questions
                self.maxProfileSize = result.maxProfileSize
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        getPackageOffer: flow(function* getPackageOffer(value) {
            if(self.getPackageOfferByName(value)) return
            try {
                const response = yield window.fetch(
                    REST_CLOUD_PACKAGES,
                    {
                        method: 'POST', credentials: REST_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "product": value })
                    }
                )
                const result = yield response.json()
                self.packageOffers.push(result)
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        getAddons: flow(function* getPackageOffer({signal}) {
            if ( self.addons.length > 0 ) return self.addons;
            //
            try {
                const response = yield window.fetch(
                    REST_CLOUD_ADDONS,
                    {
                        method: 'POST', 
                        credentials: REST_CREDENTIALS,
                        signal: signal,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const result = yield response.json();
                result.map( item => {
                    self.addons.push(
                        AddonModel.create({
                            id: item.id,
                            title: item.title,
                            dataType: item.dataType,
                            description: item.description
                        })
                    )
                })
                // self.addons = result;
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        // for get/set contract term duration
        getContractTerms: flow ( function* getContractTerms({signal}){
            try {
                const { products, addOns } = self.__productValue; 
                const response = yield window.fetch(
                    REST_CLOUD_TERMS,
                    {
                        method: 'POST', 
                        credentials: REST_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        signal: signal || null,
                        body: JSON.stringify({products, addOns})
                    }
                );
                const result = yield response.json();
                self.contracts = [];
                result.map( term => {
                    self.contracts.push(
                        CloudContractModel.create( term )
                    );
                    if ( term.default ) self.selectedDuration = term.duration;
                });
                return true;
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        setDuration(value) {
			self.selectedDuration = value;
        },
        getPriceSummary: flow (function* getPriceSummary({signal}) {
            if ( self.selectedDuration === 0) return { priceSummary: [] } ;
            try {
                
                const response = yield window.fetch(
                    REST_CLOUD_PRICE_SUMMARY,
                    {
                        method: 'POST', 
                        credentials: REST_CREDENTIALS,
                        signal: signal || null,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(self.__productValue)
                    }
                );
                const result = yield response.json();
                return result;
            } catch (err) {
                // console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        saveSelectedTerm: flow( function* saveSelectedTerm(){
            try {
                const response = yield window.fetch(
                    REST_CLOUD_PRICE_SAVE,
                    {
                        method: 'POST', 
                        credentials: REST_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify( Object.assign(
                            {},
                            self.__productValue,
                            {uuid: self.uuid }
                        ))
                    }
                );
                const result = yield response.json();
                if ( response.ok ){
                    self.uuid = result.uuid;
                    return true;
                }
                return false;
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        })

    }))
export { Product }