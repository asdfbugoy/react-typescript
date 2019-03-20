import React from 'react'
import Banner from 'components/BannerComponent'
import { QuantityComponent } from './../components/QuantityComponent'
import { Collapsable, CollapsableButton, CollapsableContent } from './../components/Collapsable'
import Checkbox from '@material-ui/core/Checkbox'
import { observer } from 'mobx-react'
import { isMobileOnly } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { ROUTER_SD_SOLUTION, ROUTER_MS_CONTRACT_TERMS, ROUTER_MS_ADDONS } from '../stores/global'

class Cart extends React.Component {
    componentDidMount() {
        this.props.rootStore.productMSCloud.sortPackageOffers()
    }
    render() {
        const banner = {
            background: 'img/hero4.jpg',
            mobileBackground: 'img/hero4-mobile.jpg',
            textcolor: '',
            title: 'My Cart'
        }
        const { product, productMSCloud } = this.props.rootStore
        return <article className="main background-very-light-gray pb-2">
            <Banner {...banner} />
            <section className="container">
                {this.props.rootStore.getCartCount() > 0 ? <React.Fragment>
                    {product.cart.profiles.length > 0 && <Collapsable isOpen={true}><ProductSDLan product={product} /></Collapsable>}
                    {productMSCloud.getProductWithQtyCount() > 0 && <Collapsable isOpen={true}><ProductMSCloud product={productMSCloud} /></Collapsable>}
                </React.Fragment> : <div className="card border shadow mb-4">
                    <div className="card-body">
                        <div className="pt-5 pb-5 text-center sub-title-text">Currently Cart is Empty</div>
                    </div>
                </div>}
            </section>
        </article>
    }
}

export default observer(Cart)

const ProductMSCloud = observer((props) => {
    const { product } = props
    return product ? <div className="card shadow border mb-4">
        <div className="card-body p-0">
            <CollapsableButton collapse={props.collapse} className="sub-title-text d-block p-3 dark-blue no-underline">{product.name}</CollapsableButton>
            <CollapsableContent collapse={props.collapse}>
                <section className="pl-3 pr-3 pb-3">
                    {product.packageOffers.map((d, i) =>
                        d.products.map((dProducts, iProducts) =>
                            dProducts.qty > 0 ? <Selection key={iProducts} data={dProducts} description={d.description} setHeight={props.collapse.setHeight} productCount={product.getProductWithQtyCount} /> : null
                        )
                    )}
                    <Addons product={product} setHeight={props.collapse.setHeight} productCount={product.getProductWithQtyCount} />
                </section>
            </CollapsableContent>
        </div>
    </div> : null
})

const Selection = observer((props) => {
    const { data, description, setHeight, productCount } = props
    return data ? <div className="card shadow border mb-4">
        <div className="card-body">
            <div className="row align-items-center mb-2">
                <div className="col"><div className="sub-title-text">{data.label}</div></div>
            </div>

            <div className="row align-items-center mb-2">
                <div className="col-sm-auto ml-2 text-center d-none d-sm-block">
                    <DeleteButton products={data} setHeight={setHeight} productCount={productCount} />
                </div>
                <div className="col-sm mb-3 mb-sm-0">
                    <div className="background-very-light-gray p-3">
                        {data.features.length > 0 ? <ul className="row list-unstyled mb-0">
                            {data.features.map((d, i) => i > 0 ? <li key={i} className="col-sm-6 mb-2">- {d.label}.</li> : null)}
                        </ul> : description}
                    </div>
                </div>
                <div className="col-md-3 col-lg-2 text-center">
                    {data.dataType === 'number' ? <QuantityComponent
                        quantity={data.qty}
                        onDecrementQuantity={data.decrementQty}
                        onChangeQuantity={data.changeQty}
                        onIncrementQuantity={data.increaseQty}
                        min={1}
                        max={50}
                    /> : null}
                    {data.dataType === 'checkbox' ? <i className="fa fa-check"></i> : null}
                </div>
            </div>
            <div className="text-center d-sm-none">
                <DeleteButton products={data} setHeight={setHeight} productCount={productCount} />
            </div>
        </div>
    </div> : null
})

