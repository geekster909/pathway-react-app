import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class search_results extends Component {
	constructor(){
		super();
		this.renderTrails = this.renderTrails.bind(this);
		this.checkTrail = this.checkTrail.bind(this);
	}
	
	renderTrails(key) {
		const trail = this.props.trails[key];
		if (this.checkTrail(trail)) {
			const trailLevel = trail['skill'].toLowerCase();
			return (
				<div className="results--trail" key={key}>
					<div className="results--trail__image">
						<Link to={`/trail/${trail['permalink']}`}>
							<img src="http://dummyimage.com/168x280/4d494d/686a82.gif&text=168x280" alt="168x280" />
						</Link>
					</div>
					<div className="results--trail__copy">
						<div className="results--trail__name">
							<Link to={`/trail/${trail['permalink']}`}>
								{trail['name']}
							</Link>
						</div>
						<div className="results--trail__location">
							{trail['location']}
						</div>
						<div className={`results--trail__level ${trailLevel}`}></div>
					</div>
				</div>
			)
		}
	}

	checkTrail(trail) {
		const { searchTerm } = this.props;
		return trail['location'].toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ' ';
	}

	render() {
		const { trails } = this.props;
		var results = "Loading..."
		if (trails.length > 0) {
			const found = trails.find(this.checkTrail);
			results = found ? Object.keys(this.props.trails).map(this.renderTrails) : 'No Results Found';
		}
		return (
			<div className="search-results--container">
				<div className="search-results--title">Search Results:</div>
				<div className="search-results">{results}</div>
			</div>
		);
	}
}
