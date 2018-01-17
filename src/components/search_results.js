import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class search_results extends Component {
	constructor(){
		super();
		this.renderPaths = this.renderPaths.bind(this);
		this.checkPath = this.checkPath.bind(this);
	}
	
	renderPaths(key) {
		const path = this.props.paths[key];
		if (this.checkPath(path)) {
			const pathLevel = path['skill'].toLowerCase();
			return (
				<div className="results--path" key={key}>
					<div className="results--path__image">
						<Link to={`/path/${path['permalink']}`}>
							<img src="http://dummyimage.com/168x280/4d494d/686a82.gif&text=168x280" alt="168x280" />
						</Link>
					</div>
					<div className="results--path__copy">
						<div className="results--path__name">
							<Link to={`/path/${path['permalink']}`}>
								{path['name']}
							</Link>
						</div>
						<div className="results--path__location">
							{path['location']}
						</div>
						<div className={`results--path__level ${pathLevel}`}></div>
					</div>
				</div>
			)
		}
	}

	checkPath(path) {
		const { searchTerm } = this.props;
		return path['location'].toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ' ';
	}

	render() {
		const { paths } = this.props;
		var results = "Loading..."
		if (paths.length > 0) {
			const found = paths.find(this.checkPath);
			results = found ? Object.keys(this.props.paths).map(this.renderPaths) : 'No Results Found';
		}
		return (
			<div className="search-results--container">
				<div className="search-results--title">Search Results:</div>
				<div className="search-results">{results}</div>
			</div>
		);
	}
}
