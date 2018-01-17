import _ from 'lodash';
import React, { Component } from 'react';
// import pathsList from '../paths-list';
import SearchBar from './search_bar';
import SearchResults from './search_results';

export default class home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			// paths: {},
		}
	}

	pathSearch(term) {
		this.setState({term});
	}
	
	render() {
		const pathSearch = _.debounce((term) => { this.pathSearch(term) }, 500 );
		return (
			<div className="home--container">
				<div className="container">
					<div className="col-xs-offset-2 col-lg-8">
						<h1 className="home--title">
							Enjoy nature, locally
						</h1>
						<div className="home--subtitle">
							Type in your city and uncover the best trails in Orange County, California.
						</div>
						<div className="home--search">
							<SearchBar 
								onSearchTermChange={pathSearch} />
						</div>
						<div className="home--legend">
							<span className="legend--title">Trail Level:</span>
							<span className="legend--easy">Easy</span>
							<span className="legend--moderate">Moderate</span>
							<span className="legend--hard">Hard</span>
						</div>
						<div className="home--search-results">
							<SearchResults 
								searchTerm={this.state.term}
								paths={this.props.paths} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
