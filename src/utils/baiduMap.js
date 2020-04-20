const BMap = window.BMap;

//异步封装百度获取城市信息
export const getLocaCity = () => { 
    return new Promise((resolve, reject) => {
        const myCity = new BMap.LocalCity();
        myCity.get(resolve)
    }
)}


/**
 * 
 * @param {String} cityName 城市名称
 * @param {String} address 详细地址 不必须
 */
export const geocoderCity = (cityName, address) => {
    address = cityName || address;
	return new Promise((resolve, reject) => {
		// 创建地址解析器实例
		const myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上，并调整地图视野
		myGeo.getPoint(
			address,
			function (point) {
				if (point) {
					resolve(point);
					// console.log(point);
				}
			},
			cityName
		);
	});
};
