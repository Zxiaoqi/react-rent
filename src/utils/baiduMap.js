
//异步封装百度获取城市信息
export const getLocaCity = () => { 
    return new Promise((resolve, reject) => {
        var myCity = new window.BMap.LocalCity();
        myCity.get(resolve)
    }
)}

