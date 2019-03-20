import { types } from 'mobx-state-tree';

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
        productAttributes: types.array(ProductAttributes, []),
        isLoading: false
    })

export default PackageOffer