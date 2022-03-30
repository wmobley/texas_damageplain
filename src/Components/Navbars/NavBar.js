import {Box, Button, Collapsible, Layer, Text} from "grommet";
import {FormClose} from "grommet-icons";
import React, {Component} from "react";

// import withRouter from "react-router/modules/withRouter";
class NavBar extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Box  direction="row-responsive" >

                {(!this.props.showSidebar || this.props.size !== 'small') ? (

                    <Collapsible direction="horizontal" open={this.props.showSidebar}>
                        {/*<Box flex fill>*/}
                        <Box
                            id="hazard" overflow="scroll"
                            fill={'vertical'}
                            width={this.props.width}

                            border={true}
                            background="snow"
                            pad="small"
                            elevation="small"
                        >
                            <Text size="xlarge">
                                {this.props.children}
                            </Text>
                        </Box>
                        {/*</Box>*/}
                    </Collapsible>

                ) : (
                    <Layer>

                        <Box
                            background='snow'
                            tag='header'
                            width={this.props.width}
                            height={"large"}
                            border={true}
                            justify='end'
                            align='center'
                            direction='row'
                            id="hazard"
                            overflow="scroll"
                        >
                            <Button
                                icon={<FormClose/>}
                                onClick={() => this.props.action()}
                            />
                        </Box>
                        <Box
                            fill
                            background='light-2'
                            align='center'
                            justify='center'
                        >
                            sidebar
                        </Box>
                    </Layer>
                )}

            </Box>
        )
    }
}


export default NavBar