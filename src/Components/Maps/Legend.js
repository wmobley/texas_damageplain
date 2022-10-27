// noinspection HtmlUnknownTarget

import "./esri-leaflet-geocoder.css";
import {Box, Footer} from "grommet";
import React, {Component} from "react";

class Legend extends Component {
    constructor(props) {
      super(props)
    this.state={
        }
    }

    componentWillUnmount() {

    }

    componentDidMount() {
        // get color depending on population density value
        let legend = document.getElementById("Legend").children;
        for (let i = 0; i < legend.length; i++) {
            if (i===this.props.parentState.IncreaseElement){
                legend[i].classList.add("LegendIncrease")
            }
            else{
                legend[i].classList.add("LegendDecrease")
            }
        }
    }

    render(){
        const items = []
        for (const [index, value] of this.props.parentState.layer[0].legend.entries()) {
            items.push(
                <Box align={"center"} key={index} fill={"vertical"} pad={"small"} width={"small"}
                     background={{"color": value.color}}/>
            )
        }
        return (
        <Footer margin={'medium'} background="secondary" >
            <Box  direction="row" >
                <Box id={"status"}></Box>
                <Box fill={"vertical"} pad={"xsmall"} width={"medium"} />
                <Box id="Legend" direction="row" >
                    {items}
                </Box>
            </Box>
        </Footer>
        )}
}
export default Legend;
