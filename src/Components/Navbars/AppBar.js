import {Box} from "grommet";
import React from "react";

const AppBar = (props) => (


    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation='medium'
        style={{zIndex: '1'}}
        {...props}
    />
);
export default AppBar;