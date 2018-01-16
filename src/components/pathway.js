import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import '../scss/style.scss';
import Home from './home';
import FeaturedPaths from './featured_paths';
import NoMatch from './no_match';
import base from '../base';

export default class Pathway extends Component {
	constructor() {
		super();
		this.state = {
			paths: {},
			separatePaths: {
				easyPaths: [],
				moderatePaths: [],
				hardPaths: []
			},
			loadingPaths: 'true'
		}
		this.separatePaths = this.separatePaths.bind(this);
	}

	componentWillMount() {
		this.ref = base.syncState('/', {
			context: this,
			state: 'paths',
			then(data) {
				this.setState({loadingPaths: false});
				Object.keys(this.state.paths).map(this.separatePaths);
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	separatePaths(key) {
		const path = this.state.paths[key];
		const { separatePaths } = this.state;
		if (path['skill'] === "Easy") {
			const easyPaths = separatePaths.easyPaths.concat([path]);
			separatePaths['easyPaths'] = easyPaths;
			this.setState({ separatePaths });
		} 
		else if (path['skill'] === "Moderate") {
			const moderatePaths = separatePaths.moderatePaths.concat([path]);
			separatePaths['moderatePaths'] = moderatePaths;
			this.setState({ separatePaths });
		} else if (path['skill'] === "Hard") {
			const hardPaths = separatePaths.hardPaths.concat([path]);
			separatePaths['hardPaths'] = hardPaths;
			this.setState({ separatePaths });
		}
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
					<FeaturedPaths separatePaths={this.state.separatePaths} />
				</div>
			</Router>
		);
	}
}