const Addons = observer((props) => {
    const { addons, getAddonsWithQtyCount } = props.product
    return <React.Fragment>
        <div className="row align-items-center mb-3">
            <div className="col-sm"><div className="sub-title-text">Add-ons</div></div>
            <div className="col-sm-auto">
                <Link to={ROUTER_MS_ADDONS} className="btn btn-singtel-go-primary">Select More Addon</Link>
            </div>
        </div>
        {getAddonsWithQtyCount() > 0 ? <section>
            {addons.map((d, i) => d.qty > 0 && <div key={i} className="card border shadow mb-2">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-sm-auto ml-2 text-center d-none d-sm-block">
                            <DeleteButton products={d} setHeight={props.setHeight} productCount={props.productCount} />
                        </div>
                        <div className="col text-center text-sm-left mb-3 mb-sm-0">
                            <div className="avenirHeavy mb-2">{d.title}</div>
                            <div>
                                {d.description.split('\n').map((item, index) =>
                                    <React.Fragment key={index}>{item}<br /></React.Fragment>)
                                }
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-2 text-center">
                            {d.dataType === 'checkbox' && <i className="fa fa-check"></i>}
                            {d.dataType === 'Number' && <QuantityComponent
                                quantity={d.qty}
                                onDecrementQuantity={d.decrementQty}
                                onChangeQuantity={d.changeQty}
                                onIncrementQuantity={d.increaseQty}
                                min={1}
                                max={100}
                            />}
                        </div>
                    </div>
                    <div className="text-center d-sm-none">
                        <DeleteButton products={d} setHeight={props.setHeight} productCount={props.productCount} />
                    </div>
                </div>
            </div>)}
        </section> : <div className="text-center border-top border-bottom pt-5 pb-5 mb-3">Currently No Addon</div>}
        <div><Link to={ROUTER_MS_CONTRACT_TERMS} className="btn btn-singtel-go-primary">Select Contract Terms</Link></div>
    </React.Fragment>
})

const DeleteButton = observer((props) => {
    const { changeQty } = props.products
    const onClick = (e) => {
        e.preventDefault()
        changeQty(0)
        props.productCount() > 0 && props.setHeight()
    }
    return <button type="button" className="btn btn-icon" onClick={onClick}>
        <i className="fa fa-trash-alt" />
    </button>
})

const ProductSDLan = observer((props) => {
    const { product } = props
    return product ? <div className="card shadow border mb-4">
        <div className="card-body p-0">
            <CollapsableButton collapse={props.collapse} className="sub-title-text d-block p-3 dark-blue no-underline">{product.productName}</CollapsableButton>
            <CollapsableContent collapse={props.collapse}>
                <section className="pl-3 pr-3 pb-3">
                    {product.cart.profiles.map((d, i) =>
                        <Profile key={i} index={i} profile={d} setHeight={props.collapse.setHeight} productCount={product.cart.profiles.length} />
                    )}
                </section>
            </CollapsableContent>
        </div>
    </div> : null
})

const Profile = observer(({ index, profile, setHeight, productCount }) => {
    // const { index, name, answers, qty } = props;
    const onClickRemoveProfile = () => (e) => {
        e.preventDefault();
        profile.removeByIndex(index);
        productCount > 1 && setHeight()
    }
    return (
        <div className="card border shadow mb-4">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-lg-10 col-sm-9">
                        <div className="mb-2 row align-items-center">
                            <div className={`col-sm ${isMobileOnly ? 'text-center' : ''}`}>
                                <span className={`${isMobileOnly ? '' : 'mr-5'} sub-title-text`}>{profile.primaryName}</span>
                            </div>
                            <div className="col-sm-auto d-none d-sm-block">
                                <Link to={`${ROUTER_SD_SOLUTION}/edit/${index}`} className="avenirHeavy">Change Profile</Link>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-sm-auto ml-2 text-center mb-3 d-none d-sm-block">
                                <button
                                    type="button"
                                    className="btn btn-icon"
                                    onClick={onClickRemoveProfile()}>
                                    <i className="fa fa-trash-alt"></i>
                                </button>
                            </div>
                            <div className="col-sm mb-3 mb-sm-0">
                                <div className="card background-very-light-gray">
                                    <div className="card-body p-4">
                                        <div className="row">
                                            <div className="col-sm">
                                                <ul className="list-unstyled row mb-0">
                                                    {profile.profileCaptions.length > 0 &&
                                                        profile.profileCaptions.map((label, i) =>
                                                            <li key={`profileKey_${index}_${i}`} className="col-sm-6 mb-1">- {label}</li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-3">
                        <div className="mb-4 text-center mb-3">
                            <small>No. of sites</small>
                            <QuantityComponent
                                quantity={profile.quantity}
                                onDecrementQuantity={profile.decrementQty}
                                onChangeQuantity={profile.changeQty}
                                onIncrementQuantity={profile.increaseQty}
                                max={100}
                                min={1} />
                        </div>
                    </div>
                </div>
                <div className="row d-flex d-sm-none text-center">
                    <div className="col">
                        <Link to={`${ROUTER_SD_SOLUTION}/edit/${index}`}
                            className="btn btn-icon"><i className="fa fa-edit"></i></Link>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-icon"
                            onClick={onClickRemoveProfile()}>
                            <i className="fa fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})