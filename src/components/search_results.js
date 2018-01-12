import React, { Component } from 'react';

export default class search_results extends Component {
	constructor(){
		super();
		this.renderPaths = this.renderPaths.bind(this);
	}
	renderPaths(key) {
		const path = this.props.paths[key];
		const pathLocation = path['location'];
		const { searchTerm } = this.props;

		if (pathLocation.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ' '){
			return (
				<div key={key}>
					<p>
						{`Path Name: ${path['name']}`}
						<br /> 
						{`Location: ${pathLocation}`}
						<br /> 
						{`Skill: ${path['skill']}`}

					</p>
				</div>
			)
		} else {
			return;
		}
	}

	render() {
		return (
			<div>
				<p>Search Results:</p>
				{Object.keys(this.props.paths).map(this.renderPaths)}
			</div>
		);
	}
}
