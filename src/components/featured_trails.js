import React, { Component } from 'react';

export default class FeaturedTrails extends Component {
	constructor(){
		super();
		this.featuredTrails = this.featuredTrails.bind(this);
	}

	featuredTrails() {
		return (
			<div>
				<div className="featured--easy-trail">
					{this.props.featuredTrails.easyTrail['name']}
				</div>
				<div className="featured--moderate-trail">
					{this.props.featuredTrails.moderateTrail['name']}
				</div><div className="featured--hard-trail">
					{this.props.featuredTrails.hardTrail['name']}
				</div>
			</div>
		)
	}

	render() {
		const featuredTrails = this.props.loadedTrails ? this.featuredTrails() : 'Loading...';
		return (
			<div>
				<h1>Featured:</h1>
				{ featuredTrails }
			</div>
		);
	}
}
