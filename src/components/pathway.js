import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './home';
import FeaturedPaths from './featured_paths';
import NoMatch from './no_match';
import base from '../base';

export default class Pathway extends Component {
	constructor() {
		super();
		this.state = {
			paths: {},
		}
	}

	componentWillMount() {
		this.ref = base.syncState('/', {
				context: this,
				state: 'paths'
			});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		return (
			<Router>
				<div>
					<div className="header">
						<ul>
							<li><Link to="/">Home</Link></li>
						</ul>
					</div>
					<div className="main-content">
						<Switch>
							<Route 
								path="/" 
								exact 
								render={()=><Home paths={this.state.paths}/>} />
							<Route component={NoMatch}/>
						</Switch>
					</div>
					<FeaturedPaths paths={this.state.paths} />
				</div>
			</Router>
		);
	}
}
