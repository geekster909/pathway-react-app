import React, { Component } from 'react';

export default class FeaturedPaths extends Component {
	constructor(){
		super();
		this.featuredPaths = this.featuredPaths.bind(this);
	}

	featuredPaths(key) {
		const path = this.props.paths[key];
			return (
				<div key={key}>
					
				</div>
			)
	}

	render() {
		return (
			<div>
				<h1>Featured:</h1>
				{Object.keys(this.props.paths).map(this.featuredPaths)}
			</div>
		);
	}
}
