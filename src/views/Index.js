import {Box, Button, Form, FormField, Grid, Grommet, Heading, Markdown, Paragraph, ResponsiveContext} from 'grommet';
import {Menu} from 'grommet-icons';
import React, {Component} from "react";
import NavBar from "../Components/Navbars/NavBar";
import AppBar from "../Components/Navbars/AppBar";
import axios from "axios";
import CommunityRecommender, {CustomSuggestions} from "../Components/Dropdowns/CommunityRecommender";



class App extends Component {
    constructor(props) {
        super(props);
        this.setSideBarState = this.setSideBarState.bind(this)
        this.nextPath = this.nextPath.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.nextRoute = this.nextRoute.bind(this)

        this.state = {

            showSidebar: false,
            Form:{RiskBoundary:""},
        };


        this.theme = {
            global: {
                colors: {
                    onyx: "#1b1c20",
                    whoop: '#500000',
                    rain: '#324755',
                    slate: '#6E8CA0',
                    sage: "#87BCBF",
                    snow: "#FFFFFF",
                    sunshine: "#FCC931",
                    ice: "#F0F3F4",
                    fossil: "#C8d1d3",
                    sand: "#b9b0A2"

                },
                font: {
                    family: 'Open Sans',
                    size: '18px',
                    height: '20px',
                },

            },
        };


    }
    handleChange(event) {
        console.log(event)
        // this.setState({Form:{RiskBoundary: event.value}});
    }
    nextRoute(location){

        console.log("state", location)
        if (location.gid ===""){
            this.path = "/Tools/"
            this.nextPath(this.path)
        }else{
           this.path = "/Tools/?gid="+location.gid+"&centroid="+location.centroid
            this.nextPath(this.path)

        }
    }
    nextPath(path) {
        this.props.history.push(path);
    }

    setSideBarState() {
        this.setState(state => ({
                showSidebar: !state.showSidebar
            })
        )
    };

    render() {
        return (
            <Grommet theme={this.theme} full>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Box background={"ice"} fill>
                            <AppBar background={"whoop"}>
                                <Button
                                    icon={<Menu/>}
                                    onClick={() => this.setSideBarState()
                                    }
                                />
                                <Heading level='3' margin='none'>TDIS</Heading>
                            </AppBar>
                            <Box flex direction="column">
                                <NavBar showSidebar={this.state.showSidebar} action={this.setSideBarState} size={size}/>
                                <Box margin={"small"} overflow={"auto"} responsive={true}>

                                    <Grid alignSelf={"center"} >
                                        <Box height="40vh"  background={{
                                            "position": "50% 40%",
                                            "color": 'rain',
                                            "image": 'url("harvey.jpg")',
                                            "size": "cover",
                                        }} round={{
                                            "size": "medium",
                                            "corner": "bottom"
                                        }} border>
                                            <Box height="40vh"
                                                 background={{color: 'whoop', opacity: "weak"}}
                                                 round={{
                                                     "size": "medium",
                                                     "corner": "bottom"
                                                 }}>
                                                <Box pad="xlarge" flex align='center' justify='center'>
                                                    <Heading color="ice">
                                                        Texas Disaster Information System
                                                    </Heading>
                                                    <Box gap="xlarge" direction="row" align="stretch">

                                                        {/*/>*/}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box height={"xsmall"}/>
                                        <Box round={true} elevation={"large"} background={{color: "whoop"}}
                                             pad={"small"}
                                             direction={"row-responsive"}>
                                            <Box width={"xlarge"}

                                                 pad={"small"}

                                                 fill={false}


                                                 align={"baseline"}>
                                                <Heading color={"sand"} margin={"small"}>What is TDIS?</Heading>
                                                <Heading margin={"small"} level={"3"} responsive={true}>
                                                    <Markdown>

                                                        *"The goal of TDIS is to collect, create, and provide analytical
                                                        tools,
                                                        information and data that support disaster
                                                        resilience efforts for the state of Texas.”*
                                                    </Markdown>
                                                </Heading>
                                                <Paragraph margin={"small"}>
                                                    Through TDIS you'll find tools to:
                                                    A central repository of data and models for mitigating natural
                                                    hazards.

                                                    Identify what is happening around the state.
                                                    Help identify the natural hazards that may affect you.

                                                </Paragraph>

                                            </Box>
                                            <Box round={true} margin={{horizontal: "medium"}}
                                                 width={"medium"} background={{

                                                "image": 'url("HarveyHouse.jpg")',
                                            }}>


                                            </Box>
                                        </Box>
                                        <Box height={"xsmall"}/>
                                        <Box round={true} elevation={"large"} background={{color: "whoop"}}
                                             pad={"small"}
                                             direction={"row-responsive"}>
                                            <Box round={true} margin={{horizontal: "medium"}}
                                                 width={"medium"} background={{

                                                "image": 'url("HarveyHouse.jpg")',
                                            }}/>
                                            <Box width={"large"}
                                                // height={"large"}
                                                 pad={"small"}
                                                 margin={"small"}
                                                 fill={false}


                                                 align={"baseline"}>
                                                <Heading color={"sand"} margin={"small"}>Risk Indicators</Heading>
                                                <Paragraph margin={"small"}>
                                                    The risks from natural hazards differ from community to community.
                                                    We've compiled these risk across the state of Texas. Below you can
                                                    look for your community to understand those risks.


                                                </Paragraph>
                                                <Heading margin={"small"} level={"3"} responsive={true}>
                                                    Get Started:
                                                </Heading>
                                                <CommunityRecommender nextRoute={this.nextRoute}/>



                                            </Box>


                                        </Box>
                                    </Grid>
                                </Box>
                            </Box>


                        </Box>
                    )}
                </ResponsiveContext.Consumer>
            </Grommet>

        );
    }
}

export default App;