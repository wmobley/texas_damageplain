import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import Index from "./views/Index"
import Hazard from "./views/Hazard";
import Current from "./views/Current";
import Data from "./views/Data";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {/* add routes with layouts */}
            {/*<Route path="/admin" component={Admin} />*/}
            {/*<Route path="/auth" component={Auth} />*/}
            {/*/!* add routes without layouts *!/*/}
            {/*<Route path="/landing" exact component={Landing} />*/}
            {/*<Route path="/profile" exact component={Profile} />*/}
            <Route path="/" exact component={Hazard} />
            <Route path="/Tools"  component={Hazard} />

            {/*<Route path="/Data" exact component={Data} />*/}
            {/*<Route path="/Current" exact component={Current} />*/}
            {/* add redirect for first page */}
            <Redirect from="*" to="/" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
