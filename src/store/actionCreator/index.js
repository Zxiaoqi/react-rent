import { INITCITY, CITY_UPDATE } from "../actionType/index";
import {getLocaCity,geocoderCity } from "utils/baiduMap"

export const actionLocaCity = () => {
	return (dispatch) => { 
		getLocaCity().then(res => { 
			res.name = res.name.replace(/市$/,'')
			const action = {
				type: INITCITY,
				value: res
			};
			dispatch(action);
		})
	}
};

/**
 * @param {String} cityName 城市名称
 */

export const actionUpdateCity = (cityName) => {
	return (dispatch) => {
		geocoderCity(cityName).then((res) => {
			const action = {
				type: CITY_UPDATE,
				value: {
					name: cityName,
					center:res
				}
			};
			dispatch(action);
		});
	};
};
