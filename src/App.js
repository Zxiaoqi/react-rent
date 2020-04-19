import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Home from 'pages/home/index'
import CitySelect from "pages/citySelect/index";
import MapFound from "pages/mapFound/index";
import { connect } from "react-redux";
import { actionLocaCity } from "store/actionCreator";

class App extends React.Component {
	componentDidMount() {
		this.props.actionLocaCity();
	}
	render() {
		return (
			<>
			{this.props.cityName && (<Router className="App">
				<Switch>
					<Route exact path="/">
						<Redirect to="/home"></Redirect>
					</Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/cityselect" component={CitySelect}></Route>
					<Route path="/mapfound" component={MapFound}></Route>
				</Switch>
				</Router>)}
			</>
		)
	}
}

const mapStateToProps = (state) => ({
	cityName: state.mapReducer.cityName,
});
//全局调用地图api
const mapActionToProps = (dispatch) => {
	return {
		actionLocaCity() {
			dispatch(actionLocaCity());
		},
	};
};

export default connect(mapStateToProps, mapActionToProps)(App);
