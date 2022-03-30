import {ResponsiveRadar} from "@nivo/radar";
import React, {Component} from "react";
import {Box} from "grommet";

class RiskRadar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
       const data = [
            {
                "Hazard": "Flood",
                "Losses": 58,
             
            },
            {
                "Hazard": "Wildfire",
                "Losses": 58,
                
            },
            {
                "Hazard": "Hail",
                "Losses": 93,
          
            },
            {
                "Hazard": "Tornado",
                "Losses": 75,
              
            },
            
        ]
        return (
            <Box round={true} margin={"small"} pad={"small"} height={"small"} width={"medium"} background={{color: "ice"}}>
            <ResponsiveRadar
                data={data}
                keys={['Losses']}
                indexBy="Hazard"
                maxValue="auto"
                margin={{top: 10, right: 80, bottom: 10, left: 80}}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{from: 'color'}}
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={36}
                enableDots={true}
                dotSize={10}
                dotColor={{theme: 'background'}}
                dotBorderWidth={2}
                dotBorderColor={{from: 'color'}}
                enableDotLabel={true}
                dotLabel="value"
                dotLabelYOffset={-12}
                colors={{scheme: 'dark2'}}
                fillOpacity={1}
                blendMode="multiply"
                animate={true}
                motionConfig="wobbly"
                isInteractive={true}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: 30,
                        itemWidth: 80,
                        itemHeight: 30,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
            </Box>
        )
    }




}

export default RiskRadar;