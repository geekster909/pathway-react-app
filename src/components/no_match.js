import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class no_match extends Component {
	render() {
		return (
			<div>
				<p>Error 404</p>
				<p><Link to="/">Home</Link></p>
			</div>
		);
	}
}
