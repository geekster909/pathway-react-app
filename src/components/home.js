import _ from 'lodash';
import React, { Component } from 'react';
import SearchBar from './search_bar';
import SearchResults from './search_results';

export default class home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
		}
	}

	trailSearch(term) {
		this.setState({term});
	}
	
	render() {
		const trailSearch = _.debounce((term) => { this.trailSearch(term) }, 500 );
		return (
			<div className="home--container">
				<div className="container">
					<div className="row">
						<div className="col-lg-offset-2 col-lg-8">
							<h1 className="home--title">
								Enjoy nature, locally
							</h1>
							<div className="home--subtitle">
								Type in your city and uncover the best trails in Orange County, California.
							</div>
							<div className="home--search">
								<SearchBar 
									onSearchTermChange={trailSearch} />
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
									trails={this.props.trails} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
