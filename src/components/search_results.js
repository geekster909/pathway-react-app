import React, { Component } from 'react';

export default class search_results extends Component {
	constructor(){
		super();
		this.renderPaths = this.renderPaths.bind(this);
		this.checkPath = this.checkPath.bind(this);
	}
	renderPaths(key) {
		const path = this.props.paths[key];
		if (this.checkPath(path)) {
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

	checkPath(path) {
		const { searchTerm } = this.props;
		return path['location'].toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ' ';
	}

	render() {
		const found = this.props.paths.find(this.checkPath);
		const results = found ? Object.keys(this.props.paths).map(this.renderPaths) : 'No Results Found';
		return (
			<div>
				<h1>Search Results:</h1>
				<div>{results}</div>
			</div>
		);
	}
}
