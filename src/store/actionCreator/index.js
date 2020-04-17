import { INITCITY, ADD_NUM_P } from "../actionType/index";
import {getLocaCity } from "../../utils/baiduMap"
export const actionAddNum = () => {
	return {
		type: ADD_NUM_P,
		value: "休息室",
	};
};
export const actionLocaCity = () => {
	return (dispatch) => { 
		getLocaCity().then(res => { 
			
			const action = {
				type: INITCITY,
				value: res.name,
			};
			dispatch(action);
		})
	}
};
