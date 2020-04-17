import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Home from './pages/home/index'
import Found from './pages/found/index'
import My from "./pages/my/index";
import { connect } from "react-redux";
import { actionLocaCity } from "./store/actionCreator";

class App extends React.Component {
	componentDidMount() {
		this.props.actionLocaCity();
	}
	render() {
		return (
			<Router className="App">
				<Switch>
					<Route exact path="/">
						<Redirect to="/home"></Redirect>
					</Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/found" component={Found}></Route>
					<Route path="/my" component={My}></Route>
				</Switch>
			</Router>
		);
	}
}
const mapActionToProps = (dispatch) => {
	return {
		actionLocaCity() {
			dispatch(actionLocaCity());
		},
	};
};

export default connect(null, mapActionToProps)(App);
