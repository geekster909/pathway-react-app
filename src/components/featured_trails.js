import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class FeaturedTrails extends Component {
	constructor(){
		super();
		this.renderFeaturedTrail = this.renderFeaturedTrail.bind(this);
	}

	renderFeaturedTrail(key) {
		const trail = this.props.featuredTrails[key];
		const trailLevel = trail['skill'].toLowerCase();
		const imageStyle = {
			backgroundImage: 'url(http://trailway.justin-bond.com/trail-images/' + trail['permalink'] + '.jpg)',
		}
		return (
			<Link to={`/trail/${trail['permalink']}`} className="featured--trail" key={key}>
				<div className="featured--trail__image" style={imageStyle}>
				</div>
				<div className="featured--trail__content">
					<div className="featured--trail__name">
						{trail['name']}
					</div>
					<div className="featured--trail__location">
						{trail['location']}
					</div>
					<div className={`featured--trail__level ${trailLevel}`}></div>
				</div>
			</Link>
		)
	}

	render() {
		const featuredTrails = this.props.loadedTrails ? Object.keys(this.props.featuredTrails).map(this.renderFeaturedTrail) : 'Loading...';
		return (
			<div className="featured--container">
				<div className="container">
					<div className="row">
						<div className="col-lg-offset-2 col-lg-8">
							<div className="featured--title">Featured Trails</div>
							<div className="featured--trails">
								{ featuredTrails }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
