import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './home';
import NoMatch from './no_match';

export default class Pathway extends Component {
	render() {
		return (
			<Router>
				<div>
					<ul>
						<li><Link to="/">Home</Link></li>
					</ul>
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route component={NoMatch}/>
					</Switch>
				</div>
			</Router>
		);
	}
}
