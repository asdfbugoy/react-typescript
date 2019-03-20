import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row copyright align-items-center">
                        <div className="avenirHeavy text-uppercase col-sm text-center text-sm-left">
                            <a className="d-block d-sm-inline mr-3 mb-3 mb-sm-0" href="https://www.singtel.com/data-protection">Data Protection</a>
                            <a className="d-block d-sm-inline mr-3 mb-3 mb-sm-0" href="https://www.singtel.com/standard-agreement">Terms of Use</a>
                            <a className="d-block d-sm-inline mr-3 mb-3 mb-sm-0" href="http://info.singtel.com/faq-contact-us">Contact Us</a>
                        </div>
                        <div className="col-sm-auto font-size-14 text-lg-right text-center">© Singtel (CRN: 199201624D) All Rights Reserved.</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
