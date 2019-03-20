import React from 'react'

class SliderContainer extends React.Component {
    state = {
        value: 0
    }
    onChange = () => (v) => {
        this.setState(({ value: v }))
    }
    render() {
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                slider: {
                    value: this.state.value,
                    onChange: this.onChange()
                }
            });
        });
        return children
    }
}
export default SliderContainer