import React from "react";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './component/home';
import Music from './component/music/App.js';
import HomePage from './component/homePage';
import Page3 from './component/page3';


const RouteConfig = 
	<Router	history={hashHistory}>
			<Route path="/" component={Home}>
				<IndexRoute component={HomePage} />
				<Route path="/music" component={Music} />
				<Route path="/page3" component={Page3} />
			</Route>			
	</Router>

export default RouteConfig;
