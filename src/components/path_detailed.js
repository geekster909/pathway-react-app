import React, { Component } from 'react';

export default class path_detailed extends Component {
	constructor() {
		super();
		this.getPathDetails = this.getPathDetails.bind(this);
	}

	getPathDetails(key) {
		let pathDetails = [];
		Object.keys(this.props.paths).map((index) => {
			const path = this.props.paths[index];
			if(path['permalink'] === this.props.match.params.permalink) {
				pathDetails = path;
			}
			return pathDetails;
		});
		return pathDetails;
	}
	render() {
		const pathDetails = this.getPathDetails();
		return (
			<div>This is a Path details page {pathDetails['name']}</div>
		);
	}
}
