import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ROUTER_SD_BASE } from '../stores/global';
//import Hero from '../components/Hero';

//import { Link } from "react-router-dom";
import BannerComponent from '../components/BannerComponent';

class CustomerQuiz extends Component {
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.props.configurator.onChangeStory( e.target.value );
    }
    onSubmit(e){
        e.preventDefault();
        this.props.configurator.addStory();
        this.props.history.push(`${ROUTER_SD_BASE}/SolutionBuilder`)
    }
    render() {
        const { configurator } = this.props;
        return (
            <React.Fragment>
                 <article className="main background-very-light-gray pb-5">
                    <BannerComponent background='img/hero1.jpg' title='Tell Us Your Story' textcolor='white'/>
                    <div className="container">
                        <article className="">
                            <section className="card shadow">
                                <form onSubmit={ this.onSubmit } className="card-body p-sm-5">
                                    <div className="clearfix">
                                        <h2 className="title-text-inside text-center mb-4">Who is my customer?</h2>
                                    </div>
                                    <div className="pl-sm-5 pr-sm-5 mb-4">
                                        <textarea 
                                            className="form-control" 
                                            id="exampleTextarea" rows="10" 
                                            placeholder="Describe a short summary of your customer, ie: nature of their business."
                                            defaultValue={configurator.story}
                                            onChange={ this.onChange } />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0">Next</button>
                                        {/* <Link to={`${ROUTER_SD_BASE}/SolutionBuilder`} className="btn btn-singtel-go-primary mr-2 mb-2 mb-sm-0">Next</Link> */}
                                    </div>
                                </form>
                            </section>
                        </article>
                    </div>
                </article>
            </React.Fragment>
        );
    }
}

export default observer(CustomerQuiz);
