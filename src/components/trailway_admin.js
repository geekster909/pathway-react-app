import React, { Component } from 'react';
import { app, base } from '../base';
import firebase from 'firebase';

export default class TrailwayAdmin extends Component {
	constructor() {
		super();
		this.renderTrails = this.renderTrails.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.state = {
			trails: {},
			uid: null,
			owner: null
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

	componentDidMount() {
		app.auth().onAuthStateChanged((user) => {
			if(user) {
				this.authHandler(null, { user });
			}
		});
	}

	authenticate() {
		const provider = new firebase.auth.GithubAuthProvider();
		app.auth().signInWithPopup(provider).then(this.authHandler);
	}

	logout() {
		app.auth().signOut().then(() => {
			this.setState({ uid: null });
		});
	}

	authHandler(err, authData) {
		console.log(authData);
		if(err) {
			console.log(err);
			return;
		}

		//grabe the store info
		const storeRef = app.database().ref(this.props.storeId);

		//query the firebase once for the store data
		storeRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			})
		})
	}

	renderLogin() {
		return (
			<nav className="login">
        		<p>Sign in</p>
        		<button className="github" onClick={() => this.authenticate()}>Log In with Github</button>
      		</nav>
		)
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

	addTrail(event) {
		event.preventDefault();
		const trail = {
			name: this.name.value,
			location: this.location.value,
			address: this.address.value,
			skill: this.skill.value,
			dogs: this.dogs.value,
			miles: this.miles.value,
		}
		const trails = {...this.state.trails};
		trails[this.createPermalink(trail.name)] = trail;
		this.setState({ trails });
		this.trailForm.reset();
	}

	updateTrail(key, updatedTrail) {
		const trails = {...this.state.trails};
		trails[key] = updatedTrail;
		this.setState({ trails });
	}

	removeTrail(key) {
		const trails = {...this.state.trails};
		trails[key] = null;
		this.setState({ trails });
	}

	renderTrails(key) {
		const trail = this.state.trails[key];
		return (
			<div className="trail-box"  key={key}>
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
				<select type="text" name="dogs" value={trail.dogs} placeholder="Dogs Allowed?" 
					onChange={(e) => this.handleChange(e, key)}>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
				<input type="text" name="miles" value={trail.miles} placeholder="Trail Miles" 
					onChange={(e) => this.handleChange(e, key)} />
				<button onClick={() => this.removeTrail(key)}>- Remove Trail</button>
			</div>
		)
	}

	render() {
		const logout = <button onClick={this.logout}>Log Out!</button>

		//check if they are not logged in at all
		if (!this.state.uid){
			return (
				<div className="admin--home">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-lg-push-4">
								{this.renderLogin()}
							</div>
						</div>
					</div>
				</div>
			)
		}

		// check if they are the owner
		if (this.state.uid !== this.state.owner) {
			return (
				<div className="admin--home">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-lg-push-4">
								<p>Sorry you aren't the admin!!</p>
								{logout}
							</div>
						</div>
					</div>
				</div>
			)
		}
		return (
			<div className="admin--home">
				<div className="container admin--header">
					<div className="row">
						<div className="col-lg-6">
							<form ref={(input) => this.trailForm = input} className="trail-box" onSubmit={(e) => this.addTrail(e)}>
								<input ref={(input) => {this.name = input}} type="text" name="name" placeholder="Trail Name" />
								<input ref={(input) => {this.permalink = input}} type="text" name="permalink" placeholder="Trail Permalink"  disabled/>
								<input ref={(input) => {this.location = input}} type="text" name="location" placeholder="Trail Location" />
								<input ref={(input) => {this.address = input}} type="text" name="address"  placeholder="Trail Address" />
								<select ref={(input) => {this.skill = input}} name="skill">
									<option value="Easy">Easy</option>
									<option value="Moderate">Moderate</option>
									<option value="Hard">Hard</option>
								</select>
								<select ref={(input) => {this.dogs = input}} name="dogs">
									<option value="No">No</option>
									<option value="Yes">Yes</option>
								</select>
								<input ref={(input) => {this.miles = input}} type="text" name="miles"  placeholder="Trail Miles" />
								<button type="submit">+ Add Trail</button>
							</form>
						</div>
						<div className="col-lg-3">
							{logout}
						</div>
					</div>
				</div>
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
