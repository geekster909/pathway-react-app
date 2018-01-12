import _ from 'lodash';
import React, { Component } from 'react';
import pathsList from '../paths-list';
import SearchBar from './search_bar';
import SearchResults from './search_results';

export default class Pathway extends Component {
	constructor(props) {
		super(props);

		this.state = {
			term: '',
			paths: pathsList,
		}

	}

	pathSearch(term) {
		this.setState({term});
	}

	render() {
		const pathSearch = _.debounce((term) => { this.pathSearch(term) }, 500 );
		return (
			<div>
				<SearchBar 
					onSearchTermChange={pathSearch} />
				<SearchResults 
					searchTerm={this.state.term}
					paths={this.state.paths} />
			</div>
		);
	}
}
