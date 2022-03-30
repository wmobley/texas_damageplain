import {Box, Card, CardBody, CardHeader} from "grommet";
import {Expand} from "grommet-icons";
import React, {cloneElement, Component} from "react";


class CardTemplate extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.child=React.createRef()
        this.expandWindow = this.expandWindow.bind(this)
        this.state = {
            Expanded: false,
            width : this.props.width,
            height : this.props.height,
            childwidth:"98%",
            childheight:"98%"
        };



    };



    expandWindow() {
           if (!this.state.Expanded) {

               this.setState ({
                       Expanded: !this.state.Expanded,
                       width: "100vw",
                       height: "100vh",
                   childwidth :"95vw",
                   childheight: "89vh"
                   })

                } else {
               this.setState ({
                   Expanded: !this.state.Expanded,
                   width: this.props.width,
                   height: this.props.height,
                   childwidth :"98%",
                   childheight: "98%"
               })

                }


    }



    render() {


        return (
            <Card round={true}
                  width={this.state.width}
                  height={this.state.height}
                  elevation={"large"}
                  background={{color: "rain"}}
                  pad={"small"}
                  margin={{
                      horizontal: "small",
                      vertical: "medium"
                  }}

                  alignSelf={"center"}

                  animation={["zoomIn", "zoomOut"]}>
                <CardHeader pad={{horizontal: "small"}}>

                    {this.props.children[0]}
                    <Box onClick={this.expandWindow}>
                        <Expand/>
                    </Box>
                </CardHeader>
                <CardBody
                    width={"xlarge"}
                    height={"medium"}
                    align={"center"}
                    id={"body"}
                >


                    <div style={{
                        "height": "98%",
                        "width":  "98%",
                    }} >
                        {cloneElement(this.props.children[1], { height: this.state.childheight, width: this.state.childwidth,
                            expanded:this.state.Expanded,
                        })}

                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default CardTemplate