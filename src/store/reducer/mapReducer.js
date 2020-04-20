import { INITCITY,CITY_UPDATE } from "../actionType/index";
const defaultState = {
	cityName: "",
};

const mapReducer = (state = defaultState, action) => {
	if (action.type === INITCITY) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.cityName = action.value;
		return newState;
	} else if (action.type === CITY_UPDATE) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.cityName = action.value.name;
		return newState;
	}
	return state;
};

export default mapReducer;

