import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

 class SiteProfileComponent extends React.PureComponent {
    render() {
        const { siteProfileTitle, siteDetailsList } = this.props;
        return (
                <div  className="card border shadow mb-4">
                    <div  className="card-body">
                        <div  className="row align-items-center">
                            <div  className="col-lg-10 col-sm-9">
                                <div  className="mb-2 row align-items-center">
                                    <div  className="col-sm">
                                        <span  className="mr-5 sub-title-text">{siteProfileTitle}</span>
                                    </div>
                                    <div  className="col-sm-auto d-none d-sm-block">
                                        <Link to="/SolutionBuilder"  className="avenirHeavy">Change Profile</Link>
                                    </div>
                                </div>
                                <div  className="row align-items-center">
                                    <div  className="col-sm-auto ml-2 text-center mb-3 d-none d-sm-block">
                                        <a href="#"  className="btn-custom1 rounded-circle special-text">
                                            <i  className="fa fa-trash-alt"></i></a>
                                    </div>
                                    <div className="col-sm mb-3 mb-sm-0">
                                        <div  className="card background-very-light-gray">
                                            <div  className="card-body p-4">
                                                <div  className="row">
                                                    <div  className="col-sm">
                                                        <ul  className="list-unstyled mb-0 row">
                                                            { siteDetailsList.map( detail =>  <li className="mb-1 col-sm-6">{detail}</li> )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  className="col-lg-2 col-sm-3">
                                <p>no of sites component here</p>
                            </div>
                        </div>
                        <div  className="row d-flex d-sm-none">
                            <div  className="col"><a href="javascript:void(0)"  className="btn-custom1 rounded-circle special-text text-center m-auto"><i  className="fa fa-edit"></i></a></div>
                            <div  className="col"><a href="javascript:void(0)"  className="btn-custom1 rounded-circle special-text text-center m-auto"><i  className="fa fa-trash-alt"></i></a></div>
                        </div>
                    </div>
                </div>
         )
    };
}

export default SiteProfileComponent;

SiteProfileComponent.propTypes = {
    siteProfileTitle: PropTypes.string.isRequired,
    siteDetailsList: PropTypes.string
}