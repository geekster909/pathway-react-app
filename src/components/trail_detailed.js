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
		// const trailLevel = trailDetails['skill'].toLowerCase();
		const trailLevel = trailDetails['skill'];
		console.log(trailDetails);
		return (
			<div className="trail--detailed">
				<div className="trail--detailed__image">
					<img src={trailDetails['image']} alt=""/>
				</div>
				<div className="trail--details">
					<div className="container">
						<div className="row">
							<div className="col-lg-offset-2 col-lg-8">
								<div className="trail--details__title">
									<h1>{trailDetails['name']}</h1>
								</div>
								<div className={`trail--details__level ${trailLevel}`}>
									{trailLevel}
								</div>
								<div className="trail--details__miles">
									Miles: {trailDetails['miles']}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
