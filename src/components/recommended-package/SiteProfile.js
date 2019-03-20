import React from 'react'
import { isMobileOnly } from 'react-device-detect'
import BOM from './Bom'

class SiteProfile extends React.Component {
    state = {
        bom: [],
        isOpenBom: false,
        isFetchingBom: false
    };
    componentDidMount(){
        window.scrollTo(0,0)
    }
    onOpenBom = () => (e) => {
        e.preventDefault()
        if(!this.state.isFetchingBom) {
            this.setState(({isFetchingBom: true}))
            this.props.profile.getBom()
                .then((data) => {
                    this.setState(({
                        bom: data,
                        isOpenBom: true,
                        isFetchingBom: false
                    }))
            });
            this.addBodyClass()
        }
    }
    onCloseBom = () => (e) => {
        e.preventDefault()
        this.removeBodyClass()
        this.setState(({isOpenBom: false}))
    }
    addBodyClass() {
        const el = document.querySelector('body')
        const toggleClass = 'modal-open'
        if (el.classList)
            el.classList.add(toggleClass)
        else
            el.className += ' ' + toggleClass
    }
    removeBodyClass() {
        const el = document.querySelector('body')
        const toggleClass = 'modal-open'
        if (el.classList)
            el.classList.remove(toggleClass);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + toggleClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
    render() {
        const { name, components } = this.props.profile
        const profileTitle = `${name} Profile # ${this.props.index + 1}`
        return (
            <section className="mb-5">
                <div className="card shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-9">
                                <h2 className={`sub-title-text ${isMobileOnly ? 'text-center' : ''} mb-3`}>{profileTitle}</h2>
                            </div>
                            <div className="col-sm-3 text-sm-right text-center mb-3">
                                <a className="avenirHeavy" onClick={this.onOpenBom()} href="javascript:void(0)">
                                    <i className={`fas mr-2 ${!this.state.isFetchingBom ? 'fas fa-download mr-2': 'fas fa-spinner fa-spin'}`}></i>
                                    See BOM List
                                </a>
                            </div>
                        </div>
                        <Packages data={components} />
                    </div>
                </div>
                {this.state.isOpenBom && <BOM bom={this.state.bom} title={profileTitle} onCloseBom={this.onCloseBom} />}
            </section>
        )
    }
}
export default SiteProfile

const Packages = (props) => {
    const { data } = props;
    return (
        <ul className="custom-list special-text mb-0 pl-3">
            { data.map( (data, index) => <li key={index}><span>{data}</span></li> ) }
        </ul>
    )
}