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
			const imageStyle = {
				backgroundImage: 'url(http://trailway.justin-bond.com/trail-images/' + trail['permalink'] + '.png)',
			}
			return (
				<Link to={`/trail/${trail['permalink']}`} className="results--trail" key={key}>
					<div className="results--trail__image" style={imageStyle}>
					</div>
					<div className="results--trail__copy">
						<div className="results--trail__name">
							{trail['name']}
						</div>
						<div className="results--trail__location">
							{trail['location']}
						</div>
						<div className={`results--trail__level ${trailLevel}`}></div>
					</div>
				</Link>
			)
		}
	}

	checkTrail(trail) {
		const { searchTerm } = this.props;
		if (trail['location'] && trail['skill']) {
			return trail['location'].toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ' ';
		} else {
			return false;
		}
	}

	render() {
		const { trails } = this.props;
		let results = '';
		if (trails.length > 0 && this.props.searchTerm !== '') {
		// if (trails.length > 0) {
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
