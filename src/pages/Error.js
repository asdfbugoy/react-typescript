import React from 'react';
import { ROUTER_HOME } from '../stores/global';
import { Link } from "react-router-dom";

class Error extends React.Component {
    componentDidMount(){
        window.scrollTo(0,0)
    }

    render() {
        return (
            <article className="main background-very-light-gray pb-5">
                <section className="hero-error d-flex align-items-center pb-0" style={{backgroundImage:'url()', height:'100%'}}>
                    <div className="container text-center mt-4 mb-5">
                        <h2 className="leading-text m-4">Something's wrong here!</h2>
                        <h3 className="m-4">:( We can't find the page you are looking for.</h3>
                        <h4 className="avenirHeavy m-4"><Link to={ROUTER_HOME}>Go Back Home</Link></h4>
                    </div>
                </section>
            </article>
        );
    }
}

export default Error;