import React, { Component } from 'react';

export default class search_results extends Component {
	constructor(){
		super();
		this.renderPaths = this.renderPaths.bind(this);
		this.findPaths = this.findPaths.bind(this);
	}
	renderPaths(key) {
		const path = this.props.paths[key];
		const pathLocation = path['location'];
		const { searchTerm } = this.props;
		if (pathLocation.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ' ') {
			return (
				<div key={key}>
					<p>
						{`Path Name: ${path['name']}`}
						<br /> 
						{`Location: ${path['location']}`}
						<br /> 
						{`Skill: ${path['skill']}`}
					</p>
				</div>
			)
		}
	}

	findPaths(path) {
		const pathLocation = path['location'];
		const { searchTerm } = this.props;
		return pathLocation.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ' ';
	}

	render() {

		const found = this.props.paths.find(this.findPaths);
		const results = found ? Object.keys(this.props.paths).map(this.renderPaths) : 'No Results Found';
		return (
			<div>
				<h1>Search Results:</h1>
				<div>{results}</div>
			</div>
		);
	}
}
