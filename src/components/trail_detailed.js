import React, { Component } from 'react';

export default class trail_detailed extends Component {
	constructor() {
		super();
		this.getTrailDetails = this.getTrailDetails.bind(this);
	}

	getTrailDetails(key) {
		let trailDetails = [];
		Object.keys(this.props.trails).map((index) => {
			const trail = this.props.trails[index];
			if(trail['permalink'] === this.props.match.params.permalink) {
				trailDetails = trail;
			}
			return trailDetails;
		});
		return trailDetails;
	}
	render() {
		const trailDetails = this.getTrailDetails();
		return (
			<div>This is a Path details page {trailDetails['name']}</div>
		);
	}
}
