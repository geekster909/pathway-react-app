import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { term: '' };
	}

	onInputChange(term) {
		this.setState({term});
		this.props.onSearchTermChange(term);
	}

	render() {
		return (
			<div className="search-bar">
				<input 
					type="text"
					placeholder="Search Orange County Cities"
					onfocus="this.placeholder = ''"
					onblur="this.placeholder = 'Search Orange County Cities'"
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
			</div>
		);
	}
}
