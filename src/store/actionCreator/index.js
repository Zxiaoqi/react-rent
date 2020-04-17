import { INITCITY, ADD_NUM_P } from "../actionType/index";
import {getLocaCity } from "../../utils/baiduMap"

export const actionLocaCity = () => {
	return (dispatch) => { 
		getLocaCity().then(res => { 
			res.name = res.name.replace(/市$/,'')
			const action = {
				type: INITCITY,
				value: res.name,
			};
			dispatch(action);
		})
	}
};
