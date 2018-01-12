import React, { Component } from 'react';

export default class search_results extends Component {
	constructor(){
		super();
		this.renderPaths = this.renderPaths.bind(this);
	}
	renderPaths(key) {
		const path = this.props.paths[key];
		return (
			<div key={key}>
				{path['name']} 
			</div>
		)
	}

	render() {
		return (
			<div>
				search results<br />
				{Object.keys(this.props.paths).map(this.renderPaths)}
			</div>
		);
	}
}
