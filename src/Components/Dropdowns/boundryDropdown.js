import React, {Component} from 'react';
import {Select} from 'grommet';


class BoundaryDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {value: [], options: this.props.OPTIONS}
    }


    render() {
        const { options, value } = this.state;
        return (
                <Select
                    multiple={false}
                    value={value}
                    onChange={event => {
                        this.setState({
                            value: event.value,
                            options: this.props.OPTIONS,
                        })
                        this.props.changeBoundary(event.value)
                    }
                    }
                    options={options}
                />
        );
    }
}
export default BoundaryDropdown;