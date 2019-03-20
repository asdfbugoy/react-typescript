import React from 'react';
import { ROUTER_SD_BASE, ROUTER_SD_SOLUTION, ROUTER_HOME } from '../stores/global';
import { Link } from "react-router-dom";

class ThankYou extends React.Component {
    componentDidMount(){
        window.scrollTo(0,0)
    }

    render() {
        return (
            <article className="main background-very-light-gray pb-5 pt-5">
				<div className="container">
					<div className="card shadow text-center">
						<div className="card-body p-sm-5 p-3">
							<h2 className="title-text mb-4">Thank you for your interest</h2>

							<div className="special-text">We had received your inquiry and our team will contact you shortly for the quotation detail.</div>
							<div className="mb-4 special-text">We also sent you a confirmation email with access to track this pre-quotation process.</div>
			
							{/* <Link 
								to={ROUTER_SD_SOLUTION}
								className="btn btn-singtel-go-primary">Build New Profile</Link> */}
							<Link 
								to={ROUTER_HOME}
								className="btn btn-link">Go to Homepage</Link>
						</div>
					</div>
				</div>
			</article>
        );
    }
}

export default ThankYou;