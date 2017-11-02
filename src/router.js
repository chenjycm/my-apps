import React from "react";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './component/home';
import Music from './component/music/App.js';
import HomePage from './component/homePage';
import Gomoku from './component/gomoku';


const RouteConfig = 
	<Router	history={hashHistory}>
			<Route path="/" component={Home}>
				<IndexRoute component={HomePage} />
				<Route path="/music" component={Music} />
				<Route path="/gomoku" component={Gomoku} />
			</Route>			
	</Router>

export default RouteConfig;
