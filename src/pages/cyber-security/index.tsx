import React from 'react'
import { Link } from 'react-router-dom'
import Benefits from 'components/Benefits'
import { ROUTER_CYBER_SECURITY_SELECTION } from 'stores/global'
import PropTypes from 'prop-types'

const CyberSecurity  = () => {
    const benefits = [
        {
            img: 'mscloud-list-carousel0.png',
            title: 'Security in the cloud, for the cloud.',
            description: 'New cloud security services to protect cloud-based apps and workload Cloud Security including popular services such as Office 365, Salesforce and major file sharing platforms.'
        },
        {
            img: 'mscloud-list-carousel1.png',
            title: 'Data Centre Security Services',
            description: 'Comprehensive suite of security features are carefully designed and embedded into Singtel’s Data Centres to provide secure, fast and reliable services.'
        },
        {
            img: 'mscloud-list-carousel2.png',
            title: 'Network Defence with Global Products',
            description: 'Business Security Suite protects Small Medium Enterprise customers from malicious and undesirable contents, by eliminating threats in the cloud before it reaches the users.'
        }
    ]
    return <React.Fragment>
        <div className="index main">
            <section className="text-center pt-5 pb-5">
                <div className="container">
                    <h1 className="leading-text mb-3">Cyber Security</h1>
                    <p className="col-lg-10 ml-auto mr-auto">A key requirement is creating an environment where every employee is empowered to prevent and detect attacks and understands how to respond to security incidents and serve your customers in a secure and compliant manner. And in today’s media-rich and fast-paced environment, it’s imperative to offer employees engaging and easily absorbable training content.
                </p>
                    <div className="mt-3 mb-3">
                        <Link className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0" to={ROUTER_CYBER_SECURITY_SELECTION}>See Plans</Link>
                        <button className="btn btn-singtel-go-primary-inverted">
                            <i className="far fa-file-pdf mr-2 special-text"></i>
                            <span>Singtel Cyber Security Fact Sheet</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="bg-img mb-4" style={{ backgroundImage: 'url(img/mscloud-banner.jpg)', backgroundSize: '100%' }}>
                <div className="container">
                    <h2 className="title-text white text-center pt-sm-5 pt-3 pb-5 text-shadow-black">How It Works</h2>
                    <div className="card shadow mb-5">
                        <div className="card-body pt-5 pb-5">
                            <div className="row">
                                <div className="col-sm text-center">
                                    <div className="number-icon-center mb-4">1</div>
                                    <div className="special-text text-center mt-4 mb-4 mb-sm-0">Build your Cyber Security needs profile through our configurator.</div>
                                </div>
                                <div className="col-sm border-left-sm border-0 text-center">
                                    <div className="number-icon-center mb-4">2</div>
                                    <div className="special-text text-center mt-4 mb-4 mb-sm-0">Configure the proposed solution to meet your Cyber Security requirements.</div>
                                </div>
                                <div className="col-sm border-left-sm border-0 text-center">
                                    <div className="number-icon-center mb-4">3</div>
                                    <div className="special-text text-center mt-4 mb-4 mb-sm-0">Detect, monitor and respond to Cyber Security threats in real-time.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 ml-auto mr-auto text-center">
                        <div className="videoWrapper">
                            <iframe title="video" width="560" height="315" src="https://www.youtube-nocookie.com/embed/5Z8ouJjPHTk"
                                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="special-text">Introduction Video for Cyber Security</div>
                    </div>
                </div>
            </section>
            <section className="bg-img p-sm-5 p-2" style={{ backgroundImage: 'url(img/feature-background.jpg)', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                <div className="container">
                    <h2 className="title-text text-center mt-5 mb-5">Service Offerings</h2>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="card shadow mb-5">
                                <div className="card-body pt-4 pb-4">
                                    <h4 className="museo mb-3">User Protection</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="card shadow mb-5">
                                <div className="card-body pt-4 pb-4">
                                    <h4 className="museo mb-3">Network Protection</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="card shadow mb-5">
                                <div className="card-body pt-4 pb-4">
                                    <h4 className="museo mb-3">Content Protection</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Benefits data={benefits} />
                </div>
            </section>
            <div className="d-none d-lg-block">
                <section className="pt-5 pb-5" style={{ backgroundImage: 'url(img/index-background3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
                    <div className="container">
                        <h2 className="title-text text-left">Recommended for organisations who:</h2>
                        <div className="row">
                            <div className="col-lg-6">
                                <p className="mb-3">
                                    - Businesses that wants their employees be empowered to prevent and detect attacks and understands how to respond to security incidents and serve their customers in a secure and compliant manner.
                                </p>
                                <p className="mb-3">
                                    - Businesses who wants to safeguard their data and bolster the confidence of their stakeholders.
                                </p>
                                <p className="mb-3">
                                    - Businesses who wants to step up their web security to protect their reputation, secure data and ensure smooth operations.
                                </p>
                            </div>
                            <div className="col-lg-6">

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="d-none d-md-block d-lg-none">
                <section className="bg-img p-sm-5 p-2 text-shadow-white" style={{ backgroundImage: 'url(img/index-background3-tablet.jpg)' }}>
                    <div className="container">
                        <h2 className="title-text text-left">Recommended for organisations who:</h2>
                        <div className="row">
                            <div className="col-md-8">
                                <h5 className="museo title pt-2">- Optimised for your business</h5>
                                <p className="mb-3">
                                    Carefully designed based on our in-depth experience of network solutioning.
                            </p>
                                <h5 className="museo title pt-2">- Hassle-free</h5>
                                <p className="mb-3">
                                    Enjoy hassle-free service with round the clock support. This leaves you with more time to focus on things that drives your business.
                            </p>
                                <h5 className="museo title pt-2">- Take charge of your budget</h5>
                                <p className="mb-3">
                                    Have more control of your spending expenditure. Say no to unexpected capital expenses that impede your business plans.
                            </p>
                                <h5 className="museo title pt-2">- Fast and effective engagements</h5>
                                <p className="mb-3">
                                    Save time and effort without the need for multiple engagmements. Make a quick and informed decision with pricing stated upfront.
                            </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="d-md-none d-sm-block">
                <section className="benefits-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2 className="title-text text-left mt-4">Recommended for organisations who:</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-7">
                                <h5 className="museo title pt-2">- Optimised for your business</h5>
                                <p className="mb-3">Carefully designed based on our in-depth experience of network solutioning.</p>
                                <h5 className="museo title pt-2">- Hassle-free</h5>
                                <p className="mb-3">Enjoy hassle-free service with round the clock support. This leaves you with more time to focus on things that drives your business.</p>
                                <h5 className="museo title pt-2">- Take charge of your budget</h5>
                                <p className="mb-3">Have more control of your spending expenditure. Say no to unexpected capital expenses that impede your business plans.</p>
                                <h5 className="museo title pt-2">- Fast and effective engagements</h5>
                                <p className="mb-5">Save time and effort without the need for multiple engagmements. Make a quick and informed decision with pricing stated upfront.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </React.Fragment>
}

CyberSecurity.propTypes = {
    route: PropTypes.object.isRequired,
    rootStore: PropTypes.shape({
        productCyberSecurity: PropTypes.object.isRequired
    }).isRequired
}

export default CyberSecurity

