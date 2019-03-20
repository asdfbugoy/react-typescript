import React from 'react'
import { observer } from "mobx-react"
import Select from 'react-select'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Search = ({ quoteStore, fetchQuote }) => {
    const onClickReset = () => (e) => {
        quoteStore.resetParams()
    }
    const onClickSearch = () => (e) => {
        fetchQuote(false)
    }
    const onKeyDownSearch = () => (e) => {
        if (e.keyCode === 13 && quoteStore.params.query && quoteStore.params.query.trim()) {
            e.preventDefault();
            fetchQuote(false);
            return false;
        }
    }
    const onChange = () => (e) => {
        quoteStore.onChange({
            name: e.target.name,
            value: e.target.value
        })
    }
    const onChangeSelect = (name) => (value) => {
        quoteStore.onChangeSelect({
            name: name,
            value: value
        })
    }
    const onChangeDate = (name) => (date) => {
        quoteStore.onChangeDate({
            name: name,
            value: date
        })
    }
    const onChangeRawDate = () => (e) => {
        e.preventDefault()
    }
    const onKeyDown = (name) => (e) => {
        if (e.keyCode === 8 || e.keyCode === 46) {
            quoteStore.onChangeDate({
                name: name,
                value: null
            })
        }
    }
    return (
        <section className="pb-4">
            <div className="card shadow">
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-prepend">
                            <span className="input-group-text background-transparent"><i className={`icons qdl-icon-search ${quoteStore.isLoading ? 'fas fa-spinner fa-spin' : 'fa fa-search'}`}></i></span>
                        </span>
                        <input
                            onChange={onChange()}
                            onKeyDown={onKeyDownSearch()}
                            className="form-control"
                            type="search"
                            name="query"
                            value={quoteStore.params.query}
                            placeholder="Search: ex. Singtel Shop" />
                    </div>
                    <div className="row mb-5">
                        <div className="col-md mb-2 mb-sm-0">
                            <label htmlFor=""><b>Select Period:</b></label>
                            <div className="row">
                                <div className="col-md">
                                    <div className="position-relative date-picker">
                                        <i className="far fa-calendar-alt red position-absolute calendar-icon"></i>
                                        <DatePicker
                                            className="form-control"
                                            dateFormat="D MMM Y"
                                            selected={quoteStore.formattedFrom}
                                            onChange={onChangeDate('from')}
                                            onChangeRaw={onChangeRawDate()}
                                            onKeyDown={onKeyDown('from')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-auto text-center pt-2 pb-2 pl-0 pr-0"><b>To</b></div>
                                <div className="col-md">
                                    <div className="position-relative date-picker">
                                        <i className="far fa-calendar-alt red position-absolute calendar-icon"></i>
                                        <DatePicker
                                            className="form-control"
                                            dateFormat="D MMM Y"
                                            selected={quoteStore.formattedTo}
                                            onChange={onChangeDate('to')}
                                            onChangeRaw={onChangeRawDate()}
                                            onKeyDown={onKeyDown('to')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <label htmlFor=""><b>AM Name:</b></label>
                            <Select
                                isClearable
                                isSearchable={false}
                                options={quoteStore.getAms()}
                                placeholder="Select Account Manager"
                                value={quoteStore.getAm}
                                onChange={onChangeSelect('am')}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-singtel-go-primary mr-1"
                            onClick={onClickSearch()}>Search {quoteStore.isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
                        <button
                            type="button"
                            className="btn btn-singtel-go-primary-black"
                            onClick={onClickReset()}>Reset</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default observer(Search)