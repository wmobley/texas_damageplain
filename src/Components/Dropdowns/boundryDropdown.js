import React, { Component } from 'react';
import { Select } from 'grommet';


const OPTIONS = ['Huc-8', 'Huc-12']
class BoundaryDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = { value: [], options: OPTIONS }
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
                            options: OPTIONS,
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