import React, { FormEvent } from 'react'
import Banner from './../../components/BannerComponent'
import { ROUTER_CYBER_SECURITY_RECOMMENDATION, ROUTER_CYBER_SECURITY_BASE } from './../../stores/global'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ContentLoading } from './../../components/common/Loading'

interface ISelectionProps {
    rootStore: {
        productCyberSecurity: {
            getQuestions: Function
            questions: Array<TQuestion>
            totalSelected: number
        }
    },
    route: {
        history: {
            push: Function
        }
    }
}
type TQuestion = {
    isSelected: boolean
    label: string
    sourceList: Array<TsourceList>
    setSelected: Function
    question: string
}

type TsourceList = {
    isSelected: boolean
    label: string
}

class Selection extends React.Component<ISelectionProps> {
    static propTypes = {
        route: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func
            })
        }).isRequired,
        rootStore: PropTypes.shape({
            productCyberSecurity: PropTypes.shape({
                getQuestions: PropTypes.func,
                questions: PropTypes.arrayOf(PropTypes.shape({
                    isSelected: PropTypes.bool,
                    label: PropTypes.string,
                    sourceList: PropTypes.arrayOf(PropTypes.shape({
                        isSelected: PropTypes.bool,
                        label: PropTypes.string
                    })),
                    setSelected: PropTypes.func,
                    question: PropTypes.string
                })),
                totalSelected: PropTypes.number
            }).isRequired
        }).isRequired
    }
    state = {
        banner: {
            background: 'img/hero1.jpg',
            mobileBackground: 'img/hero1-mobile.png',
            textcolor: 'white',
            title: 'Tell Us Your Story'
        }
    }
    componentDidMount() {
        this.props.rootStore.productCyberSecurity.getQuestions()
    }

    onSave = (e: React.FormEvent) => {
        e.preventDefault()
        this.props.route.history.push(ROUTER_CYBER_SECURITY_RECOMMENDATION)
    }

    render() {
        const product = this.props.rootStore.productCyberSecurity
        const { questions } = product
        return <React.Fragment>
            <article className="solution-builder main line-height-35 background-very-light-gray pb-5">
                <Banner {...this.state.banner} />
                <div className="container">
                    {questions.length
                        ? <section className="card shadow">
                            <div className="card-body p-sm-5">
                                <h2 className="title-text-inside mb-5 text-center">Let's create your profile</h2>
                                <div className="text-right"><Link to={ROUTER_CYBER_SECURITY_BASE} className="avenirHeavy">Back to Cyber Security</Link></div>
                                {questions.map((d, i) => <Question key={i} data={d} />)}
                                <div className="text-center mt-5">
                                    <button onClick={this.onSave} disabled={product.totalSelected === questions.length ? false : true} className="btn btn-singtel-go-primary">Save</button>
                                </div>
                            </div>
                        </section>
                        : <ContentLoading />}
                </div>
            </article>
        </React.Fragment >
    }
}

export default observer(Selection)

const Question = observer((props) => {
    const { data }: { data: TQuestion } = props
    const onClick = (i: number) => (e: FormEvent) => {
        e.preventDefault()
        data.setSelected(i)
    }

    return <React.Fragment>
        <div className="mb-3 mt-3 special-text">{data.question}</div>
        <div className="row">
            {data.sourceList.map((d, i) => <div key={i} className="col-md-4 col-lg-3 mb-3">
                <a href="" onClick={onClick(i)} className={`card border ${d.isSelected ? 'active' : ''}`} data-toggle="tooltip" data-placement="top" title="No transactions carried out, simple informative web page">
                    <div className="position-absolute ml-2 mt-2"><i className="fas fa-check-circle"></i></div>
                    <div className="card-body">
                        <div className="pt-4 pb-4 text-center">{d.label}</div>
                    </div>
                </a>
            </div>)}
        </div>
    </React.Fragment>
})