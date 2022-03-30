import React, {Component} from "react";

import {Card, CardBody, CardHeader, Heading} from 'grommet';
import {Alert, CloudSoftware, Tools} from "grommet-icons";
import {withRouter} from 'react-router-dom'


class LandingCard extends Component {



    constructor(props) {
        super(props);
        this.props = props

        if (props.icon === "Tools") {
            this.icon = <Tools size={"large"}/>
        } else if (props.icon === "Warning") {
            this.icon = <Alert size={"large"}/>
        } else if (props.icon === "Cloud") {
            this.icon = <CloudSoftware size={"large"}/>
        }




    }
    nextPath(path) {
        this.props.history.push(path);
    }


    render() {


        return (
            <Card
                margin={{
                    top: this.props.margin,
                    "horizontal": "3vw"
                }}
                width={"medium"}
                height={"small"}
                background={"sage"}
                round={true}
                // overflow={"hidden"}
                pad="small"
                elevation="medium"
                // gap="small"
                onClick={() =>  this.nextPath(this.props.url)}

            >
                <CardHeader alignSelf={"center"} >

                    {this.icon}
                </CardHeader>


                <CardBody  >
                    <Heading level={"3"} alignSelf={"center"}
                    >{this.props.title}</Heading>
                    {this.props.content}</CardBody>


            </Card>
        );
    }
}

export default withRouter(LandingCard)