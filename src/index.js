import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './scss/style.scss';
// import './index.css';
import Admin from './components/trailway_admin';
import Trailway from './components/trailway';
// import registerServiceWorker from './registerServiceWorker';
class TrailwayApp extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route 
						path="/admin" 
						exact 
						render={()=><Admin />} />
					<Route render={()=><Trailway />}/>
				</Switch>
			</Router>
		)
	}
}
ReactDOM.render(
	<TrailwayApp/>,
	document.getElementById('root')
);
// registerServiceWorker();
