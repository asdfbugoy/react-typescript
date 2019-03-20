import React from 'react'
import Banner from 'components/BannerComponent'
import ProgressStep from 'components/ProgressStep'
import { QuantityComponent } from 'components/QuantityComponent'
import { ROUTER_CYBER_SECURITY_RECOMMENDATION, ROUTER_CYBER_SECURITY_CONTRACT } from '../../stores/global'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { ContentLoading } from 'components/common/Loading'

interface IOverviewProps {
    rootStore: {
        productCyberSecurity: {
            recommendations: Array<Trecommendation>
        }
    }
}

type Trecommendation = {
    products: Array<Tproduct>
    items: Array<Titems>
}

type Titems = {}

type Tproduct = {
    title: string
    dataType: string
}

class Overview extends React.Component<IOverviewProps> {
    state = {
        banner: {
            background: 'img/hero4.jpg',
            mobileBackground: 'img/hero4-mobile.jpg',
            textcolor: '',
            title: 'Overview'
        }
    }
    componentDidMount() {

    }
    render() {
        const { recommendations } = this.props.rootStore.productCyberSecurity
        return <React.Fragment>
            <article className="main background-very-light-gray pb-5">
                <Banner {...this.state.banner} />
                <div className="container">
                    <ProgressStep />
                    {recommendations.length > 0
                        ? <section>
                            <Card data={recommendations} />
                        </section>
                        : <ContentLoading />}
                    <div className="row align-items-center text-center text-sm-left">
                        <div className="col-sm-auto">
                            <Link to={ROUTER_CYBER_SECURITY_CONTRACT} className="btn btn-singtel-go-primary">Next</Link>
                        </div>
                        <div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0"><span>or</span></div>
                        <div className="col-sm-auto">
                            <Link to={ROUTER_CYBER_SECURITY_RECOMMENDATION} className="btn btn-link">Back</Link>
                        </div>
                    </div>
                </div>
            </article>
        </React.Fragment>
    }
}

export default observer(Overview)

const Card = observer((props) => {
    const { data }: {data: Array<Trecommendation>} = props
    return <React.Fragment>
        {data.map((d, i) =>
            d.products.map((dProduct, iProduct) =>
                <article key={iProduct} className={`card border shadow mb-4`}>
                    <section className="card-body p-3">
                        <div className="row mb-2">
                            <div className="col"><div className="sub-title-text">{dProduct.title}</div></div>
                            <div className="col-auto"><button className="btn btn-link p-0">EDIT</button></div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-1 col-sm-auto text-center d-none d-sm-block pr-0"><button className="btn btn-icon"><i className="fa fa-trash-alt"></i></button></div>
                            <div className="col-sm">
                                {false && d.items.length > 1
                                    ? <div className="background-very-light-gray pt-3 mb-3 mb-sm-0">

                                        <ul className="row m-0 red">
                                            {d.items.map((dItems, iItems) => <li key={iItems} className="col-sm-6 pr-0 mb-3 pl-0"><div className="pr-3 mr-3 dark-blue">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, aut.</div></li>)}
                                        </ul>
                                    </div>
                                    : <div className="background-very-light-gray p-3 mb-3 mb-sm-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, commodi?</div>}
                            </div>
                            {dProduct.dataType && <div className="col-sm-2 text-center pl-sm-0">
                                {dProduct.dataType === 'number' && <QuantityComponent />}
                                {dProduct.dataType === 'checkbox' && <i className="fa fa-check"></i>}
                            </div>}
                        </div>
                        <div className="row mt-3 text-center d-flex d-sm-none">
                            <div className="col"><button className="btn btn-icon"><i className="fa fa-pencil-alt"></i></button></div>
                            <div className="col"><button className="btn btn-icon"><i className="fa fa-trash-alt"></i></button></div>
                        </div>
                    </section>
                </article>
            )
        )}
    </React.Fragment>
})