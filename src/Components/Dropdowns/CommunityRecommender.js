import React, {createRef, useCallback, useEffect, useRef, useState} from 'react';

import { Search } from 'grommet-icons';
import {Box, Button, Form, Grommet, Image, Text, TextInput} from 'grommet';
import { grommet, ThemeType } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import axios from "axios";

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.



export default class CommunityRecommender extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value:"",
            suggestionOpen:false,
            suggestions:[],
            location: {gid:"",
                        centroid:[]},

        }
        // this.props.nextRoute = props.nextRoute

        this.boxRef = createRef()
        this.forceUpdate = this.forceUpdate.bind(this)
        // this.effect = this.effect.bind(this)
        this.renderSuggestions = this.renderSuggestions.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onChange = this.onChange.bind(this)

        this.setSuggestionOpen = this.setSuggestionOpen.bind(this)
        // this.forceUpdate = this.forceUpdate.bind(this)
    }


    // effect(){
    //     useEffect(() => {
    //         this.forceUpdate();
    //     }, [this.forceUpdate]);
    // }

    // const [value, setValue] = useState('');
    // const [suggestionOpen, setSuggestionOpen] = useState(false);
    // const [suggestions, setsuggestions] = useState([]);
    // const [location, updateLocationState] = useState([]);
    // const [, updateState] = useState();
    // const forceUpdate
    //
    // const boxRef = useRef();



    setSuggestionOpen(value){
        this.setState({
            suggestionOpen:value
        })
    }

    onChange ( event ) {
        const { value: newValue } = event.target;



        this.setState({value:newValue,})
        if (!newValue.trim()) {
            this.setState({
                                suggestions : []})
        } else {
            axios.get("http://127.0.0.1:8000/AALs/community/"+newValue)
                .then(response => {
                    this.setState({
                        value:newValue,
                        suggestions:response.data});

                    }
                )
        }
    };


     onSelect (event) {
        this.setState({"location":{"gid":event.suggestion.gid, centroid:event.suggestion.centroid},
                "value":event.suggestion.value});
    }

    renderSuggestions ()  {
        console.log(this.state)
        return this.state.suggestions
            .filter(
                ({ name10 }) => name10.toLowerCase().indexOf(this.state.value.toLowerCase()) >= 0,
            )
            .map(({ name10,gid, centroid  }, index, list) => ({
                label: (
                    <Box
                        direction="row"
                        align="center"
                        gap="small"
                        border={index < list.length - 1 ? 'bottom' : undefined}
                        pad="small"
                    >

                        <Text>
                            <strong>{name10}</strong>
                        </Text>
                    </Box>
                ),
                value: name10,
                gid: gid,
                centroid: centroid,
            }));
    };
    render(){
    return (

        <Form

        >
            {/*<FormField name='value'*/}
            {/*           htmlfor="text-input-id">*/}

            {/*</FormField>*/}


            <Box  fill align="center" pad={{ top: 'large' }}>
                <Box
                    ref={this.boxRef}
                    width="large"
                    direction="row"
                    align="center"
                    pad={{ horizontal: 'small', vertical: 'xsmall' }}
                    round="small"
                    elevation={this.state.suggestionOpen ? 'medium' : undefined}
                    border={{
                        side: 'all',
                        color: this.state.suggestionOpen ? 'transparent' : 'border',
                    }}
                    style={
                        this.state.suggestionOpen
                            ? {
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                            }
                            : undefined
                    }
                >
                    <Search color="brand" />
                    <TextInput
                        type="search"
                        dropTarget={this.boxRef.current}
                        plain
                        value={this.state.value}
                        onChange={this.onChange}
                        onSelect={this.onSelect}
                        suggestions={this.renderSuggestions()}
                        placeholder="Enter your community..."
                        onSuggestionsOpen={() => this.setSuggestionOpen( true)}
                        onSuggestionsClose={() => this.setSuggestionOpen(false)}
                    />

                </Box>
            </Box>
            <Box direction="row" gap="medium">
                <Button onClick={() => this.props.nextRoute(this.state.location)} type="submit" primary label="Submit"/>
                <Button onClick={() => this.props.nextRoute(this.state.location)} label="Texas!"/>
            </Box>
        </Form>
    );
    }
};
