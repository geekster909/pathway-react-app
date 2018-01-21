import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import '../scss/style.scss';
import Home from './home';
import FeaturedTrails from './featured_trails';
import TrailDetailed from './trail_detailed';
import NoMatch from './no_match';
import base from '../base';

export default class Trailway extends Component {
	constructor() {
		super();
		this.separateTrails = this.separateTrails.bind(this);
		this.featuredTrails = this.featuredTrails.bind(this);
		this.state = {
			trails: {},
			loadedTrails: false,
			featuredTrails: {}
		}
	}

	componentWillMount() {
		this.ref = base.syncState('/trails', {
			context: this,
			state: 'trails',
			then(data) {
				this.setState({
					loadedTrails: true,
					featuredTrails: this.featuredTrails()
				});
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	separateTrails() {
		let separateTrails = {
			easyTrails: [],
			moderateTrails: [],
			hardTrails: []
		}
		Object.keys(this.state.trails).map((index) => {
			const trail = this.state.trails[index];
			if (trail['skill'] === "Easy") {
				separateTrails['easyTrails'] = separateTrails.easyTrails.concat([trail]);
			} else if (trail['skill'] === "Moderate") {
				separateTrails['moderateTrails'] = separateTrails.moderateTrails.concat([trail]);
			} else if (trail['skill'] === "Hard") {
				separateTrails['hardTrails'] = separateTrails.hardTrails.concat([trail]);
			}
			return separateTrails;
		});
		return separateTrails;
	}

	featuredTrails() {
		const separateTrails = this.separateTrails();
		const easyTrails = separateTrails.easyTrails;
		const moderateTrails = separateTrails.moderateTrails;
		const hardTrails = separateTrails.hardTrails;
		const easyTrail = easyTrails[Math.floor(Math.random()*easyTrails.length)];
		const moderateTrail = moderateTrails[Math.floor(Math.random()*moderateTrails.length)];
		const hardTrail = hardTrails[Math.floor(Math.random()*hardTrails.length)];

		const featuredTrails = {
			easyTrail,
			moderateTrail,
			hardTrail
		}
		return featuredTrails;
	}

	render() {
		// console.log('First Render');
		// if (this.state.loadedTrails) {
		// 	console.log('Trails Loaded');
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
									render={()=>(
										<div className="home-page">
											<Home trails={this.state.trails}/>
											<FeaturedTrails featuredTrails={this.state.featuredTrails} loadedTrails={this.state.loadedTrails} />
										</div>
										)} />
								<Route
									path="/trail/:permalink"
									render={(props)=>(
										<div className="trail-detailed-page">
											<TrailDetailed {...props} trails={this.state.trails}/>
											<FeaturedTrails featuredTrails={this.state.featuredTrails} loadedTrails={this.state.loadedTrails} />
										</div>
										)}/>
								<Route component={NoMatch}/>
							</Switch>
						</div>
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
