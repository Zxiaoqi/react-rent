import { INITCITY } from "../actionType/index";
const defaultState = {
	cityName: "",
};

const mapReducer = (state = defaultState, action) => {
	if (action.type === INITCITY) {
		
		let newState = JSON.parse(JSON.stringify(state));
		newState.cityName = action.value;
		return newState;
	}
	return state;
};

export default mapReducer;
