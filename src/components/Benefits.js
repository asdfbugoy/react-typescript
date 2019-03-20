import React from 'react'
import PropTypes from 'prop-types'

class Benefits extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    delay = 4000

    interval = this.props.data && setInterval(() => this.processInterval(), this.delay)

    state = {
        currentIndex: 0
    }

    setCurrentIndex = (currentIndex) => {
        clearInterval(this.interval)
        this.setState({ currentIndex: currentIndex })
        this.setInterval()
    }

    setInterval() {
        this.interval = setInterval(() => this.processInterval(), this.delay)
    }

    processInterval = () => {
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex < this.props.data.length - 1 ? prevState.currentIndex + 1 : 0
        }))
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return this.props.data && this.props.data.length > 0
            ? <React.Fragment>
                <h2 className="title-text text-center mb-5">Your Benefits</h2>
                <div className="row mb-5 mb-lg-0 d-flex d-lg-none">
                    {this.props.data.map((d, i) => <div key={i} className="col"><div onClick={() => this.setCurrentIndex(i)} className={`pointer ${this.state.currentIndex === i ? 'background-red' : 'background-light-gray'}`} style={{ height: '5px' }}></div></div>)}
                </div>
                <div className="row align-items-center pl-lg-5 pr-lg-5">
                    <Images data={this.props.data} currentIndex={this.state.currentIndex} />
                    <div className="col-lg text-center text-lg-left">
                        <div className="list-carousel">
                            {this.props.data.map((d, i) => <Content key={i} data={d} index={i} currentIndex={this.state.currentIndex} setCurrentIndex={this.setCurrentIndex} />)}
                        </div>
                    </div>
                </div>
            </React.Fragment>
            : null
    }
}

export default Benefits

const Content = (props) => {
    const { data, currentIndex, setCurrentIndex, index } = props
    const onClickSetIndex = (e) => {
        e.preventDefault()
        setCurrentIndex(index)
    }
    return (
        <div
            onClick={onClickSetIndex}
            key={index}
            className={`pointer item ${index === currentIndex ? 'active' : ''}`}
        >
            <h5 className="title">{data.title}</h5>
            <div>{data.description}</div>
        </div>
    )
}

const Images = (props) => {
    const { data, currentIndex } = props
    return (
        <div className="col-lg text-center mb-5 mb-lg-0">
            {data.map((data, index) => (
                <img
                    alt={data.img}
                    key={index}
                    width="310"
                    className={`img-fluid list-carousel-img ${index === currentIndex ? 'active' : ''}`}
                    src={`img/${data.img}`}
                />
            ))}
        </div>
    )
}