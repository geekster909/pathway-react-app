import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class trail_detailed extends Component {
	constructor() {
		super();
		this.getTrailDetails = this.getTrailDetails.bind(this);
	}
	componentWillMount() {
		window.scrollTo(0, 0)
	}
	componentDidUpdate () {
		window.scrollTo(0, 0)
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
		let trailLevel = '';
		if (trailDetails['skill']) {
			trailLevel = trailDetails['skill'].toLowerCase();
		} else {
			trailLevel = trailDetails['skill'];
		}
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
									{trailDetails['skill']}
								</div>
								<div className="trail--details__miles">
									Miles: {trailDetails['miles']}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="back-to-search">
					<div className="container">
						<div className="row">
							<div className="col-lg-offset-2 col-lg-8">
								<Link to={`/`}>
									Back to Search
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
