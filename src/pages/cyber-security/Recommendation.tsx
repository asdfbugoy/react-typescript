import React from 'react'
import Banner from 'components/BannerComponent'
import ProgressStep from 'components/ProgressStep'
import { QuantityComponent } from 'components/QuantityComponent'
import { Link } from 'react-router-dom'
import { ROUTER_CYBER_SECURITY_SELECTION, ROUTER_CYBER_SECURITY_OVERVIEW } from 'stores/global'
import { Collapsable, CollapsableContent } from 'components/Collapsable'
import { observer } from 'mobx-react'
import { ContentLoading } from 'components/common/Loading'

interface IRecommendationProps {
    rootStore: {
        productCyberSecurity: {
            getRecommendations: Function,
            recommendations: Array<Trecommendation>
        }
    }
}

type Trecommendation = {
    productType: string
    products: Array<Tproduct>
}

type Tproduct = {
    isSelected: boolean
    title: string
    description: string
    toggleSelected: Function
    questions: Array<Tquestion>
}

type Tquestion = {
    question: string
    dataType: string
    sourceList: Array<TsourceList>
}

type TsourceList = {
    isSelected: boolean
    label: string
    value: string
}

class Recommendation extends React.Component<IRecommendationProps> {
    state = {
        banner: {
            background: 'img/hero1.jpg',
            mobileBackground: 'img/hero1-mobile.png',
            textcolor: 'white',
            title: 'Tell Us Your Story'
        }
    }
    componentDidMount() {
        this.props.rootStore.productCyberSecurity.getRecommendations()
    }
    render() {
        const { recommendations } = this.props.rootStore.productCyberSecurity
        return <React.Fragment>
            <article className="main background-very-light-gray pb-5">
                <Banner {...this.state.banner} />
                <div className="container">
                    <ProgressStep />
                    <h2 className="title-text text-center mb-5">Choose Your Products</h2>
                    {recommendations.length > 0 ? <Options data={recommendations} /> : <ContentLoading />}
                    <div className="row align-items-center text-center text-sm-left">
                        <div className="col-sm-auto">
                            <Link to={ROUTER_CYBER_SECURITY_OVERVIEW} className="btn btn-singtel-go-primary">Next</Link>
                        </div>
                        <div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0"><span>or</span></div>
                        <div className="col-sm-auto">
                            <Link to={ROUTER_CYBER_SECURITY_SELECTION} className="btn btn-link">Back</Link>
                        </div>
                    </div>
                </div>
            </article>
        </React.Fragment>
    }
}

export default observer(Recommendation)

type TCheckBoxProps = {
    data: Tproduct
}

const CheckBox = (props: TCheckBoxProps) => {
    const { data } = props
    const onClick = (e: React.FormEvent) => {
        e.preventDefault()
        data.toggleSelected()
    }
    return <div className="row">
        <div className="col">
            <h5 className="museo">{data.title}</h5>
            <div>{data.description}</div>
        </div>
        <div className="col-auto"><i className={`far pointer font-size-24 ${data.isSelected ? 'fa-check-square red' : 'fa-square gray'}`} onClick={onClick}></i></div>
    </div>
}

const Options = observer((props) => {

    const { data }: {data: Array<Trecommendation>} = props
    const onClick = (props: any) => (e: React.FormEvent) => {
        e.preventDefault()
        console.log(props)
        props.toggleSelected()
    }
    
    return <React.Fragment>
        {data.map((d, i) => <React.Fragment key={i}>
            <h4 className="sub-title-text mt-3 mb-3">{d.productType}</h4>
            <section className="">
                {d.products.map((dProduct, iProduct) => <div key={iProduct} className="card shadow border mb-3">
                    <div className="card-body">
                        <Collapsable isOpen={dProduct.isSelected}>
                            <CheckBox data={dProduct} />
                            <CollapsableContent>
                                {dProduct.questions.length > 0 && <div className="p-1"><hr /></div>}
                                {dProduct.questions.map((dQuestion, iQuestion) => <div key={iQuestion} className="mb-3">
                                    <p>{dQuestion.question}</p>
                                    {dQuestion.dataType === 'dropdown' && <div className="row">
                                        {dQuestion.sourceList.map((dAns, iAns) => <div key={iAns} className="col-sm mb-3 mb-sm-0">
                                            <a href="" className={`card border ${dAns.isSelected ? 'active' : ''}`} onClick={onClick(dAns)}>
                                                <div className="position-absolute ml-2 mt-2"><i className="fas fa-check-circle"></i></div>
                                                <div className="card-body">
                                                    <div className="pt-4 pb-4 text-center">{dAns.label}</div>
                                                </div>
                                            </a>
                                        </div>)}
                                    </div>}
                                    {dQuestion.dataType === 'combobox' && <div className="row">
                                        <div className="col-sm-3">
                                            <select className="form-control">
                                                {dQuestion.sourceList.map((dAns, iAns) => <option value={dAns.value} key={iAns}>{dAns.label}</option>)}
                                            </select>
                                        </div>
                                    </div>}
                                </div>)}
                            </CollapsableContent>
                        </Collapsable>
                    </div>
                </div>)}
            </section>
        </React.Fragment>)}
    </React.Fragment>
})