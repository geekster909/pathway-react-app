import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import '../scss/style.scss';
import Home from './home';
import FeaturedPaths from './featured_paths';
import PathDetailed from './path_detailed';
import NoMatch from './no_match';
import base from '../base';

export default class Pathway extends Component {
	constructor() {
		super();
		this.separatePaths = this.separatePaths.bind(this);
		this.featuredPaths = this.featuredPaths.bind(this);
		this.state = {
			paths: {},
			loadedPaths: false
		}
	}

	componentWillMount() {
		this.ref = base.syncState('/', {
			context: this,
			state: 'paths',
			then(data) {
				this.setState({loadedPaths: true});
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	separatePaths() {
		let separatePaths = {
			easyPaths: [],
			moderatePaths: [],
			hardPaths: []
		}
		Object.keys(this.state.paths).map((index) => {
			const path = this.state.paths[index];
			if (path['skill'] === "Easy") {
				separatePaths['easyPaths'] = separatePaths.easyPaths.concat([path]);
			} else if (path['skill'] === "Moderate") {
				separatePaths['moderatePaths'] = separatePaths.moderatePaths.concat([path]);
			} else if (path['skill'] === "Hard") {
				separatePaths['hardPaths'] = separatePaths.hardPaths.concat([path]);
			}
			return separatePaths;
		});
		return separatePaths;
	}

	featuredPaths() {
		const separatePaths = this.separatePaths();
		const easyPaths = separatePaths.easyPaths;
		const moderatePaths = separatePaths.moderatePaths;
		const hardPaths = separatePaths.hardPaths;
		const easyPath = easyPaths[Math.floor(Math.random()*easyPaths.length)];
		const moderatePath = moderatePaths[Math.floor(Math.random()*moderatePaths.length)];
		const hardPath = hardPaths[Math.floor(Math.random()*hardPaths.length)];

		const featuredPaths = {
			easyPath,
			moderatePath,
			hardPath
		}
		return featuredPaths;
	}

	render() {
		// console.log('First Render');
		// if (this.state.loadedPaths) {
		// 	console.log('Paths Loaded');
			return (
				<Router>
					<div>
						<div className="header--container">
							<div className="container">
								<div className="col-lg-offset-1 col-sm-10">
									<div className="header--logo">
										<Link to="/">
											<img src="http://dummyimage.com/150x150/4d494d/686a82.gif&text=150x150" alt="150x150" />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="main-content">
							<Switch>
								<Route 
									path="/" 
									exact 
									render={()=><Home paths={this.state.paths}/>} />
								<Route
									path="/path/:permalink"
									props={this.state.match}
									// component={PathDetailed}/>
									render={(props)=><PathDetailed {...props} paths={this.state.paths}/>}/>
								<Route component={NoMatch}/>
							</Switch>
						</div>
						<FeaturedPaths featuredPaths={this.featuredPaths()} loadedPaths={this.state.loadedPaths} />
					</div>
				</Router>
			)
		// } else {
		// 	return (
		// 		<div>Loading...</div>
		// 	)
		// }
	}
}
