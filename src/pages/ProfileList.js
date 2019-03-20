import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Banner from '../components/BannerComponent';
import { QuantityComponent } from '../components/QuantityComponent';
import { ROUTER_SD_BASE, ROUTER_SD_SOLUTION, ROUTER_SD_PACKAGES } from '../stores/global';
import { isMobile, isTablet, BrowserView, MobileView, isMobileOnly } from 'react-device-detect';

class Profiles extends React.Component{
    state = {
        isFetching: false
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render(){
        const { productStore, history, ready } = this.props;
        const bannerProps = {
            background: 'img/hero4.jpg',
            mobileBackground: 'img/hero4-mobile.jpg',
            title: 'My Site Profiles',
            textcolor: 'black'
        }
    
        const onClickRecommendedSolution = () => (e) => {
            e.preventDefault();
            this.setState( { isFetching: true });
            productStore.getPackages()
                .then( () => {
                    this.setState({ isFetching: false });
                    history.push( ROUTER_SD_PACKAGES );
                })
                .catch( error => {
                    this.setState({ isFetching: false });
                });
        }
    
        return (
            <div className="background-very-light-gray pb-1">
                <Banner {...bannerProps} />
                <section className="container">
    
                    {productStore.cart.profiles.length > 0 && 
                        productStore.cart.profiles.map((profile, index) => <Profile key={index} index={index} profile={profile} />)}
    
                    { productStore.totalProductCart < productStore.cart.maxItems && <div className="card border shadow mb-4">
                        <div className="card-body text-center text-sm-left">
                            <div className={`${isMobileOnly ? '':'mr-5'} sub-title-text dark-gray mb-2`}>Site Profile # { productStore.totalProductCart + 1 }</div>
                            <Link to={ROUTER_SD_SOLUTION} className="btn btn-singtel-go-primary-inverted">Create New Site Profile</Link>
                        </div>
                    </div>}
    
                    <div className="card border shadow mb-4">
                        <div className="card-body text-center text-sm-left">
                            <div className="row align-items-center">
                                { productStore.totalProductCart > 0 && <div className="col-sm-auto mb-2 mb-sm-0">
                                    <button type="button"
                                        className="btn btn-singtel-go-primary"
                                        disabled={ productStore.totalProductCart === 0 }
                                        onClick={ onClickRecommendedSolution() }
                                    >
                                        { this.state.isFetching ? 
                                            <span><i className="fas fa-spinner fa-pulse fa-lg" /> Looking Packages</span> : 
                                            'Recommended Solutions' }
                                   </button>
                                </div>
                                }
                                <div className="col-sm"><span>You can add up to 5 different site profiles </span></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default observer(Profiles);

const Profile = observer( ({index, profile}) => {
    // const { index, name, answers, qty } = props;
    const onClickRemoveProfile = () => (e) => {
        e.preventDefault();
        profile.removeByIndex(index);
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
                                    onClick={ onClickRemoveProfile() }>
                                    <i className="fa fa-trash-alt"></i>
                                </button>
                            </div>
                            <div className="col-sm mb-3 mb-sm-0">
                            <div className="card background-very-light-gray">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-sm">
                                            <ul className="list-unstyled row mb-0">
                                                { profile.profileCaptions.length > 0 && 
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
                                quantity={ profile.quantity }
                                onDecrementQuantity={ profile.decrementQty }
                                onChangeQuantity={ profile.changeQty }
                                onIncrementQuantity={ profile.increaseQty }
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
                            onClick={ onClickRemoveProfile() }>
                            <i className="fa fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})