import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Redirect, Route, Router, Switch,} from "react-router-dom";
import Hazard from "./views/Hazard";

// import "@fortawesome/fontawesome-free/css/all.min.css";
import reportWebVitals from './reportWebVitals';
const rootElement = document.getElementById("root")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Hazard/>
    </React.StrictMode>
);
    {/*    <Switch>*/}
    {/*//         /!* add routes with layouts *!/*/}
    {/*//         /!*<Route path="/admin" component={Admin} />*!/*/}
    {/*//         /!*<Route path="/auth" component={Auth} />*!/*/}
    //         {/*/!* add routes without layouts *!/*/}
    {/*//         /!*<Route path="/landing" exact component={Landing} />*!/*/}
    {/*//         /!*<Route path="/profile" exact component={Profile} />*!/*/}
    {/*        <Route path="${process.env.PUBLIC_URL}/" exact component={Hazard} />*/}
    {/*//         <Route path="/Tools"  component={Hazard} />*/}
    {/*//*/}
    {/*//         /!*<Route path="/Data" exact component={Data} />*!/*/}
    {/*//         /!*<Route path="/Current" exact component={Current} />*!/*/}
    {/*//         /!* add redirect for first page *!/*/}

    {/*    </Switch>*/}
    // </Router>,
    //
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
