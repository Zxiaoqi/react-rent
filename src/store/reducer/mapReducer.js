import { INITCITY,CITY_UPDATE,CITY_CLEAR } from "../actionType/index";
const defaultState = {
	cityName: "",
};

const mapReducer = (state = defaultState, action) => {
	let newState = JSON.parse(JSON.stringify(state));
	if (action.type === INITCITY) {
		newState.cityName = action.value;
		return newState;
	} else if (action.type === CITY_UPDATE) {
		newState.cityName = action.value;
		return newState;
	} else if (action.type === CITY_CLEAR) { 
		newState.cityName = action.value;
		return newState;
	}
	return state;
};

export default mapReducer;

