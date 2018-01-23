import React, { Component } from 'react';
import base from '../base';

export default class TrailwayAdmin extends Component {
	constructor() {
		super();
		this.createPermalink = this.createPermalink.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateTrail = this.updateTrail.bind(this);
		this.renderTrails = this.renderTrails.bind(this);

		this.state = {
			trails: {},
		}
	}

	componentWillMount() {
		this.ref = base.syncState('/trails', {
			context: this,
			state: 'trails'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	createPermalink(value) {
		let permalink = value.toLowerCase();
		permalink = permalink.replace(/\s+/g, '-');

		return permalink;
	}

	handleChange(e, key) {
		const trail = this.state.trails[key];
		const permalink = 'permalink';
		if (e.target.name === 'name') {
			const updatedTrail = {
				...trail,
				[e.target.name]: e.target.value,
				[permalink]: this.createPermalink(e.target.value),
			}
			this.updateTrail(key, updatedTrail);
		} else {
			const updatedTrail = {
				...trail,
				[e.target.name]: e.target.value
			}
			this.updateTrail(key, updatedTrail);
		}
		
	}

	updateTrail(key, updatedTrail) {
		const trails = {...this.state.trails};
		trails[key] = updatedTrail;
		this.setState({ trails });
	}

	renderTrails(key) {
		const trail = this.state.trails[key];
		return (
			<div className="trail-edit"  key={key}>
				<input type="text" name="name" value={trail.name} placeholder="Trail Name" 
					onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="permalink" value={trail.permalink} placeholder="Trail Permalink" 
					onChange={(e) => this.handleChange(e, key)} disabled/>
				<input type="text" name="location" value={trail.location} placeholder="Trail Location" 
					onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="address" value={trail.address} placeholder="Trail Address" 
					onChange={(e) => this.handleChange(e, key)} />
				<select type="text" name="skill" value={trail.skill} placeholder="Trail Skill" 
					onChange={(e) => this.handleChange(e, key)}>
					<option value="Easy">Easy</option>
					<option value="Moderate">Moderate</option>
					<option value="Hard">Hard</option>
				</select>
				<input type="text" name="miles" value={trail.miles} placeholder="Trail Miles" 
					onChange={(e) => this.handleChange(e, key)} />
			</div>
		)
	}

	render() {
		console.log('admin loaded');
		return (
			<div className="admin--home">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="admin--trails">
								{Object.keys(this.state.trails).map(this.renderTrails)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
