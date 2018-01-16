import React, { Component } from 'react';

export default class FeaturedPaths extends Component {
	constructor(){
		super();
		this.featuredPaths = this.featuredPaths.bind(this);
	}

	featuredPaths() {
		return (
			<div>
				<div className="featured--easy-path">
					{this.props.featuredPaths.easyPath['name']}
				</div>
				<div className="featured--moderate-path">
					{this.props.featuredPaths.moderatePath['name']}
				</div><div className="featured--hard-path">
					{this.props.featuredPaths.hardPath['name']}
				</div>
			</div>
		)
	}

	render() {
		const featuredPaths = this.props.loadedPaths ? this.featuredPaths() : 'Loading...';
		return (
			<div>
				<h1>Featured:</h1>
				{ featuredPaths }
			</div>
		);
	}
}
