import React, {PureComponent} from 'react';
import {Bar, Brush, ComposedChart, Legend, Line, ReferenceArea, Tooltip, XAxis, YAxis,} from 'recharts';

import "./tooltips.css"

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class Losses extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9xopwa9v/';

    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getAxisYDomain = this.getAxisYDomain.bind(this)
        this.activeState = this.activeState.bind(this)
        this.mouseUP = this.mouseUP.bind(this)

        this.brushRef = React.createRef()
        this.state = {

            left: 'dataMin',
            right: 'dataMax',
            refAreaLeft: '',
            refAreaRight: '',
            top: 'dataMax',
            bottom: 0,
            top2: 'dataMax',
            bottom2: 0,
            animation: true,

        }
    }

    zoom() {
        let {refAreaLeft, refAreaRight, data} = this.state;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            this.setState(() => ({
                refAreaLeft: '',
                refAreaRight: '',
            }));
            return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
        // yAxis domain
        const [top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'Damage', 1);
        const [top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'Cumulative_Damage', 1);

        this.setState(() => ({
            refAreaLeft: '',
            refAreaRight: '',
            data: data.slice(),
            left: Math.round(refAreaLeft),
            right: Math.round(refAreaRight),

            top,

            top2,
        }));

    }

    getAxisYDomain(from, to, ref, offset) {
        for (var i = 0; i < this.props.data.length; i += 1) {

            if ((this.props.data[i].Date_loss) === from) {
                from = i
            }
            if ((this.props.data[i].Date_loss) === to) {
                to = i
            }
        }

        const refData = this.props.data.slice(from, to);

        let top = -5;
        refData.forEach((d) => {

            top = Math.max(top, d[ref])
        });

        return [(top | 0)];
    };

    zoomOut() {
        const {data} = this.state;
        this.setState(() => ({
            data: data.slice(),

            refAreaLeft: '',
            refAreaRight: '',
            left: 'dataMin',
            right: 'dataMax',
            top: 'dataMax+1',
            // bottom: 'dataMin',
            top2: 'dataMax+50',
            // bottom2: 'dataMin+50',
        }));

    }
    handleUpdate({ startIndex, endIndex }, anything) {
        this.props.ChangeDate(this.props.data[startIndex].Date_loss, this.props.data[endIndex].Date_loss)
        this.setState(()=>({
            startTime:this.props.data[startIndex].Date_loss,
            endTime:this.props.data[endIndex].Date_loss
        }));

    }
    mouseUP(){
        this.props.updateMVT()
    }


    activeState(e) {

        if (e != null) {
            console.log(e.activeLabel)
            this.setState({refAreaLeft: e.activeLabel})
        }
    }

    render() {


        return (
            <div id={"brush"}  onMouseUp={this.mouseUP}>
            <ComposedChart
                width={705}
                height={300}
                data={this.props.data}
                margin={{
                    top: 20, right: 50, bottom: 20, left: 50,
                }}
                barCategoryGap={-5}
                barGap={-5}
                ref={this.brushRef}
                // onMouseDown={this.activeState
                // }
                // onMouseMove={e => this.state.refAreaLeft && this.setState({refAreaRight: e.activeLabel})}
                // onMouseUp={this.zoom.bind(this)}
            >
                <Legend/>
                <XAxis
                    allowDataOverflow
                    dataKey="Date_loss"
                    tick={{stroke: "#F0F3F4", fontSize: 13}}
                    type={'number'}
                    domain={[this.state.left, this.state.right]}
                    tickCount={Math.round(this.props.data.length / 4)}
                    tickFormatter={d => (monthNames[new Date(d).getMonth()]) + "-" + new Date(d).getFullYear()}
                />
                <YAxis datakey="Damage"
                       allowDataOverflow
                       tick={{stroke: "#F0F3F4", fontSize: 13, strokeWidth: .5}}
                       domain={[0, this.props.top]}
                    // label={{ value: "Flood Losses", angle: -90, position: 'insideLeft', offset:10 }}
                       label={{
                           stroke: "#F0F3F4",
                           value: "Monthly Flood Losses",
                           angle: -90,
                           position: 'left',
                           dx: -30,
                           dy: -100
                       }}
                       yAxisId={0} orientation='left' tickCount={10} tickLine={false} axisLine={true}
                       tickFormatter={tick => {
                           return "$" + tick.toLocaleString() + "K";
                       }}/>
                <YAxis datakey="Cumulative_Damage"
                       allowDataOverflow
                       tick={{stroke: "#F0F3F4", fontSize: 13, strokeWidth: .5}}
                       domain={[0, this.props.top2]}
                       label={{
                           stroke: "#F0F3F4",
                           value: "Cumulative Flood Losses",
                           angle: -90,
                           position: 'right',
                           dx: 30,
                           dy: 100
                       }}
                       yAxisId={1} orientation='right' tickCount={10} tickLine={false} axisLine={true}
                       tickFormatter={tick => {
                           return "$" + tick.toLocaleString() + "K";
                       }}/>


                <Tooltip fill="#1b1c20"
                         labelFormatter={d => (monthNames[new Date(d).getMonth()]) + "-" + new Date(d).getFullYear()}
                         formatter={tick => {
                             return "$" + tick.toLocaleString() + "K";
                         }}
                />



                    <Brush dataKey='Date_loss' height={30} stroke="#500000"
                           domain={[this.state.left, this.state.right]}
                           onChange={this.handleUpdate}


                           tickFormatter={d => (monthNames[new Date(d).getMonth()]) + "-" + new Date(d).getFullYear()}

                    />

                <Bar yAxisId={0} dataKey="Damage" fill="#500000" syncId="anyId"
                     animationDuration={300}/>
                <Line dot={false} yAxisId={1} type="monotone" dataKey="Cumulative_Damage" stroke="#87BCBF"
                      syncId="anyId" animationDuration={300}/>
                {
                    (this.props.refAreaLeft && this.props.refAreaRight) ? (
                        <ReferenceArea yAxisId="1" x1={this.props.refAreaLeft} x2={this.props.refAreaRight}
                                       strokeOpacity={0.3}/>) : null
                }
            </ComposedChart>
            </div>
        );
    }
}