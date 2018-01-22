import React, { Component } from 'react';
import base from '../base';

export default class TrailwayAdmin extends Component {
	constructor() {
		super();
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

	handleChange(e, key) {
		const trail = this.state.trails[key];
		const updatedTrail = {
			...trail,
			[e.target.name]: e.target.value
		}
		this.updateTrail(key, updatedTrail);
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
				<input type="text" name="name" value={trail.name} placeholder="Trail Name" onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="location" value={trail.location} placeholder="Trail Location" onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="address" value={trail.address} placeholder="Trail Address" onChange={(e) => this.handleChange(e, key)} />
				<select type="text" name="skill" value={trail.skill} placeholder="Trail Skill" onChange={(e) => this.handleChange(e, key)}>
					<option value="Easy">Easy</option>
					<option value="Moderate">Moderate</option>
					<option value="Hard">Hard</option>
				</select>
				<input type="text" name="miles" value={trail.miles} placeholder="Trail Miles" onChange={(e) => this.handleChange(e, key)} />
			</div>
		)
	}

	render() {
		console.log('admin loaded');
		return (
			<div>
				This is the admin page.<br />
				{Object.keys(this.state.trails).map(this.renderTrails)}
			</div>
		);
	}
}
